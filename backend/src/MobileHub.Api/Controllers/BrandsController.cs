using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Application.Brands.Queries;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandsController : ControllerBase
{
    private readonly IGenericRepository<Brand> _repository;

    public BrandsController(IGenericRepository<Brand> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
    {
        // Simple direct repository call for brands (No CQRS for simplicity here, can be added if needed)
        // brands are small and consistent
        var brands = await _repository.ListAsync(new ActiveBrandsSpecification());
        return Ok(brands);
    }
}

