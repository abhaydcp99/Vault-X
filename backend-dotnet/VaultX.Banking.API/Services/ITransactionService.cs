using Microsoft.EntityFrameworkCore;
using VaultX.Banking.API.Data;
using VaultX.Banking.API.DTOs;

namespace VaultX.Banking.API.Services;

public interface ITransactionService
{
    Task<List<TransactionResponseDto>> GetAllTransactionsAsync();
    Task<TransactionResponseDto> GetTransactionByIdAsync(int transactionId);
}

public class TransactionService : ITransactionService
{
    private readonly BankingDbContext _context;

    public TransactionService(BankingDbContext context)
    {
        _context = context;
    }

    public async Task<List<TransactionResponseDto>> GetAllTransactionsAsync()
    {
        var transactions = await _context.Transactions
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return transactions.Select(t => new TransactionResponseDto
        {
            Id = t.Id,
            TransactionType = t.TransactionType.ToString(),
            Amount = t.Amount,
            Description = t.Description,
            RecipientAccount = t.RecipientAccount,
            BalanceAfter = t.BalanceAfter,
            Status = t.Status.ToString(),
            ReferenceNumber = t.ReferenceNumber,
            CreatedAt = t.CreatedAt
        }).ToList();
    }

    public async Task<TransactionResponseDto> GetTransactionByIdAsync(int transactionId)
    {
        var transaction = await _context.Transactions.FindAsync(transactionId);
        if (transaction == null)
        {
            throw new ArgumentException("Transaction not found");
        }

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            TransactionType = transaction.TransactionType.ToString(),
            Amount = transaction.Amount,
            Description = transaction.Description,
            RecipientAccount = transaction.RecipientAccount,
            BalanceAfter = transaction.BalanceAfter,
            Status = transaction.Status.ToString(),
            ReferenceNumber = transaction.ReferenceNumber,
            CreatedAt = transaction.CreatedAt
        };
    }
}
