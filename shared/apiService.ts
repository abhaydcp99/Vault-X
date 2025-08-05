/**
 * Unified API Service for VaultX Banking System
 * Works with both Spring Boot and .NET Core backends
 */

import { getActiveBackend } from './backends';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CustomerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  password: string;
  accountType: string;
  initialDeposit: number;
  panNumber?: string;
  aadharNumber?: string;
  occupation?: string;
  monthlyIncome?: string;
}

export interface CustomerLoginData {
  emailOrPhone: string;
  password: string;
}

export interface TransactionData {
  type: string; // CREDIT, DEBIT, TRANSFER
  amount: number;
  description: string;
  recipientAccount?: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  accountNumber?: string;
  accountType: string;
  currentBalance: number;
  status: string;
  kycCompleted: boolean;
  canPerformOperations: boolean;
  submittedDate: string;
  kycDate?: string;
  approvalDate?: string;
}

export interface Transaction {
  id: number;
  transactionType: string;
  amount: number;
  description: string;
  recipientAccount?: string;
  balanceAfter: number;
  status: string;
  referenceNumber: string;
  createdAt: string;
}

class ApiService {
  private getBaseUrl(): string {
    return getActiveBackend().baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check endpoints
  async ping(): Promise<ApiResponse<any>> {
    return this.makeRequest('/ping');
  }

  async demo(): Promise<ApiResponse<any>> {
    return this.makeRequest('/demo');
  }

  // Customer endpoints
  async registerCustomer(data: CustomerRegistrationData): Promise<ApiResponse<Customer>> {
    return this.makeRequest('/customers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async loginCustomer(data: CustomerLoginData): Promise<ApiResponse<any>> {
    return this.makeRequest('/customers/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCustomer(customerId: number): Promise<ApiResponse<Customer>> {
    return this.makeRequest(`/customers/${customerId}`);
  }

  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    return this.makeRequest('/customers');
  }

  async updateCustomerStatus(
    customerId: number,
    statusData: { status: string; kycCompleted: boolean; canPerformOperations: boolean; notes?: string }
  ): Promise<ApiResponse<Customer>> {
    return this.makeRequest(`/customers/${customerId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  // Transaction endpoints
  async performTransaction(customerId: number, data: TransactionData): Promise<ApiResponse<Transaction>> {
    return this.makeRequest(`/customers/${customerId}/transactions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCustomerTransactions(customerId: number): Promise<ApiResponse<Transaction[]>> {
    return this.makeRequest(`/customers/${customerId}/transactions`);
  }

  async getCustomerBalance(customerId: number): Promise<ApiResponse<{ currentBalance: number; accountNumber?: string; accountType: string }>> {
    return this.makeRequest(`/customers/${customerId}/balance`);
  }

  // Helper method to transfer money between accounts
  async transferMoney(fromCustomerId: number, toAccountNumber: string, amount: number, description: string): Promise<ApiResponse<Transaction>> {
    return this.performTransaction(fromCustomerId, {
      type: 'TRANSFER',
      amount,
      description,
      recipientAccount: toAccountNumber
    });
  }

  // Helper method to add money to account
  async addMoney(customerId: number, amount: number, description: string = 'Money Added to Account'): Promise<ApiResponse<Transaction>> {
    return this.performTransaction(customerId, {
      type: 'CREDIT',
      amount,
      description
    });
  }

  // Helper method to withdraw money from account
  async withdrawMoney(customerId: number, amount: number, description: string = 'Cash Withdrawal'): Promise<ApiResponse<Transaction>> {
    return this.performTransaction(customerId, {
      type: 'DEBIT',
      amount,
      description
    });
  }
}

export const apiService = new ApiService();
export default apiService;
