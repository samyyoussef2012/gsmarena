using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileHub.Application.News.Queries;
using MobileHub.Domain.Entities;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<News>>> GetNews([FromQuery] int limit = 10)
    {
        return Ok(await _mediator.Send(new GetNewsQuery { Limit = limit }));
    }
}
