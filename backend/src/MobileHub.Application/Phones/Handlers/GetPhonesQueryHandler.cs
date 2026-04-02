using MediatR;
using MobileHub.Application.Phones.DTOs;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Domain.Specifications;

namespace MobileHub.Application.Phones.Handlers;

public class GetPhonesQueryHandler : IRequestHandler<Queries.GetPhonesQuery, IReadOnlyList<DeviceDto>>
{
    private readonly IGenericRepository<Device> _repository;

    public GetPhonesQueryHandler(IGenericRepository<Device> repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<DeviceDto>> Handle(Queries.GetPhonesQuery request, CancellationToken cancellationToken)
    {
        // For now, simple list. Later, we'll build a specific 'PhoneWithBrandAndSpecsSpecification'
        var spec = new PhoneWithSpecsSpecification(request);
        var devices = await _repository.ListAsync(spec);

        return devices.Select(d => new DeviceDto
        {
            Id = d.Id,
            BrandName = d.Brand.Name,
            Model = d.Model,
            Slug = d.Slug,
            Thumbnail = d.Thumbnail,
            PriceUsd = d.PriceUsd,
            ReleasedAt = d.ReleasedAt,
            Specs = d.Specifications
                .GroupBy(s => s.Category)
                .ToDictionary(
                    g => g.Key.ToLowerInvariant(), // Category as sub-object key
                    g => g.ToDictionary(
                        s => s.Key.ToLowerInvariant(), // Spec key
                        s => s.Value // Spec value
                    )
                )
        }).ToList();
    }
}

/**
 * Specific Specification for Phones with full details.
 */
public class PhoneWithSpecsSpecification : BaseSpecification<Device>
{
    public PhoneWithSpecsSpecification(Queries.GetPhonesQuery request) 
        : base(x => (string.IsNullOrEmpty(request.Brand) || x.Brand.Slug == request.Brand))
    {
        AddInclude(x => x.Brand);
        AddInclude(x => x.Specifications);
        
        ApplyPaging(0, 50); // Default paging
        
        if (!string.IsNullOrEmpty(request.Sort))
        {
            switch (request.Sort)
            {
                case "priceAsc": AddOrderBy(x => x.PriceUsd!); break;
                case "priceDesc": AddOrderByDescending(x => x.PriceUsd!); break;
                default: AddOrderBy(x => x.Model); break;
            }
        }
    }
}
