using System.Linq.Expressions;

namespace MobileHub.Domain.Common;

/**
 * Base Entity Class
 * Shared logic for all domain entities.
 */
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
