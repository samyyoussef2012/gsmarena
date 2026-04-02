using Microsoft.EntityFrameworkCore;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // 1. Seed Brands
        if (!await context.Brands.AnyAsync())
        {
            var brands = new List<Brand>
            {
                new Brand { Name = "Apple", Slug = "apple", Country = "USA", LogoUrl = "apple_logo.png" },
                new Brand { Name = "Samsung", Slug = "samsung", Country = "South Korea", LogoUrl = "samsung_logo.png" },
                new Brand { Name = "Xiaomi", Slug = "xiaomi", Country = "China", LogoUrl = "xiaomi_logo.png" }
            };
            await context.Brands.AddRangeAsync(brands);
            await context.SaveChangesAsync();
        }

        // 2. Seed Spec Definitions (The Flexible System Reference)
        if (!await context.SpecDefinitions.AnyAsync())
        {
            var specs = new List<SpecDefinition>
            {
                new SpecDefinition { Category = "Display", Key = "Type", IsFilterable = true },
                new SpecDefinition { Category = "Display", Key = "Size", IsFilterable = true, DefaultUnit = "inches" },
                new SpecDefinition { Category = "Display", Key = "Resolution", IsFilterable = false },
                new SpecDefinition { Category = "Memory", Key = "RAM", IsFilterable = true, DefaultUnit = "GB" },
                new SpecDefinition { Category = "Memory", Key = "Storage", IsFilterable = true, DefaultUnit = "GB" },
                new SpecDefinition { Category = "Battery", Key = "Capacity", IsFilterable = true, DefaultUnit = "mAh" },
                new SpecDefinition { Category = "Battery", Key = "Charging", IsFilterable = true, DefaultUnit = "W" }
            };
            await context.SpecDefinitions.AddRangeAsync(specs);
            await context.SaveChangesAsync();
        }

        // 3. Seed Devices (The Level Gamed Data)
        if (!await context.Devices.AnyAsync())
        {
            var apple = await context.Brands.FirstAsync(b => b.Slug == "apple");
            var samsung = await context.Brands.FirstAsync(b => b.Slug == "samsung");

            var devices = new List<Device>
            {
                new Device
                {
                    BrandId = apple.Id,
                    Model = "iPhone 16 Pro Max",
                    Slug = "iphone-16-pro-max",
                    PriceUsd = 1199,
                    ReleasedAt = new DateTime(2024, 9, 20),
                    IsFeatured = true,
                    Specifications = new List<DeviceSpec>
                    {
                        new DeviceSpec { Category = "Display", Key = "Size", Value = "6.9" },
                        new DeviceSpec { Category = "Display", Key = "Type", Value = "LTPO Super Retina XDR OLED" },
                        new DeviceSpec { Category = "Memory", Key = "RAM", Value = "8" },
                        new DeviceSpec { Category = "Battery", Key = "Capacity", Value = "4676" }
                    }
                },
                new Device
                {
                    BrandId = samsung.Id,
                    Model = "Galaxy S24 Ultra",
                    Slug = "galaxy-s24-ultra",
                    PriceUsd = 1299,
                    ReleasedAt = new DateTime(2024, 1, 24),
                    IsFeatured = true,
                    Specifications = new List<DeviceSpec>
                    {
                        new DeviceSpec { Category = "Display", Key = "Size", Value = "6.8" },
                        new DeviceSpec { Category = "Display", Key = "Type", Value = "Dynamic LTPO AMOLED 2X" },
                        new DeviceSpec { Category = "Memory", Key = "RAM", Value = "12" },
                        new DeviceSpec { Category = "Battery", Key = "Capacity", Value = "5000" }
                    }
                }
            };
            await context.Devices.AddRangeAsync(devices);
            await context.SaveChangesAsync();
        }
    }
}
