using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Employee_Management_System.DTO_s;
using Employee_Management_System.Models;
using Employee_Management_System.Data;
using Microsoft.AspNetCore.Authorization;
using Employee_Management_System.Responses;

namespace Employee_Management_System.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly EmployeeManagementDbContext _context;
        public DesignationController(EmployeeManagementDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "Admin,HR,Employee")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DesignationReadDto>>> GetDesignations()
        {
            var designations = await _context.Designations
                .Select(d => new DesignationReadDto
                {
                    DesignationId = d.DesignationId,
                    DesignationName = d.DesignationName
                })
                .ToListAsync();
            return Ok(new ApiResponse<IEnumerable<DesignationReadDto>>
            (
                 true,
                 "Designations retrieved successfully",
                 designations
            ));
        }
        [Authorize(Roles = "Admin,HR")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<DesignationReadDto>>> CreateDesignation(DesignationCreateDto dto)
        {
            var designation = new Designation
            {
                DesignationName = dto.DesignationName
            };

            _context.Designations.Add(designation);
            await _context.SaveChangesAsync();

            var result = new DesignationReadDto
            {
                DesignationId = designation.DesignationId,
                DesignationName = designation.DesignationName
            };

            return Ok(new ApiResponse<DesignationReadDto>
            (
                true,
                "Designation created successfully",
                result
            ));
        }

        [Authorize(Roles = "Admin,HR")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> UpdateDesignation(int id, DesignationCreateDto dto)
        {
            var designation = await _context.Designations.FindAsync(id);

            if (designation == null)
            {
                return NotFound(new ApiResponse<string>(false, "Designation not found", null));
            }

            designation.DesignationName = dto.DesignationName;

            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>
            (
                true,
                "Designation updated successfully",
                null
            ));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteDesignation(int id)
        {
            var designation = await _context.Designations.FindAsync(id);

            if (designation == null)
            {
                return NotFound(new ApiResponse<string>(false, "Designation not found", null));
            }

            _context.Designations.Remove(designation);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>
            (
                true,
                "Designation deleted successfully",
                null
            ));
        }
    }
}
