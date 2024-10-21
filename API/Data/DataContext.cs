using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AuctionItem> AuctionItems { get; set; }
        public DbSet<Bid> Bids { get; set; }

        // Any additional configurations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional: Configure relationships, constraints, etc.
        }
    }
}