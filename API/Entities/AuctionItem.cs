namespace API.Entities
{
    public class AuctionItem
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal MinimumBid { get; set; }
        public decimal CurrentBid { get; set; }
        public DateTime EndDate { get; set; }

        // Navigation Properties
        public int UserId { get; set; }
        public required AppUser User { get; set; }
        public required ICollection<Bid> Bids { get; set; }

        // Constructor to set default EndDate
        public AuctionItem()
        {
            EndDate = DateTime.UtcNow.AddDays(3);
        }
    }
}
