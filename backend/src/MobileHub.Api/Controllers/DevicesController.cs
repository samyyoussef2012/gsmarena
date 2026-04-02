using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileHub.Application.Phones.DTOs;
using MobileHub.Application.Phones.Queries;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevicesController : ControllerBase
{
    private readonly IMediator _mediator;

    public DevicesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /**
     * Get Phones with dynamic specification filtering
     */
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DeviceDto>>> GetDevices([FromQuery] GetPhonesQuery query)
    {
        // Now the controller is a "Thin Controller"
        // It just forwards the query to MediatR
        var devices = await _mediator.Send(query);
        return Ok(devices);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<DeviceDto>> GetBySlug(string slug)
    {
        // TODO: Implement GetPhoneBySlugQuery later
        // Currently returning 404 for demonstration
        return NotFound();
    }
}
