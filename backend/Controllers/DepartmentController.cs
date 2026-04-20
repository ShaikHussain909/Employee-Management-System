using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Employee_Management_System.DTO_s;
using Employee_Management_System.Models;
using Employee_Management_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Employee_Management_System.Responses;


namespace Employee_Management_System.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly EmployeeManagementDbContext _context;
        public DepartmentController(EmployeeManagementDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin,HR,Employee")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentReadDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .Select(d => new DepartmentReadDto
                {
                    DepartmentId = d.DepartmentId,
                    DepartmentName = d.DepartmentName
                })
                .ToListAsync();
            return Ok(new ApiResponse<IEnumerable<DepartmentReadDto>>(
                true,
                "Department retrived Successfully",
                departments
                ));

        }
        [Authorize(Roles = "Admin,HR")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Department>>> CreateDepartment(DepartmentCreateDto dto)
        {
            var department = new Department
            {
                DepartmentName = dto.DepartmentName
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<Department>(
                true,
                "Department created successfully",
                department
            ));
        }
        [Authorize(Roles = "Admin,HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, DepartmentCreateDto dto)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
                return NotFound();

            department.DepartmentName = dto.DepartmentName;

            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(
                true,
                "Department updated successfully",
                null
            ));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                return NotFound(new ApiResponse<string>(
                    false,
                    "Department not found",
                    null
                ));
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(
                true,
                "Department deleted successfully",
                null
            ));
        }
    }
}
