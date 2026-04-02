using Microsoft.EntityFrameworkCore;
using MobileHub.Domain.Specifications;

namespace MobileHub.Infrastructure.Persistence;

/**
 * Specification Evaluator
 * Translates ISpecification<T> into EF Core IQueryable<T> expressions.
 */
public class SpecificationEvaluator<T> where T : class
{
    public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec)
    {
        var query = inputQuery;

        // Apply Criteria (Where)
        if (spec.Criteria != null)
        {
            query = query.Where(spec.Criteria);
        }

        // Apply OrderBy
        if (spec.OrderBy != null)
        {
            query = query.OrderBy(spec.OrderBy);
        }
        else if (spec.OrderByDescending != null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }

        // Apply Includes
        query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

        // Apply Paging
        if (spec.IsPagingEnabled)
        {
            query = query.Skip(spec.Skip).Take(spec.Take);
        }

        return query;
    }
}
