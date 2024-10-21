using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class BidService : IBidService
    {
        private readonly IBidRepository _bidRepository;
        private readonly IAuctionItemRepository _auctionItemRepository;
        private readonly IMapper _mapper;

        public BidService(IBidRepository bidRepository, IAuctionItemRepository auctionItemRepository, IMapper mapper)
        {
            _bidRepository = bidRepository;
            _auctionItemRepository = auctionItemRepository;
            _mapper = mapper;
        }

        public async Task<bool> PlaceBidAsync(BidDto bidDto)
        {
            var auctionItem = await _auctionItemRepository.GetAuctionItemByIdAsync(bidDto.AuctionItemId);
            if (auctionItem == null || auctionItem.EndDate < DateTime.Now || bidDto.Amount < auctionItem.MinimumBid)
            {
                return false; // Auction item doesn't exist, is expired, or bid is below minimum
            }

            if (bidDto.Amount > auctionItem.CurrentBid)
            {
                auctionItem.CurrentBid = bidDto.Amount; // Update the current bid if it's higher
            }

            var bid = _mapper.Map<Bid>(bidDto);
            await _bidRepository.AddBidAsync(bid);
            _auctionItemRepository.Update(auctionItem); // Update auction item
            return await _bidRepository.SaveAllAsync();
        }
    }
}
