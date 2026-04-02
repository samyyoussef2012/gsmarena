using MediatR;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Domain.Specifications;
using MobileHub.Application.Reviews.Queries;

namespace MobileHub.Application.Reviews.Handlers;

public class GetReviewsQueryHandler : IRequestHandler<GetReviewsQuery, IReadOnlyList<Domain.Entities.Review>>
{
    private readonly IGenericRepository<Domain.Entities.Review> _repository;

    public GetReviewsQueryHandler(IGenericRepository<Domain.Entities.Review> repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<Domain.Entities.Review>> Handle(GetReviewsQuery request, CancellationToken cancellationToken)
    {
        var spec = new DeviceReviewsSpecification(request.DeviceId);
        return await _repository.ListAsync(spec);
    }
}

public class DeviceReviewsSpecification : BaseSpecification<Domain.Entities.Review>
{
    public DeviceReviewsSpecification(int? deviceId) : base(x => !deviceId.HasValue || x.DeviceId == deviceId)
    {
        AddOrderByDescending(x => x.CreatedAt);
    }
}
