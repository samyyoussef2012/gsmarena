using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data.Configurations;

public class DeviceSpecConfiguration : IEntityTypeConfiguration<DeviceSpec>
{
    public void Configure(EntityTypeBuilder<DeviceSpec> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Category)
            .IsRequired()
            .HasMaxLength(100);
            
        builder.Property(x => x.Key)
            .IsRequired()
            .HasMaxLength(100);
            
        builder.Property(x => x.Value)
            .IsRequired();
            
        builder.Property(x => x.Unit)
            .HasMaxLength(50);

        // Performance index for EAV-style querying (e.g. searching where Key="RAM" and Value="8GB")
        builder.HasIndex(x => new { x.Category, x.Key, x.Value });
        
        // A single device shouldn't have duplicate Category/Key pairs (e.g. two RAM definitions)
        builder.HasIndex(x => new { x.DeviceId, x.Category, x.Key }).IsUnique();
    }
}
