using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class AccountService : IAccountSevice
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public AccountService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<UserDto> RegisterAsync(RegisterDto registerDto)
        {
            if (await _userRepository.UserExistsAsync(registerDto.Email))
            {
                throw new InvalidOperationException("Username is taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                Email = registerDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _userRepository.AddUserAsync(user);

            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }

        public async Task<UserDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    throw new UnauthorizedAccessException("Invalid password");
                }
            }

            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}