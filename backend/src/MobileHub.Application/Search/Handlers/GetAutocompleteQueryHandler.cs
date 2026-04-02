using MediatR;
using MobileHub.Application.Common.Interfaces;

namespace MobileHub.Application.Search.Handlers;

public class GetAutocompleteQueryHandler : IRequestHandler<Queries.GetAutocompleteQuery, IEnumerable<string>>
{
    private readonly ISearchService _searchService;

    public GetAutocompleteQueryHandler(ISearchService searchService)
    {
        _searchService = searchService;
    }

    public async Task<IEnumerable<string>> Handle(Queries.GetAutocompleteQuery request, CancellationToken cancellationToken)
    {
        // Now it's a "Thin Handler" that uses the abstraction (Level Gamed API)
        return await _searchService.GetAutocompleteSuggestionsAsync(request.Query);
    }
}
