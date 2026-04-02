namespace MobileHub.Application.Compare.DTOs;

/**
 * Normalized Comparison Structure
 * Grouped specs for side-by-side display.
 */
public class CompareResultDto
{
    public List<CompareDeviceHeaderDto> Devices { get; set; } = new();
    public List<CompareCategoryDto> Categories { get; set; } = new();
}

public class CompareDeviceHeaderDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Thumbnail { get; set; }
}

public class CompareCategoryDto
{
    public string CategoryName { get; set; } = null!;
    public List<CompareRowDto> Rows { get; set; } = new();
}

public class CompareRowDto
{
    public string SpecKey { get; set; } = null!;
    // Values mapped to each device ID: { DeviceId: "Value" }
    public Dictionary<int, string> DeviceValues { get; set; } = new();
}
