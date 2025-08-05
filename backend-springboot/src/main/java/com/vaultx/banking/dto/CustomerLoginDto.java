package com.vaultx.banking.dto;

import jakarta.validation.constraints.NotBlank;

public class CustomerLoginDto {
    @NotBlank(message = "Email or phone is required")
    private String emailOrPhone;

    @NotBlank(message = "Password is required")
    private String password;

    public String getEmailOrPhone() { return emailOrPhone; }
    public void setEmailOrPhone(String emailOrPhone) { this.emailOrPhone = emailOrPhone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
