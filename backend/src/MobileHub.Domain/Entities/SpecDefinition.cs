using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

/**
 * Spec Definition
 * The 'Master Data' for phone specifications (e.g. "RAM", "Display Resolution")
 */
public class SpecDefinition : BaseEntity
{
    public required string Category { get; set; }
    public required string Key { get; set; }
    public string? Description { get; set; }
    public string? DefaultUnit { get; set; }
    public bool IsSearchable { get; set; }
    public bool IsFilterable { get; set; }
    public int DisplayOrder { get; set; }
}
