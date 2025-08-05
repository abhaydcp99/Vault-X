using System.ComponentModel.DataAnnotations;

namespace VaultX.Banking.API.DTOs;

public class CustomerResponseDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public DateOnly? DateOfBirth { get; set; }
    public string? AccountNumber { get; set; }
    public string AccountType { get; set; } = string.Empty;
    public decimal CurrentBalance { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool KycCompleted { get; set; }
    public bool CanPerformOperations { get; set; }
    public DateOnly SubmittedDate { get; set; }
    public DateOnly? KycDate { get; set; }
    public DateOnly? ApprovalDate { get; set; }
}

public class CustomerLoginResponseDto
{
    public int CustomerId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool CanPerformOperations { get; set; }
}

public class CustomerStatusUpdateDto
{
    public string Status { get; set; } = string.Empty;
    public bool KycCompleted { get; set; }
    public bool CanPerformOperations { get; set; }
    public string? Notes { get; set; }
}

public class TransactionRequestDto
{
    [Required(ErrorMessage = "Transaction type is required")]
    public string Type { get; set; } = string.Empty; // CREDIT, DEBIT, TRANSFER

    [Required(ErrorMessage = "Amount is required")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
    public decimal Amount { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; } = string.Empty;

    public string? RecipientAccount { get; set; }
}

public class TransactionResponseDto
{
    public int Id { get; set; }
    public string TransactionType { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? RecipientAccount { get; set; }
    public decimal BalanceAfter { get; set; }
    public string Status { get; set; } = string.Empty;
    public string ReferenceNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class BalanceResponseDto
{
    public decimal CurrentBalance { get; set; }
    public string? AccountNumber { get; set; }
    public string AccountType { get; set; } = string.Empty;
}
