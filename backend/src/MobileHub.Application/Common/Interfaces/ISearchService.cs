using MobileHub.Application.Phones.DTOs;

namespace MobileHub.Application.Common.Interfaces;

/**
 * Search Service Interface
 * Decouples the Application layer from Elasticsearch details.
 */
public interface ISearchService
{
    Task IndexDeviceAsync(DeviceDto device);
    Task<IEnumerable<int>> SearchDeviceIdsAsync(string query);
    Task<IEnumerable<string>> GetAutocompleteSuggestionsAsync(string query);
    Task DeleteDeviceAsync(int id);
}
