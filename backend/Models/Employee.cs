using System;
using System.Collections.Generic;

namespace Employee_Management_System.Models;

public partial class Employee
{
    public int EmpId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public decimal? Salary { get; set; }

    public DateOnly? DateOfJoin { get; set; }

    public int? DepartmentId { get; set; }

    public int? DesignationId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Designation? Designation { get; set; }
}
