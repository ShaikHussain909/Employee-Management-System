using System;
using System.Collections.Generic;

namespace Employee_Management_System.Models;

public partial class Designation
{
    public int DesignationId { get; set; }

    public string DesignationName { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
