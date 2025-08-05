package com.vaultx.banking.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class TransactionRequestDto {
    @NotNull(message = "Transaction type is required")
    private String type; // CREDIT, DEBIT, TRANSFER

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank(message = "Description is required")
    private String description;

    private String recipientAccount;

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRecipientAccount() { return recipientAccount; }
    public void setRecipientAccount(String recipientAccount) { this.recipientAccount = recipientAccount; }
}
