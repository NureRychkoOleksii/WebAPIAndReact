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
    public class EmployeesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly APIContext _context;
        private readonly ILogger<DepartmentController> _logger;

        public EmployeesController(IConfiguration configuration, ILogger<DepartmentController> logger,
            APIContext context)
        {
            _logger = logger;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var departments = await _context.Employees.ToListAsync();
            return Ok(departments);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Employee employee)
        {
            _context.Update(employee);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var employeesList = await _context.Employees.ToListAsync();
            var employee = employeesList.FirstOrDefault(emp => emp.Id == id);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
