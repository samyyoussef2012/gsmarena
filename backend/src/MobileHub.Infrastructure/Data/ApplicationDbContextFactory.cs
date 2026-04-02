using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MobileHub.Infrastructure.Data;

/// <summary>
/// This factory is used by the EF Core CLI (dotnet ef) at design-time to create the DbContext.
/// This bypasses Program.cs and completely avoids any startup errors like the Swashbuckle/OpenAPI issue.
/// </summary>
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        
        // This connection string is used ONLY when generating migrations via the CLI.
        // The actual application will use the connection string from appsettings.json.
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=MobileHubDb;Username=postgres;Password=postgres");

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
