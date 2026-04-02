using Microsoft.EntityFrameworkCore;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;

namespace MobileHub.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Device> Devices => Set<Device>();
    public DbSet<DeviceSpec> DeviceSpecs => Set<DeviceSpec>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<News> News => Set<News>();
    public DbSet<SpecDefinition> SpecDefinitions => Set<SpecDefinition>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}
