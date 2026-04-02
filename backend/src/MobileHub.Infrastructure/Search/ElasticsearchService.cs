using Nest;
using MobileHub.Application.Phones.DTOs;
using MobileHub.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;

namespace MobileHub.Infrastructure.Search;

public class ElasticsearchService : ISearchService
{
    private readonly ElasticClient _client;
    private const string IndexName = "devices";

    public ElasticsearchService(IConfiguration configuration)
    {
        var url = configuration["Elasticsearch:Url"] ?? "http://localhost:9200";
        var settings = new ConnectionSettings(new Uri(url)).DefaultIndex(IndexName);
        _client = new ElasticClient(settings);
    }


    public async Task IndexDeviceAsync(DeviceDto device)
    {
        // Simple Indexing for Phones (Brand + Model + Specs)
        await _client.IndexAsync(device, idx => idx.Index(IndexName).Id(device.Id));
    }

    public async Task<IEnumerable<int>> SearchDeviceIdsAsync(string query)
    {
        // Fuzzy search on Model and Brand
        var response = await _client.SearchAsync<DeviceDto>(s => s
            .Index(IndexName)
            .Query(q => q
                .MultiMatch(m => m
                    .Fields(f => f.Field(d => d.BrandName).Field(d => d.Model))
                    .Query(query)
                    .Fuzziness(Fuzziness.Auto)
                )
            )
        );

        if (!response.IsValid) return Enumerable.Empty<int>();

        return response.Hits.Select(h => h.Id != null ? int.Parse(h.Id) : 0);
    }

    public async Task<IEnumerable<string>> GetAutocompleteSuggestionsAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query)) return Enumerable.Empty<string>();

        var response = await _client.SearchAsync<DeviceDto>(s => s
            .Index(IndexName)
            .Query(q => q
                .Prefix(p => p
                    .Field(f => f.Model)
                    .Value(query.ToLower())
                )
            )
            .Size(5)
        );

        if (!response.IsValid) return Enumerable.Empty<string>();

        return response.Hits.Select(h => $"{h.Source!.BrandName} {h.Source.Model}");
    }

    public async Task DeleteDeviceAsync(int id)
    {
        await _client.DeleteAsync<DeviceDto>(id, d => d.Index(IndexName));
    }
}
