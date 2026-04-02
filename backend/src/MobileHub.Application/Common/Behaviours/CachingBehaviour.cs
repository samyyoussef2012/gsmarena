using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using MobileHub.Application.Common.Interfaces;
using System.Text.Json;

namespace MobileHub.Application.Common.Behaviours;

/**
 * Caching Behaviour (MediatR Pipeline)
 * Automatically handles Redis Caching for any ICacheableQuery.
 */
public class CachingBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>, ICacheableQuery
{
    private readonly IDistributedCache _cache;

    public CachingBehaviour(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var cacheKey = request.CacheKey;
        var cachedResponse = await _cache.GetStringAsync(cacheKey, cancellationToken);

        if (cachedResponse != null)
        {
            return JsonSerializer.Deserialize<TResponse>(cachedResponse)!;
        }

        var response = await next();

        var cacheOptions = new DistributedCacheEntryOptions
        {
            SlidingExpiration = TimeSpan.FromMinutes(request.SlidingExpirationInMinutes)
        };

        var serializedResponse = JsonSerializer.Serialize(response);
        await _cache.SetStringAsync(cacheKey, serializedResponse, cacheOptions, cancellationToken);

        return response;
    }
}
