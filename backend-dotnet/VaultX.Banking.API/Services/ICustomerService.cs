using VaultX.Banking.API.DTOs;
using VaultX.Banking.API.Models;

namespace VaultX.Banking.API.Services;

public interface ICustomerService
{
    Task<CustomerResponseDto> RegisterCustomerAsync(CustomerRegistrationDto registrationDto);
    Task<CustomerLoginResponseDto> LoginCustomerAsync(CustomerLoginDto loginDto);
    Task<CustomerResponseDto> GetCustomerByIdAsync(int customerId);
    Task<List<CustomerResponseDto>> GetAllCustomersAsync();
    Task<CustomerResponseDto> UpdateCustomerStatusAsync(int customerId, CustomerStatusUpdateDto statusUpdateDto);
    Task<TransactionResponseDto> PerformTransactionAsync(int customerId, TransactionRequestDto transactionDto);
    Task<List<TransactionResponseDto>> GetCustomerTransactionsAsync(int customerId);
    Task<BalanceResponseDto> GetCustomerBalanceAsync(int customerId);
}
