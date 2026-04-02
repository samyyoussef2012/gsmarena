using MediatR;
using MobileHub.Application.Compare.DTOs;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Domain.Specifications;

namespace MobileHub.Application.Compare.Handlers;

public class CompareDevicesQueryHandler : IRequestHandler<Queries.CompareDevicesQuery, CompareResultDto>
{
    private readonly IGenericRepository<Device> _repository;

    public CompareDevicesQueryHandler(IGenericRepository<Device> repository)
    {
        _repository = repository;
    }

    public async Task<CompareResultDto> Handle(Queries.CompareDevicesQuery request, CancellationToken cancellationToken)
    {
        // 1. Fetch all devices with their specs and brands
        var spec = new DevicesByIdsWithSpecsSpecification(request.DeviceIds);
        var devices = await _repository.ListAsync(spec);

        var result = new CompareResultDto();

        // 2. Build Headers
        foreach (var device in devices)
        {
            result.Devices.Add(new CompareDeviceHeaderDto
            {
                Id = device.Id,
                Name = $"{device.Brand.Name} {device.Model}",
                Thumbnail = device.Thumbnail
            });
        }

        // 3. Normalization (The Brain of comparison ⚖️)
        // Group all possible specs across all selected devices
        var allSpecs = devices.SelectMany(d => d.Specifications)
            .GroupBy(s => new { s.Category, s.Key })
            .OrderBy(g => g.Key.Category)
            .ToList();

        foreach (var group in allSpecs)
        {
            var category = result.Categories.FirstOrDefault(c => c.CategoryName == group.Key.Category);
            if (category == null)
            {
                category = new CompareCategoryDto { CategoryName = group.Key.Category };
                result.Categories.Add(category);
            }

            var row = new CompareRowDto { SpecKey = group.Key.Key };
            
            // Fill values for each device (if it exists)
            foreach (var dId in request.DeviceIds)
            {
                var deviceSpec = devices.FirstOrDefault(d => d.Id == dId)?
                    .Specifications.FirstOrDefault(s => s.Category == group.Key.Category && s.Key == group.Key.Key);
                
                row.DeviceValues[dId] = deviceSpec?.Value ?? "N/A";
            }

            category.Rows.Add(row);
        }

        return result;
    }
}

public class DevicesByIdsWithSpecsSpecification : BaseSpecification<Device>
{
    public DevicesByIdsWithSpecsSpecification(IEnumerable<int> ids) 
        : base(x => ids.Contains(x.Id))
    {
        AddInclude(x => x.Brand);
        AddInclude(x => x.Specifications);
    }
}
