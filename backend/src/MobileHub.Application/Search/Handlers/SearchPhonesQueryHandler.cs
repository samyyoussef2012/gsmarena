using MediatR;
using MobileHub.Application.Phones.DTOs;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Domain.Specifications;

namespace MobileHub.Application.Search.Handlers;

public class SearchPhonesQueryHandler : IRequestHandler<Queries.SearchPhonesQuery, IReadOnlyList<DeviceDto>>
{
    private readonly ISearchService _searchService;
    private readonly IGenericRepository<Device> _repository;

    public SearchPhonesQueryHandler(ISearchService searchService, IGenericRepository<Device> repository)
    {
        _searchService = searchService;
        _repository = repository;
    }

    public async Task<IReadOnlyList<DeviceDto>> Handle(Queries.SearchPhonesQuery request, CancellationToken cancellationToken)
    {
        // 1. Fetch IDs from Elasticsearch (Lightning fast IDs retrieval)
        var ids = await _searchService.SearchDeviceIdsAsync(request.Query);
        
        if (!ids.Any()) return new List<DeviceDto>();

        // 2. Fetch full data from PostgreSQL (Hydration)
        // Use a specification to filter by those IDs
        var spec = new DevicesByIdsSpecification(ids);
        var devices = await _repository.ListAsync(spec);

        // 3. Normalize and Return
        return devices.Select(d => new DeviceDto
        {
            Id = d.Id,
            BrandName = d.Brand.Name,
            Model = d.Model,
            Slug = d.Slug,
            Thumbnail = d.Thumbnail,
            PriceUsd = d.PriceUsd,
            Specifications = d.Specifications.Select(s => new SpecDto
            {
                Category = s.Category,
                Key = s.Key,
                Value = s.Value
            }).ToList()
        }).ToList();
    }
}

/**
 * Filter Devices by a list of IDs.
 */
public class DevicesByIdsSpecification : BaseSpecification<Device>
{
    public DevicesByIdsSpecification(IEnumerable<int> ids) 
        : base(x => ids.Contains(x.Id))
    {
        AddInclude(x => x.Brand);
        AddInclude(x => x.Specifications);
    }
}
