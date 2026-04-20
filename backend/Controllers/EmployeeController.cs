using Microsoft.AspNetCore.Mvc;
using System;
using Employee_Management_System.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Employee_Management_System.Data;
using Employee_Management_System.DTOs;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Employee_Management_System.Responses;

// Add this using statement if EmployeeCreateDto is in Employee_Management_System.DTO_s
using Employee_Management_System.DTO_s;

namespace Employee_Management_System.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeManagementDbContext _context;
        public EmployeeController(EmployeeManagementDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "HR,Admin,Employee")]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees(
       
            int pageNumber = 1,
            int pageSize = 5,
            string? search =null,
            int? departmentId = null)
             
        {
            var query = _context.Employees
                .Include(e => e.Department)
                .Include(e => e.Designation)
                .AsQueryable();
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e =>
                e.FirstName.Contains(search) ||
                e.LastName.Contains(search) ||
                e.Email.Contains(search));
            }
            if (departmentId.HasValue)
            {
                query = query.Where(e => e.DepartmentId == departmentId.Value);
            }
            
          

               var totalRecords = await query.CountAsync();
            var employees = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(e => new EmployeeReadDto
                {
                    EmpId = e.EmpId,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Email = e.Email,
                    Phone = e.Phone,
                    Salary = e.Salary,
                    DepartmentId = (int)e.DepartmentId,
                    DesignationId = (int)e.DesignationId,
                    DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                    DesignationName = e.Designation != null ? e.Designation.DesignationName : null
                })
                .ToListAsync();
            return Ok(new ApiResponse<object>(
                true,
                "Employees retrieved successfully",
                new
                {
                      totalRecords,
                      pageNumber,
                      pageSize,
                    records = employees
                }
                ));


        }
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeCreateDto dto)
        {
            var departmentExists = await _context.Departments
                .AnyAsync(d => d.DepartmentId == dto.DepartmentId);
            if (!departmentExists)
            {
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Invalid DepartmentId",
                    null
                    ));
            }
            var designationExists = await _context.Designations
                .AnyAsync(d => d.DesignationId == dto.DesignationId);
            if (!designationExists)
            {
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Invalid DesignationId",
                    null
                    ));
            }
            var employee = new Employee
            {   
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Salary = dto.Salary,
                DateOfJoin = dto.DateOfJoin,
                DepartmentId = dto.DepartmentId,
                DesignationId = dto.DesignationId,
            };
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return  CreatedAtAction(nameof(GetEmployeeById), 
                new { id = employee.EmpId }, 
                new ApiResponse<object>(
                    true,
                    "Employee Created Successfully",
                    new {employee.EmpId}
                    )
                );
        }
        [Authorize(Roles = "HR,Admin,Employee")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            
            var employee = await _context.Employees
                .Include(e=> e.Department)
                .Include(e=> e.Designation)
                .Where(e=> e.EmpId==id)
                .Select(e=> new EmployeeReadDto
                {
                    EmpId =e.EmpId,
                    FirstName =e.FirstName,
                    LastName = e.LastName,
                    Email =e.Email,
                    Phone= e.Phone,
                    Salary = e.Salary,
                    DepartmentId = (int)e.DepartmentId,
                    DesignationId =(int) e.DesignationId,
                    DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                    DesignationName = e.Designation != null ? e.Designation.DesignationName : null


                })
                .FirstOrDefaultAsync();
            if(employee == null)
            {
                return NotFound(new ApiResponse<object>(
                    false,
                    $"Employee with given ID {id} not found", 
                    null
                    ));

            }
            return Ok(new ApiResponse<EmployeeReadDto>(
                true,
                "Employee retrieved successfully",
                employee
                ));

        }
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee (int id, EmployeeUpdateDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound(new ApiResponse<object>(
                    false,
                    $"Employee with given ID {id} not found",
                    null
                    ));
            }
            var departmentExists = await _context.Departments
                .AnyAsync(d => d.DepartmentId == dto.DepartmentId);
            if (!departmentExists)
            {
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Invalid DepartmentId",
                    null
                    ));
            }
            var designationExists = await _context.Designations
                .AnyAsync(d => d.DesignationId == dto.DesignationId);
            if (!designationExists)
            {
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Invalid DesignationId",
                    null
                    ));
            }

            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
           // employee.Email = dto.Email;
            employee.Phone = dto.Phone;
            employee.Salary = dto.Salary;
           // employee.DateOfJoin = dto.DateOfJoin;
            employee.DepartmentId = dto.DepartmentId;
            employee.DesignationId = dto.DesignationId;
            
            await _context.SaveChangesAsync();
            return Ok(new ApiResponse<object>(
                true,
                "Employee Updated Successfully",
                null
                ));
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound(new ApiResponse<object>(
                    false,
                    $"Employee with given ID {id} not found",
                    null
                    ));
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<object>(
                true,
                "Employee Deleted Successfully",
                null
                ));
        }
    }
}
