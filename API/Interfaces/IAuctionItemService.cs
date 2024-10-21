using API.DTOs;

namespace API.Interfaces
{
    public interface IAuctionItemService
    {
        Task<IEnumerable<AuctionItemDto>> GetAuctionItemsAsync();
        Task<AuctionItemDto> GetAuctionItemByIdAsync(int id);
        Task AddAuctionItemAsync(AuctionItemDto auctionItemDto);
        Task<bool> UpdateAuctionItemAsync(AuctionItemDto auctionItemDto);
        Task<bool> DeleteAuctionItemAsync(int id);
    }
}
