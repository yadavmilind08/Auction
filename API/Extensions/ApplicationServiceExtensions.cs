using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuctionItemRepository, AuctionItemRepository>();
            services.AddScoped<IBidRepository, BidRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountSevice, AccountService>();
            services.AddScoped<IAuctionItemService, AuctionItemService>();
            services.AddScoped<IBidService, BidService>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
    }
}