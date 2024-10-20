using API.DTOs;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;

        }

        public async Task<IEnumerable<AppUserDto>> GetUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();
            return _mapper.Map<IEnumerable<AppUserDto>>(users);
        }

        public async Task<AppUserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            return _mapper.Map<AppUserDto>(user);
        }
    }
}