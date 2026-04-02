using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data.Configurations;

public class SpecDefinitionConfiguration : IEntityTypeConfiguration<SpecDefinition>
{
    public void Configure(EntityTypeBuilder<SpecDefinition> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Category)
            .IsRequired()
            .HasMaxLength(100);
            
        builder.Property(x => x.Key)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.Property(x => x.DefaultUnit)
            .HasMaxLength(50);

        // Make sure Category + Key is uniquely defined
        builder.HasIndex(x => new { x.Category, x.Key }).IsUnique();
    }
}
