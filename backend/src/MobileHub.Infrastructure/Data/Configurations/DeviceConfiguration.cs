using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data.Configurations;

public class DeviceConfiguration : IEntityTypeConfiguration<Device>
{
    public void Configure(EntityTypeBuilder<Device> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Model)
            .IsRequired()
            .HasMaxLength(200);
            
        builder.Property(x => x.Slug)
            .IsRequired()
            .HasMaxLength(250);
            
        builder.HasIndex(x => x.Slug).IsUnique();
        
        builder.Property(x => x.PriceUsd)
            .HasColumnType("decimal(18,2)");
            
        // Relationships
        builder.HasOne(x => x.Brand)
            .WithMany()
            .HasForeignKey(x => x.BrandId)
            .OnDelete(DeleteBehavior.Restrict);
            
        builder.HasMany(x => x.Specifications)
            .WithOne(x => x.Device)
            .HasForeignKey(x => x.DeviceId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
