using MediatR;

namespace MobileHub.Application.Search.Queries;

/**
 * GetAutocomplete Query
 * Returns a list of strings representing device suggestions (Brand + Model).
 */
public class GetAutocompleteQuery : IRequest<IEnumerable<string>>
{
    public string Query { get; set; } = null!;
}
