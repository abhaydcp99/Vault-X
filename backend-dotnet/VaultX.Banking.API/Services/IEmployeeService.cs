using Microsoft.EntityFrameworkCore;
using VaultX.Banking.API.Data;
using VaultX.Banking.API.Models;

namespace VaultX.Banking.API.Services;

public interface IEmployeeService
{
    Task<List<Employee>> GetAllEmployeesAsync();
    Task<Employee?> GetEmployeeByIdAsync(string employeeId);
}

public class EmployeeService : IEmployeeService
{
    private readonly BankingDbContext _context;

    public EmployeeService(BankingDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAllEmployeesAsync()
    {
        return await _context.Employees.Where(e => e.IsActive).ToListAsync();
    }

    public async Task<Employee?> GetEmployeeByIdAsync(string employeeId)
    {
        return await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
    }
}

public interface IJwtService
{
    string GenerateToken(string userId, string email, string role);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(string userId, string email, string role)
    {
        // Basic implementation - in production, use proper JWT generation
        return $"jwt-token-for-{userId}-{role}";
    }
}
