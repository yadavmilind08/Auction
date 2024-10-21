using API.DTOs;

namespace API.Interfaces
{
    public interface IBidService
    {
        Task<bool> PlaceBidAsync(BidDto bidDto);
    }
}
