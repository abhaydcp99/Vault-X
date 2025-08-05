package com.vaultx.banking.dto;

public class CustomerStatusUpdateDto {
    private String status;
    private boolean kycCompleted;
    private boolean canPerformOperations;
    private String notes;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isKycCompleted() { return kycCompleted; }
    public void setKycCompleted(boolean kycCompleted) { this.kycCompleted = kycCompleted; }

    public boolean isCanPerformOperations() { return canPerformOperations; }
    public void setCanPerformOperations(boolean canPerformOperations) { this.canPerformOperations = canPerformOperations; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
