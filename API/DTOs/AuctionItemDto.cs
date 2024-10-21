namespace API.DTOs
{
    public class AuctionItemDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal MinimumBid { get; set; }
        public decimal CurrentBid { get; set; }
        public DateTime EndDate { get; set; }
        public int UserId { get; set; }
        public List<BidDto>? Bids { get; set; } // Include a list of BidDto

    }
}
