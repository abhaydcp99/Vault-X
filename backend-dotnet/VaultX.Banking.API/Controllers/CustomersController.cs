using Microsoft.AspNetCore.Mvc;
using VaultX.Banking.API.DTOs;
using VaultX.Banking.API.Services;

namespace VaultX.Banking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<CustomerResponseDto>>> RegisterCustomer(CustomerRegistrationDto registrationDto)
    {
        try
        {
            var customer = await _customerService.RegisterCustomerAsync(registrationDto);
            return Ok(new ApiResponse<CustomerResponseDto>(true, "Customer registered successfully", customer));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<CustomerResponseDto>(false, ex.Message, null));
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<CustomerLoginResponseDto>>> LoginCustomer(CustomerLoginDto loginDto)
    {
        try
        {
            var response = await _customerService.LoginCustomerAsync(loginDto);
            return Ok(new ApiResponse<CustomerLoginResponseDto>(true, "Login successful", response));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<CustomerLoginResponseDto>(false, ex.Message, null));
        }
    }

    [HttpGet("{customerId}")]
    public async Task<ActionResult<ApiResponse<CustomerResponseDto>>> GetCustomer(int customerId)
    {
        try
        {
            var customer = await _customerService.GetCustomerByIdAsync(customerId);
            return Ok(new ApiResponse<CustomerResponseDto>(true, "Customer found", customer));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<CustomerResponseDto>(false, ex.Message, null));
        }
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CustomerResponseDto>>>> GetAllCustomers()
    {
        var customers = await _customerService.GetAllCustomersAsync();
        return Ok(new ApiResponse<List<CustomerResponseDto>>(true, "Customers retrieved successfully", customers));
    }

    [HttpPut("{customerId}/status")]
    public async Task<ActionResult<ApiResponse<CustomerResponseDto>>> UpdateCustomerStatus(
        int customerId, CustomerStatusUpdateDto statusUpdateDto)
    {
        try
        {
            var customer = await _customerService.UpdateCustomerStatusAsync(customerId, statusUpdateDto);
            return Ok(new ApiResponse<CustomerResponseDto>(true, "Customer status updated successfully", customer));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<CustomerResponseDto>(false, ex.Message, null));
        }
    }

    [HttpPost("{customerId}/transactions")]
    public async Task<ActionResult<ApiResponse<TransactionResponseDto>>> PerformTransaction(
        int customerId, TransactionRequestDto transactionDto)
    {
        try
        {
            var transaction = await _customerService.PerformTransactionAsync(customerId, transactionDto);
            return Ok(new ApiResponse<TransactionResponseDto>(true, "Transaction completed successfully", transaction));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<TransactionResponseDto>(false, ex.Message, null));
        }
    }

    [HttpGet("{customerId}/transactions")]
    public async Task<ActionResult<ApiResponse<List<TransactionResponseDto>>>> GetCustomerTransactions(int customerId)
    {
        try
        {
            var transactions = await _customerService.GetCustomerTransactionsAsync(customerId);
            return Ok(new ApiResponse<List<TransactionResponseDto>>(true, "Transactions retrieved successfully", transactions));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<List<TransactionResponseDto>>(false, ex.Message, null));
        }
    }

    [HttpGet("{customerId}/balance")]
    public async Task<ActionResult<ApiResponse<BalanceResponseDto>>> GetCustomerBalance(int customerId)
    {
        try
        {
            var balance = await _customerService.GetCustomerBalanceAsync(customerId);
            return Ok(new ApiResponse<BalanceResponseDto>(true, "Balance retrieved successfully", balance));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<BalanceResponseDto>(false, ex.Message, null));
        }
    }
}
