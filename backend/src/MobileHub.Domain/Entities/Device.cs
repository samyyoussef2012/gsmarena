using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

public class Device : BaseEntity
{
    public int BrandId { get; set; }
    public required string Model { get; set; }
    public required string Slug { get; set; }
    public string? Thumbnail { get; set; }
    public string? Description { get; set; }
    public decimal? PriceUsd { get; set; }
    public DateTime? ReleasedAt { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; } = true;
    public int Views { get; set; }

    // Navigation properties
    public virtual Brand Brand { get; set; } = null!;
    public virtual ICollection<DeviceSpec> Specifications { get; set; } = new List<DeviceSpec>();
}
