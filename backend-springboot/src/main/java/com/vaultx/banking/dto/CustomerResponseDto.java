package com.vaultx.banking.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CustomerResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String accountNumber;
    private String accountType;
    private BigDecimal currentBalance;
    private String status;
    private boolean kycCompleted;
    private boolean canPerformOperations;
    private LocalDate submittedDate;
    private LocalDate kycDate;
    private LocalDate approvalDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public BigDecimal getCurrentBalance() { return currentBalance; }
    public void setCurrentBalance(BigDecimal currentBalance) { this.currentBalance = currentBalance; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isKycCompleted() { return kycCompleted; }
    public void setKycCompleted(boolean kycCompleted) { this.kycCompleted = kycCompleted; }

    public boolean isCanPerformOperations() { return canPerformOperations; }
    public void setCanPerformOperations(boolean canPerformOperations) { this.canPerformOperations = canPerformOperations; }

    public LocalDate getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDate submittedDate) { this.submittedDate = submittedDate; }

    public LocalDate getKycDate() { return kycDate; }
    public void setKycDate(LocalDate kycDate) { this.kycDate = kycDate; }

    public LocalDate getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDate approvalDate) { this.approvalDate = approvalDate; }
}
