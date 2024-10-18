namespace API.DTOs
{
    public class AppUserDto
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public DateTime Created { get; set; }
    }
}