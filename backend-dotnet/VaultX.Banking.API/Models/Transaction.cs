using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VaultX.Banking.API.Models;

public class Transaction
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }

    [Required]
    [Column(TypeName = "decimal(15,2)")]
    public decimal Amount { get; set; }

    [StringLength(255)]
    public string Description { get; set; } = string.Empty;

    [StringLength(50)]
    public string? RecipientAccount { get; set; }

    [Column(TypeName = "decimal(15,2)")]
    public decimal BalanceAfter { get; set; }

    public TransactionStatus Status { get; set; } = TransactionStatus.Pending;

    [StringLength(50)]
    public string ReferenceNumber { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    [ForeignKey("CustomerId")]
    public virtual Customer Customer { get; set; } = null!;
}

public enum TransactionType
{
    Credit,
    Debit,
    Transfer
}

public enum TransactionStatus
{
    Pending,
    Completed,
    Failed,
    Cancelled
}
