using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AuctionItemRepository : IAuctionItemRepository
    {
        private readonly DataContext _context;
        public AuctionItemRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AuctionItem> GetAuctionItemByIdAsync(int id)
        {
            return await _context.AuctionItems.Include(a => a.Bids).SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<AuctionItem>> GetAuctionItemsAsync()
        {
            return await _context.AuctionItems.Include(a => a.Bids).ToListAsync();
        }

        public async Task AddAuctionItemAsync(AuctionItem auctionItem)
        {
            _context.AuctionItems.Add(auctionItem);
            await _context.SaveChangesAsync();
        }

        public void Update(AuctionItem auctionItem)
        {
            _context.Entry(auctionItem).State = EntityState.Modified;
        }

        public void Delete(AuctionItem auctionItem)
        {
            _context.AuctionItems.Remove(auctionItem);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
