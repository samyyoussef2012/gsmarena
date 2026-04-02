using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileHub.Application.Search.Queries;
using MobileHub.Application.Phones.DTOs;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly IMediator _mediator;

    public SearchController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DeviceDto>>> Search([FromQuery] string q)
    {
        return Ok(await _mediator.Send(new SearchPhonesQuery { Query = q }));
    }

    [HttpGet("autocomplete")]
    public async Task<ActionResult<IEnumerable<string>>> Autocomplete([FromQuery] string q)
    {
        return Ok(await _mediator.Send(new GetAutocompleteQuery { Query = q }));
    }
}
