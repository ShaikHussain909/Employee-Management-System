namespace Employee_Management_System.DTOs
{
    public class EmployeeReadDto
    {
        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public decimal? Salary { get; set; }
        public DateOnly? DateOfJoin { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public string? DepartmentName { get; set; }
        public string? DesignationName { get; set; }
        public bool? IsActive { get; set; }
    }
}

