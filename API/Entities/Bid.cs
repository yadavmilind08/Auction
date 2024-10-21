namespace API.Entities
{
    public class Bid
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public bool IsStraightBid { get; set; } // True if it's a straight bid, False if it's a maximum bid
        public int AuctionItemId { get; set; }
        public required AuctionItem AuctionItem { get; set; }
        public int UserId { get; set; }
        public required AppUser User { get; set; }
    }
}
