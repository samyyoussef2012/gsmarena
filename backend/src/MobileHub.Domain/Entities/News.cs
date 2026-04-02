using MobileHub.Domain.Common;

namespace MobileHub.Domain.Entities;

/**
 * News Entity
 * Manages tech news and articles.
 */
public class News : BaseEntity
{
    public required string Title { get; set; }
    public required string Slug { get; set; }
    public required string Content { get; set; }
    public string? Thumbnail { get; set; }
    public string? Author { get; set; }
    public bool IsPublished { get; set; } = true;
    public int Views { get; set; }
}
