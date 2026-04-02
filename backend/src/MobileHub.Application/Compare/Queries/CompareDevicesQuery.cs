using MediatR;
using MobileHub.Application.Compare.DTOs;

namespace MobileHub.Application.Compare.Queries;

public class CompareDevicesQuery : IRequest<CompareResultDto>
{
    public List<int> DeviceIds { get; set; } = new();
}
