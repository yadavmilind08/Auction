using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class AuctionItemService : IAuctionItemService
    {
        private readonly IAuctionItemRepository _auctionItemRepository;
        private readonly IMapper _mapper;

        public AuctionItemService(IAuctionItemRepository auctionItemRepository, IMapper mapper)
        {
            _auctionItemRepository = auctionItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AuctionItemDto>> GetAuctionItemsAsync()
        {
            var auctionItems = await _auctionItemRepository.GetAuctionItemsAsync();
            return _mapper.Map<IEnumerable<AuctionItemDto>>(auctionItems);
        }

        public async Task<AuctionItemDto> GetAuctionItemByIdAsync(int id)
        {
            var auctionItem = await _auctionItemRepository.GetAuctionItemByIdAsync(id);
            return _mapper.Map<AuctionItemDto>(auctionItem);
        }

        public async Task AddAuctionItemAsync(AuctionItemDto auctionItemDto)
        {
            var auctionItem = _mapper.Map<AuctionItem>(auctionItemDto);
            // Explicitly set the EndDate to 3 days from now
            if (auctionItem.EndDate == default)
            {
                auctionItem.EndDate = DateTime.UtcNow.AddDays(3);
            }
            await _auctionItemRepository.AddAuctionItemAsync(auctionItem);
        }

        public async Task<bool> UpdateAuctionItemAsync(AuctionItemDto auctionItemDto)
        {
            var auctionItem = await _auctionItemRepository.GetAuctionItemByIdAsync(auctionItemDto.Id);
            if (auctionItem == null) return false;

            _mapper.Map(auctionItemDto, auctionItem);
            _auctionItemRepository.Update(auctionItem);
            return await _auctionItemRepository.SaveAllAsync();
        }

        public async Task<bool> DeleteAuctionItemAsync(int id)
        {
            var auctionItem = await _auctionItemRepository.GetAuctionItemByIdAsync(id);
            if (auctionItem == null) return false;

            _auctionItemRepository.Delete(auctionItem);
            return await _auctionItemRepository.SaveAllAsync();
        }
    }
}
