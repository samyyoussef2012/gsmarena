using MediatR;
using MobileHub.Application.Phones.DTOs;
using MobileHub.Application.Common.Interfaces;

namespace MobileHub.Application.Phones.Queries;

/**
 * GetPhones Query
 */
public class GetPhonesQuery : IRequest<IReadOnlyList<DeviceDto>>, ICacheableQuery
{
    public string? Brand { get; set; }
    public string? Sort { get; set; }
    public int? Ram { get; set; }

    public string CacheKey => $"GetPhones-{Brand}-{Sort}-{Ram}";
    public int SlidingExpirationInMinutes => 5;
}
