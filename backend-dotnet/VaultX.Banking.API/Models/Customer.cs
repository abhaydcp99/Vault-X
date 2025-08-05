using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaultX.Banking.API.Models;

public class Customer
{
    [Key]
    public int Id { get; set; }

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

    [StringLength(50)]
    public string? AccountNumber { get; set; }

    public AccountType AccountType { get; set; }

    [Column(TypeName = "decimal(15,2)")]
    public decimal InitialDeposit { get; set; }

    [Column(TypeName = "decimal(15,2)")]
    public decimal CurrentBalance { get; set; }

    [StringLength(10)]
    public string? PanNumber { get; set; }

    [StringLength(12)]
    public string? AadharNumber { get; set; }

    [StringLength(100)]
    public string? Occupation { get; set; }

    [StringLength(50)]
    public string? MonthlyIncome { get; set; }

    public CustomerStatus Status { get; set; } = CustomerStatus.DocumentsSubmitted;

    public bool KycCompleted { get; set; } = false;

    public bool CanPerformOperations { get; set; } = false;

    public DateOnly SubmittedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    public DateOnly? KycDate { get; set; }

    public DateOnly? ApprovalDate { get; set; }

    public string? ClerkNotes { get; set; }

    public string? ManagerNotes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}

public enum AccountType
{
    Savings,
    Current
}

public enum CustomerStatus
{
    DocumentsSubmitted,
    KycInProgress,
    KycCompleted,
    Approved,
    Rejected
}
