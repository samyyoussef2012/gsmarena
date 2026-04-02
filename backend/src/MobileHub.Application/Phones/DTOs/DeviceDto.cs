namespace MobileHub.Application.Phones.DTOs;

public class DeviceDto
{
    public int Id { get; set; }
    public string BrandName { get; set; } = null!;
    public string Model { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Thumbnail { get; set; }
    public decimal? PriceUsd { get; set; }
    public DateTime? ReleasedAt { get; set; }
    
    // The Flexible Structured Specs
    public Dictionary<string, Dictionary<string, string>> Specs { get; set; } = new();
}
