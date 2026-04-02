using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

public class Brand : BaseEntity
{
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? LogoUrl { get; set; }
    public string? Country { get; set; }
    public int? Founded { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation property
    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
}
