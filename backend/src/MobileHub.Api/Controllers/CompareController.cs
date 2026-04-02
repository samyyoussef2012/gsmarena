using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileHub.Application.Compare.Queries;
using MobileHub.Application.Compare.DTOs;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompareController : ControllerBase
{
    private readonly IMediator _mediator;

    public CompareController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /**
     * Side-by-Side Comparison
     * GET /api/compare?ids=1,2,3
     */
    [HttpGet]
    public async Task<ActionResult<CompareResultDto>> Compare([FromQuery] string ids)
    {
        if (string.IsNullOrEmpty(ids)) return BadRequest("Device IDs are required.");

        var deviceIds = ids.Split(',')
            .Select(s => int.TryParse(s, out var id) ? id : 0)
            .Where(id => id > 0)
            .ToList();

        if (!deviceIds.Any()) return BadRequest("No valid Device IDs provided.");

        return Ok(await _mediator.Send(new CompareDevicesQuery { DeviceIds = deviceIds }));
    }
}
