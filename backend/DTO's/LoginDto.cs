using System; 
using System.ComponentModel.DataAnnotations;

namespace Employee_Management_System.DTO_s
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;

    }
}
