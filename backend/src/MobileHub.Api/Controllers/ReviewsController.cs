using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileHub.Application.Reviews.Queries;
using MobileHub.Domain.Entities;

namespace MobileHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ReviewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Review>>> GetReviews([FromQuery] int? deviceId)
    {
        return Ok(await _mediator.Send(new GetReviewsQuery { DeviceId = deviceId }));
    }
}
