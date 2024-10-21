using API.Entities;

namespace API.Interfaces
{
    public interface IAuctionItemRepository
    {
        Task<AuctionItem> GetAuctionItemByIdAsync(int id);
        Task<IEnumerable<AuctionItem>> GetAuctionItemsAsync();
        Task AddAuctionItemAsync(AuctionItem auctionItem);
        void Update(AuctionItem auctionItem);
        void Delete(AuctionItem auctionItem);
        Task<bool> SaveAllAsync();
    }
}
