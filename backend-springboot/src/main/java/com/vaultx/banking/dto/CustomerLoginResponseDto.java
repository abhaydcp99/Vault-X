package com.vaultx.banking.dto;

public class CustomerLoginResponseDto {
    private Long customerId;
    private String email;
    private String firstName;
    private String lastName;
    private String status;
    private boolean canPerformOperations;

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isCanPerformOperations() { return canPerformOperations; }
    public void setCanPerformOperations(boolean canPerformOperations) { this.canPerformOperations = canPerformOperations; }
}
