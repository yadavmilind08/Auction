using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class AuctionItemsController : BaseApiController
    {
        private readonly IAuctionItemService _auctionItemService;
        private readonly IBidService _bidService;

        public AuctionItemsController(IAuctionItemService auctionItemService, IBidService bidService)
        {
            _auctionItemService = auctionItemService;
            _bidService = bidService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionItemDto>>> GetAuctionItems()
        {
            var auctionItems = await _auctionItemService.GetAuctionItemsAsync();
            return Ok(auctionItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionItemDto>> GetAuctionItem(int id)
        {
            var auctionItem = await _auctionItemService.GetAuctionItemByIdAsync(id);
            return auctionItem != null ? Ok(auctionItem) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateAuctionItem(AuctionItemDto auctionItemDto)
        {
            await _auctionItemService.AddAuctionItemAsync(auctionItemDto);
            return CreatedAtAction(nameof(GetAuctionItem), new { id = auctionItemDto.Id }, auctionItemDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuctionItem(int id, AuctionItemDto auctionItemDto)
        {
            auctionItemDto.Id = id;
            var updated = await _auctionItemService.UpdateAuctionItemAsync(auctionItemDto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuctionItem(int id)
        {
            var deleted = await _auctionItemService.DeleteAuctionItemAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpPost("{id}/bids")]
        public async Task<ActionResult> PlaceBid(int id, BidDto bidDto)
        {
            bidDto.AuctionItemId = id;
            var success = await _bidService.PlaceBidAsync(bidDto);
            return success ? Ok() : BadRequest("Failed to place bid. Ensure the bid is valid and above the current bid.");
        }
    }
}
