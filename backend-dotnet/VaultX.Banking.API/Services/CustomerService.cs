using Microsoft.EntityFrameworkCore;
using VaultX.Banking.API.Data;
using VaultX.Banking.API.DTOs;
using VaultX.Banking.API.Models;

namespace VaultX.Banking.API.Services;

public class CustomerService : ICustomerService
{
    private readonly BankingDbContext _context;

    public CustomerService(BankingDbContext context)
    {
        _context = context;
    }

    public async Task<CustomerResponseDto> RegisterCustomerAsync(CustomerRegistrationDto registrationDto)
    {
        // Check if email already exists
        if (await _context.Customers.AnyAsync(c => c.Email == registrationDto.Email))
        {
            throw new ArgumentException("Email already registered");
        }

        // Check if phone already exists
        if (await _context.Customers.AnyAsync(c => c.Phone == registrationDto.Phone))
        {
            throw new ArgumentException("Phone number already registered");
        }

        var customer = new Customer
        {
            FirstName = registrationDto.FirstName,
            LastName = registrationDto.LastName,
            Email = registrationDto.Email,
            Phone = registrationDto.Phone,
            DateOfBirth = registrationDto.DateOfBirth,
            Password = BCrypt.Net.BCrypt.HashPassword(registrationDto.Password),
            AccountType = Enum.Parse<AccountType>(registrationDto.AccountType, true),
            InitialDeposit = registrationDto.InitialDeposit,
            CurrentBalance = registrationDto.InitialDeposit,
            PanNumber = registrationDto.PanNumber,
            AadharNumber = registrationDto.AadharNumber,
            Occupation = registrationDto.Occupation,
            MonthlyIncome = registrationDto.MonthlyIncome,
            Status = CustomerStatus.DocumentsSubmitted
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return ConvertToResponseDto(customer);
    }

    public async Task<CustomerLoginResponseDto> LoginCustomerAsync(CustomerLoginDto loginDto)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Email == loginDto.EmailOrPhone || c.Phone == loginDto.EmailOrPhone);

        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, customer.Password))
        {
            throw new ArgumentException("Invalid password");
        }

        return new CustomerLoginResponseDto
        {
            CustomerId = customer.Id,
            Email = customer.Email,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Status = customer.Status.ToString(),
            CanPerformOperations = customer.CanPerformOperations
        };
    }

    public async Task<CustomerResponseDto> GetCustomerByIdAsync(int customerId)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        return ConvertToResponseDto(customer);
    }

    public async Task<List<CustomerResponseDto>> GetAllCustomersAsync()
    {
        var customers = await _context.Customers.ToListAsync();
        return customers.Select(ConvertToResponseDto).ToList();
    }

    public async Task<CustomerResponseDto> UpdateCustomerStatusAsync(int customerId, CustomerStatusUpdateDto statusUpdateDto)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        customer.Status = Enum.Parse<CustomerStatus>(statusUpdateDto.Status, true);
        customer.KycCompleted = statusUpdateDto.KycCompleted;
        customer.CanPerformOperations = statusUpdateDto.CanPerformOperations;
        customer.UpdatedAt = DateTime.UtcNow;

        if (statusUpdateDto.Status.Equals("Approved", StringComparison.OrdinalIgnoreCase))
        {
            customer.ApprovalDate = DateOnly.FromDateTime(DateTime.Now);
            customer.AccountNumber = GenerateAccountNumber();
        }

        await _context.SaveChangesAsync();
        return ConvertToResponseDto(customer);
    }

    public async Task<TransactionResponseDto> PerformTransactionAsync(int customerId, TransactionRequestDto transactionDto)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        if (!customer.CanPerformOperations)
        {
            throw new ArgumentException("Customer is not authorized to perform transactions");
        }

        var transactionType = Enum.Parse<TransactionType>(transactionDto.Type, true);

        // Validate transaction
        if (transactionType is TransactionType.Debit or TransactionType.Transfer)
        {
            if (customer.CurrentBalance < transactionDto.Amount)
            {
                throw new ArgumentException("Insufficient balance");
            }
        }

        // Update balance
        decimal newBalance;
        if (transactionType == TransactionType.Credit)
        {
            newBalance = customer.CurrentBalance + transactionDto.Amount;
        }
        else
        {
            newBalance = customer.CurrentBalance - transactionDto.Amount;
        }

        customer.CurrentBalance = newBalance;
        customer.UpdatedAt = DateTime.UtcNow;

        // Create transaction record
        var transaction = new Transaction
        {
            CustomerId = customer.Id,
            TransactionType = transactionType,
            Amount = transactionDto.Amount,
            Description = transactionDto.Description,
            RecipientAccount = transactionDto.RecipientAccount,
            BalanceAfter = newBalance,
            Status = TransactionStatus.Completed,
            ReferenceNumber = "TXN" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return ConvertToTransactionResponseDto(transaction);
    }

    public async Task<List<TransactionResponseDto>> GetCustomerTransactionsAsync(int customerId)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        var transactions = await _context.Transactions
            .Where(t => t.CustomerId == customerId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return transactions.Select(ConvertToTransactionResponseDto).ToList();
    }

    public async Task<BalanceResponseDto> GetCustomerBalanceAsync(int customerId)
    {
        var customer = await _context.Customers.FindAsync(customerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        return new BalanceResponseDto
        {
            CurrentBalance = customer.CurrentBalance,
            AccountNumber = customer.AccountNumber,
            AccountType = customer.AccountType.ToString()
        };
    }

    private static CustomerResponseDto ConvertToResponseDto(Customer customer)
    {
        return new CustomerResponseDto
        {
            Id = customer.Id,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Email = customer.Email,
            Phone = customer.Phone,
            DateOfBirth = customer.DateOfBirth,
            AccountNumber = customer.AccountNumber,
            AccountType = customer.AccountType.ToString(),
            CurrentBalance = customer.CurrentBalance,
            Status = customer.Status.ToString(),
            KycCompleted = customer.KycCompleted,
            CanPerformOperations = customer.CanPerformOperations,
            SubmittedDate = customer.SubmittedDate,
            KycDate = customer.KycDate,
            ApprovalDate = customer.ApprovalDate
        };
    }

    private static TransactionResponseDto ConvertToTransactionResponseDto(Transaction transaction)
    {
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

    private static string GenerateAccountNumber()
    {
        return "VX" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }
}
