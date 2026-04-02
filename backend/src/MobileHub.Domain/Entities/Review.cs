using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

/**
 * Review Entity
 */
public class Review : BaseEntity
{
    public int DeviceId { get; set; }
    public required string Author { get; set; }
    public required string Content { get; set; }
    public int Rating { get; set; } // 1-10

    // Navigation property
    public virtual Device Device { get; set; } = null!;
}
