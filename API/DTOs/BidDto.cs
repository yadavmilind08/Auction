namespace API.DTOs
{
    public class BidDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public bool IsStraightBid { get; set; }
        public int AuctionItemId { get; set; }
        public int UserId { get; set; }
    }
}
