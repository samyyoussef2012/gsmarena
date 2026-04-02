using Microsoft.EntityFrameworkCore;
using MobileHub.Infrastructure.Data;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Infrastructure.Persistence;
using MobileHub.Application.Phones.Handlers;
using MobileHub.Application.Common.Behaviours;
using MediatR;
using MobileHub.Infrastructure.Search;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Infrastructure Services ---
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? "Host=localhost;Database=MobileHubDb;Username=postgres;Password=postgres"));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IApplicationDbContext>(provider => 
    provider.GetRequiredService<ApplicationDbContext>());
builder.Services.AddScoped<ISearchService, ElasticsearchService>();

// --- 2. Application Services ---
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(GetPhonesQueryHandler).Assembly);
    cfg.AddOpenBehavior(typeof(CachingBehaviour<,>));
});

// --- 3. External Services ---
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 4. DATA SEEDING (Level Gamed 🔥) ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        // Ensure database is created and up to date
        // await context.Database.MigrateAsync(); // Uncomment after migrations are generated
        await DbInitializer.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during database seeding.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
