using Microsoft.EntityFrameworkCore;
using VaultX.Banking.API.Models;

namespace VaultX.Banking.API.Data;

public class BankingDbContext : DbContext
{
    public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Customer entity
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.AccountNumber).IsUnique();
            entity.Property(e => e.CurrentBalance).HasPrecision(15, 2);
            entity.Property(e => e.InitialDeposit).HasPrecision(15, 2);
        });

        // Configure Transaction entity
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasPrecision(15, 2);
            entity.Property(e => e.BalanceAfter).HasPrecision(15, 2);
            entity.HasOne(e => e.Customer)
                  .WithMany(c => c.Transactions)
                  .HasForeignKey(e => e.CustomerId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure Employee entity
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.EmployeeId).IsUnique();
        });
    }

    public void SeedData()
    {
        if (!Employees.Any())
        {
            var employees = new List<Employee>
            {
                new Employee
                {
                    EmployeeId = "ADM001",
                    FirstName = "Admin",
                    LastName = "User",
                    Email = "admin@vaultx.com",
                    Phone = "+91-9876543210",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = EmployeeRole.Admin,
                    Department = "Administration",
                    Designation = "System Administrator",
                    WorkLocation = "Mumbai Main Branch"
                },
                new Employee
                {
                    EmployeeId = "MGR001",
                    FirstName = "Manager",
                    LastName = "User",
                    Email = "manager@vaultx.com",
                    Phone = "+91-9876543211",
                    Password = BCrypt.Net.BCrypt.HashPassword("manager123"),
                    Role = EmployeeRole.Manager,
                    Department = "Operations",
                    Designation = "Branch Manager",
                    WorkLocation = "Mumbai Main Branch"
                },
                new Employee
                {
                    EmployeeId = "CLK001",
                    FirstName = "Clerk",
                    LastName = "User",
                    Email = "clerk@vaultx.com",
                    Phone = "+91-9876543212",
                    Password = BCrypt.Net.BCrypt.HashPassword("clerk123"),
                    Role = EmployeeRole.Clerk,
                    Department = "KYC",
                    Designation = "KYC Officer",
                    WorkLocation = "Mumbai Main Branch"
                }
            };

            Employees.AddRange(employees);
            SaveChanges();
        }

        if (!Customers.Any())
        {
            var customers = new List<Customer>
            {
                new Customer
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    Phone = "+91-9876543213",
                    Password = BCrypt.Net.BCrypt.HashPassword("customer123"),
                    AccountType = AccountType.Savings,
                    InitialDeposit = 10000,
                    CurrentBalance = 10000,
                    PanNumber = "ABCDE1234F",
                    AadharNumber = "123456789012",
                    Occupation = "Software Engineer",
                    MonthlyIncome = "50000-100000",
                    Status = CustomerStatus.Approved,
                    KycCompleted = true,
                    CanPerformOperations = true,
                    AccountNumber = "VX1234567890",
                    ApprovalDate = DateOnly.FromDateTime(DateTime.Now)
                }
            };

            Customers.AddRange(customers);
            SaveChanges();
        }
    }
}
