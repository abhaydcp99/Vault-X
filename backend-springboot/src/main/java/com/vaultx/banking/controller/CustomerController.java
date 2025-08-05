package com.vaultx.banking.controller;

import com.vaultx.banking.dto.*;
import com.vaultx.banking.entity.Customer;
import com.vaultx.banking.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "http://localhost:5173"})
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CustomerResponseDto>> registerCustomer(@Valid @RequestBody CustomerRegistrationDto registrationDto) {
        try {
            CustomerResponseDto customer = customerService.registerCustomer(registrationDto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Customer registered successfully", customer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<CustomerLoginResponseDto>> loginCustomer(@Valid @RequestBody CustomerLoginDto loginDto) {
        try {
            CustomerLoginResponseDto response = customerService.loginCustomer(loginDto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<ApiResponse<CustomerResponseDto>> getCustomer(@PathVariable Long customerId) {
        try {
            CustomerResponseDto customer = customerService.getCustomerById(customerId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Customer found", customer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerResponseDto>>> getAllCustomers() {
        List<CustomerResponseDto> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(new ApiResponse<>(true, "Customers retrieved successfully", customers));
    }

    @PutMapping("/{customerId}/status")
    public ResponseEntity<ApiResponse<CustomerResponseDto>> updateCustomerStatus(
            @PathVariable Long customerId,
            @RequestBody CustomerStatusUpdateDto statusUpdateDto) {
        try {
            CustomerResponseDto customer = customerService.updateCustomerStatus(customerId, statusUpdateDto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Customer status updated successfully", customer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/{customerId}/transactions")
    public ResponseEntity<ApiResponse<TransactionResponseDto>> performTransaction(
            @PathVariable Long customerId,
            @Valid @RequestBody TransactionRequestDto transactionDto) {
        try {
            TransactionResponseDto transaction = customerService.performTransaction(customerId, transactionDto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Transaction completed successfully", transaction));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{customerId}/transactions")
    public ResponseEntity<ApiResponse<List<TransactionResponseDto>>> getCustomerTransactions(@PathVariable Long customerId) {
        try {
            List<TransactionResponseDto> transactions = customerService.getCustomerTransactions(customerId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Transactions retrieved successfully", transactions));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{customerId}/balance")
    public ResponseEntity<ApiResponse<BalanceResponseDto>> getCustomerBalance(@PathVariable Long customerId) {
        try {
            BalanceResponseDto balance = customerService.getCustomerBalance(customerId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Balance retrieved successfully", balance));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
