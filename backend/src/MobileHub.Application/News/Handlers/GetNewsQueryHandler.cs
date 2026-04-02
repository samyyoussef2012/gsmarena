using MediatR;
using MobileHub.Application.Common.Interfaces;
using MobileHub.Domain.Entities;
using MobileHub.Domain.Specifications;

namespace MobileHub.Application.News.Handlers;

public class GetNewsQueryHandler : IRequestHandler<Queries.GetNewsQuery, IReadOnlyList<Domain.Entities.News>>
{
    private readonly IGenericRepository<Domain.Entities.News> _repository;

    public GetNewsQueryHandler(IGenericRepository<Domain.Entities.News> repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<Domain.Entities.News>> Handle(Queries.GetNewsQuery request, CancellationToken cancellationToken)
    {
        var spec = new LatestNewsSpecification(request.Limit);
        return await _repository.ListAsync(spec);
    }
}

public class LatestNewsSpecification : BaseSpecification<Domain.Entities.News>
{
    public LatestNewsSpecification(int limit) : base(x => x.IsPublished)
    {
        AddOrderByDescending(x => x.CreatedAt);
        ApplyPaging(0, limit);
    }
}
