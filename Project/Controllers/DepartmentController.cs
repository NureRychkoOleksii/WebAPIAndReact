using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Data;
using Project.Models;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly APIContext _context;
        private readonly ILogger<DepartmentController> _logger;

        public DepartmentController(IConfiguration configuration, ILogger<DepartmentController> logger,
            APIContext context)
        {
            _logger = logger;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var departments = await _context.Department.ToListAsync();
            return Ok(departments);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Department department)
        {
            await _context.Department.AddAsync(department);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Department department)
        {
            _context.Update(department);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var departmentList = await _context.Department.ToListAsync();
            var department = departmentList.FirstOrDefault(dep => dep.Id == id);
            _context.Department.Remove(department);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
