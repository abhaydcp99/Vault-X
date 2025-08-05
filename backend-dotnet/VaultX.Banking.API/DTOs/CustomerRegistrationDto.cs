using System.ComponentModel.DataAnnotations;

namespace VaultX.Banking.API.DTOs;

public class CustomerRegistrationDto
{
    [Required(ErrorMessage = "First name is required")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Last name is required")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required")]
    public string Phone { get; set; } = string.Empty;

    public DateOnly? DateOfBirth { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Account type is required")]
    public string AccountType { get; set; } = string.Empty;

    [Required(ErrorMessage = "Initial deposit is required")]
    [Range(500, double.MaxValue, ErrorMessage = "Minimum initial deposit is ₹500")]
    public decimal InitialDeposit { get; set; }

    public string? PanNumber { get; set; }
    public string? AadharNumber { get; set; }
    public string? Occupation { get; set; }
    public string? MonthlyIncome { get; set; }
}
