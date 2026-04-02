using MediatR;
using MobileHub.Domain.Entities;

namespace MobileHub.Application.Reviews.Queries;

public class GetReviewsQuery : IRequest<IReadOnlyList<Review>>
{
    public int? DeviceId { get; set; }
}
