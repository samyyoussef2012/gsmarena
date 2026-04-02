using Microsoft.EntityFrameworkCore;
using MobileHub.Domain.Entities;

namespace MobileHub.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Brand> Brands { get; }
    DbSet<Device> Devices { get; }
    DbSet<DeviceSpec> DeviceSpecs { get; }
    DbSet<Category> Categories { get; }
    DbSet<Review> Reviews { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
