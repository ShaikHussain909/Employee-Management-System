
using System.ComponentModel.DataAnnotations;

namespace Employee_Management_System.DTO_s
{
    public class EmployeeCreateDto
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(50)]
        [Phone]
        public string Phone { get; set; }
        [Required]
        [Range(10000, 1_000_000, ErrorMessage ="Salary must be between 10000 and 1000000")]
        public decimal Salary { get; set; }
        [Required]

        public DateOnly DateOfJoin { get; set; }
        [Required]

        public int DepartmentId { get; set; }
        [Required]
        public int DesignationId { get; set; }
        
    }
}
