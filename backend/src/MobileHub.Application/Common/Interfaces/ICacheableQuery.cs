namespace MobileHub.Application.Common.Interfaces;

/**
 * Cacheable Query Interface
 * Any query implementing this will be automatically cached for [SlidingExpirationInMinutes].
 */
public interface ICacheableQuery
{
    string CacheKey { get; }
    int SlidingExpirationInMinutes { get; }
}
