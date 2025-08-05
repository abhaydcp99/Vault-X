package com.vaultx.banking.dto;

import java.math.BigDecimal;

public class BalanceResponseDto {
    private BigDecimal currentBalance;
    private String accountNumber;
    private String accountType;

    public BigDecimal getCurrentBalance() { return currentBalance; }
    public void setCurrentBalance(BigDecimal currentBalance) { this.currentBalance = currentBalance; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }
}
