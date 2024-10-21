using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class BidRepository : IBidRepository
    {
        private readonly DataContext _context;

        public BidRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddBidAsync(Bid bid)
        {
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
