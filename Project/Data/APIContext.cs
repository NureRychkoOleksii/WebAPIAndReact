using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Data;

public class APIContext : DbContext
{
    public APIContext(DbContextOptions<APIContext> options) : base(options)
    {
        
    }

    public DbSet<Employees> Employees { get; set; }
    public DbSet<Department> Department { get; set; }
}