using System.ComponentModel.DataAnnotations;

namespace VaultX.Banking.API.Models;

public class Employee
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string EmployeeId { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string Phone { get; set; } = string.Empty;

    public DateOnly? DateOfBirth { get; set; }

    [Required]
    [StringLength(255)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public EmployeeRole Role { get; set; }

    [StringLength(100)]
    public string? Department { get; set; }

    [StringLength(100)]
    public string? Designation { get; set; }

    public DateOnly JoiningDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    [StringLength(50)]
    public string? ReportingManager { get; set; }

    [StringLength(255)]
    public string? WorkLocation { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime? LastLogin { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum EmployeeRole
{
    Clerk,
    Manager,
    Admin
}
