using MediatR;
using MobileHub.Application.Phones.DTOs;

namespace MobileHub.Application.Search.Queries;

public class SearchPhonesQuery : IRequest<IReadOnlyList<DeviceDto>>
{
    public string Query { get; set; } = null!;
}
