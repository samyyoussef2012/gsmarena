using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

/**
 * Flexible Specifications System
 * Every phone can have any number of key-value pairs (RAM, Battery, etc.)
 */
public class DeviceSpec : BaseEntity
{
    public int DeviceId { get; set; }
    public required string Category { get; set; }
    public required string Key { get; set; }
    public required string Value { get; set; }
    public string? Unit { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation property
    public virtual Device Device { get; set; } = null!;
}
