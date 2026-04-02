using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data.Configurations;

public class NewsConfiguration : IEntityTypeConfiguration<News>
{
    public void Configure(EntityTypeBuilder<News> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.HasIndex(e => e.Slug).IsUnique();
        
        builder.Property(e => e.Title)
            .HasMaxLength(255)
            .IsRequired();
    }
}
