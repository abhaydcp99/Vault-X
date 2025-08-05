package com.vaultx.banking.service;

import com.vaultx.banking.dto.*;
import com.vaultx.banking.entity.Customer;
import com.vaultx.banking.entity.Transaction;
import com.vaultx.banking.repository.CustomerRepository;
import com.vaultx.banking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public CustomerResponseDto registerCustomer(CustomerRegistrationDto registrationDto) {
        // Check if email already exists
        if (customerRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Check if phone already exists
        if (customerRepository.existsByPhone(registrationDto.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        Customer customer = new Customer();
        customer.setFirstName(registrationDto.getFirstName());
        customer.setLastName(registrationDto.getLastName());
        customer.setEmail(registrationDto.getEmail());
        customer.setPhone(registrationDto.getPhone());
        customer.setDateOfBirth(registrationDto.getDateOfBirth());
        customer.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        customer.setAccountType(Customer.AccountType.valueOf(registrationDto.getAccountType().toUpperCase()));
        customer.setInitialDeposit(registrationDto.getInitialDeposit());
        customer.setCurrentBalance(registrationDto.getInitialDeposit());
        customer.setPanNumber(registrationDto.getPanNumber());
        customer.setAadharNumber(registrationDto.getAadharNumber());
        customer.setOccupation(registrationDto.getOccupation());
        customer.setMonthlyIncome(registrationDto.getMonthlyIncome());
        customer.setStatus(Customer.CustomerStatus.DOCUMENTS_SUBMITTED);

        Customer savedCustomer = customerRepository.save(customer);
        return convertToResponseDto(savedCustomer);
    }

    public CustomerLoginResponseDto loginCustomer(CustomerLoginDto loginDto) {
        Customer customer = customerRepository.findByEmail(loginDto.getEmailOrPhone())
                .orElseGet(() -> customerRepository.findByPhone(loginDto.getEmailOrPhone())
                        .orElseThrow(() -> new RuntimeException("Customer not found")));

        if (!passwordEncoder.matches(loginDto.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        CustomerLoginResponseDto response = new CustomerLoginResponseDto();
        response.setCustomerId(customer.getId());
        response.setEmail(customer.getEmail());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setStatus(customer.getStatus().name());
        response.setCanPerformOperations(customer.isCanPerformOperations());
        return response;
    }

    public CustomerResponseDto getCustomerById(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return convertToResponseDto(customer);
    }

    public List<CustomerResponseDto> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public CustomerResponseDto updateCustomerStatus(Long customerId, CustomerStatusUpdateDto statusUpdateDto) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setStatus(Customer.CustomerStatus.valueOf(statusUpdateDto.getStatus()));
        customer.setKycCompleted(statusUpdateDto.isKycCompleted());
        customer.setCanPerformOperations(statusUpdateDto.isCanPerformOperations());

        if (statusUpdateDto.getStatus().equals("APPROVED")) {
            customer.setApprovalDate(LocalDate.now());
            customer.setAccountNumber(generateAccountNumber());
        }

        Customer savedCustomer = customerRepository.save(customer);
        return convertToResponseDto(savedCustomer);
    }

    public TransactionResponseDto performTransaction(Long customerId, TransactionRequestDto transactionDto) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (!customer.isCanPerformOperations()) {
            throw new RuntimeException("Customer is not authorized to perform transactions");
        }

        BigDecimal amount = transactionDto.getAmount();
        Transaction.TransactionType type = Transaction.TransactionType.valueOf(transactionDto.getType().toUpperCase());

        // Validate transaction
        if (type == Transaction.TransactionType.DEBIT || type == Transaction.TransactionType.TRANSFER) {
            if (customer.getCurrentBalance().compareTo(amount) < 0) {
                throw new RuntimeException("Insufficient balance");
            }
        }

        // Update balance
        BigDecimal newBalance;
        if (type == Transaction.TransactionType.CREDIT) {
            newBalance = customer.getCurrentBalance().add(amount);
        } else {
            newBalance = customer.getCurrentBalance().subtract(amount);
        }

        customer.setCurrentBalance(newBalance);
        customerRepository.save(customer);

        // Create transaction record
        Transaction transaction = new Transaction();
        transaction.setCustomer(customer);
        transaction.setTransactionType(type);
        transaction.setAmount(amount);
        transaction.setDescription(transactionDto.getDescription());
        transaction.setRecipientAccount(transactionDto.getRecipientAccount());
        transaction.setBalanceAfter(newBalance);
        transaction.setStatus(Transaction.TransactionStatus.COMPLETED);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return convertToTransactionResponseDto(savedTransaction);
    }

    public List<TransactionResponseDto> getCustomerTransactions(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return transactionRepository.findByCustomerOrderByCreatedAtDesc(customer).stream()
                .map(this::convertToTransactionResponseDto)
                .collect(Collectors.toList());
    }

    public BalanceResponseDto getCustomerBalance(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        BalanceResponseDto response = new BalanceResponseDto();
        response.setCurrentBalance(customer.getCurrentBalance());
        response.setAccountNumber(customer.getAccountNumber());
        response.setAccountType(customer.getAccountType().name());
        return response;
    }

    private CustomerResponseDto convertToResponseDto(Customer customer) {
        CustomerResponseDto dto = new CustomerResponseDto();
        dto.setId(customer.getId());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setDateOfBirth(customer.getDateOfBirth());
        dto.setAccountNumber(customer.getAccountNumber());
        dto.setAccountType(customer.getAccountType() != null ? customer.getAccountType().name() : null);
        dto.setCurrentBalance(customer.getCurrentBalance());
        dto.setStatus(customer.getStatus().name());
        dto.setKycCompleted(customer.isKycCompleted());
        dto.setCanPerformOperations(customer.isCanPerformOperations());
        dto.setSubmittedDate(customer.getSubmittedDate());
        dto.setKycDate(customer.getKycDate());
        dto.setApprovalDate(customer.getApprovalDate());
        return dto;
    }

    private TransactionResponseDto convertToTransactionResponseDto(Transaction transaction) {
        TransactionResponseDto dto = new TransactionResponseDto();
        dto.setId(transaction.getId());
        dto.setTransactionType(transaction.getTransactionType().name());
        dto.setAmount(transaction.getAmount());
        dto.setDescription(transaction.getDescription());
        dto.setRecipientAccount(transaction.getRecipientAccount());
        dto.setBalanceAfter(transaction.getBalanceAfter());
        dto.setStatus(transaction.getStatus().name());
        dto.setReferenceNumber(transaction.getReferenceNumber());
        dto.setCreatedAt(transaction.getCreatedAt());
        return dto;
    }

    private String generateAccountNumber() {
        return "VX" + System.currentTimeMillis();
    }
}
