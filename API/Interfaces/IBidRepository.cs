using API.Entities;

namespace API.Interfaces
{
    public interface IBidRepository
    {
        Task AddBidAsync(Bid bid);
        Task<bool> SaveAllAsync();
    }
}
