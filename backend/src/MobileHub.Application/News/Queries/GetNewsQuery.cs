using MediatR;
using MobileHub.Domain.Entities;
using MobileHub.Application.Common.Interfaces;

namespace MobileHub.Application.News.Queries;

public class GetNewsQuery : IRequest<IReadOnlyList<Domain.Entities.News>>, ICacheableQuery
{
    public int Limit { get; set; } = 10;

    public string CacheKey => $"GetNews-{Limit}";
    public int SlidingExpirationInMinutes => 5;
}
