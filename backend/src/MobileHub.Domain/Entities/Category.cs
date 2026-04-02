using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? Description { get; set; }
    public string? IconUrl { get; set; }

    // Navigation property
    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
}
