using MobileHub.Domain.Entities;

namespace MobileHub.Application.Brands.Queries;

public class ActiveBrandsSpecification : MobileHub.Domain.Specifications.BaseSpecification<Brand>
{
    public ActiveBrandsSpecification() : base(x => x.IsActive)
    {
    }
}
