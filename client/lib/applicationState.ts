// Application State Management for KYC Workflow

export interface CustomerApplication {
  id: string;
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    fatherName: string;
    motherName: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    alternatePhone: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
    };
  };
  identityInfo: {
    panNumber: string;
    aadharNumber: string;
    occupation: string;
    monthlyIncome: string;
    employerName?: string;
  };
  accountInfo: {
    accountType: 'savings' | 'current';
    initialDeposit: number;
    nomineeRequired: boolean;
    nomineeName?: string;
    nomineeRelation?: string;
  };
  documents: {
    panCard: string | null;
    aadharCard: string | null;
    photograph: string | null;
    signature: string | null;
  };
  password: string;
  status: 'pending' | 'documents_submitted' | 'kyc_in_progress' | 'kyc_completed' | 'approved' | 'rejected';
  kycStatus: 'pending' | 'in_progress' | 'completed' | 'verified';
  submittedDate: string;
  kycDate?: string;
  approvalDate?: string;
  clerkId?: string;
  managerId?: string;
  clerkNotes?: string;
  managerNotes?: string;
  accountNumber?: string;
  balance: number;
  canPerformOperations: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'clerk' | 'manager' | 'admin';
  applicationId?: string;
}

// Mock database - in real app this would be in backend
class ApplicationStateManager {
  private applications: Map<string, CustomerApplication> = new Map();
  private users: Map<string, User> = new Map();
  private currentUser: User | null = null;

  constructor() {
    this.loadFromStorage();
    // Initialize with some test data if none exists
    if (this.applications.size === 0) {
      this.initializeTestData();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('vaultx_applications');
      if (stored) {
        const data = JSON.parse(stored);
        this.applications = new Map(data.applications || []);
        this.users = new Map(data.users || []);
      }
    } catch (error) {
      console.error('Error loading applications from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = {
        applications: Array.from(this.applications.entries()),
        users: Array.from(this.users.entries())
      };
      localStorage.setItem('vaultx_applications', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving applications to storage:', error);
    }
  }

  private initializeTestData() {
    // Test customer application 1 - Documents submitted, pending KYC
    const testApp1: CustomerApplication = {
      id: 'APP001',
      personalInfo: {
        firstName: 'Abhay',
        middleName: '',
        lastName: 'Chavan',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        maritalStatus: 'single',
        fatherName: 'Father Name',
        motherName: 'Mother Name'
      },
      contactInfo: {
        email: 'abhay@example.com',
        phone: '+91 9876543210',
        alternatePhone: '',
        address: {
          line1: '123 Main St',
          line2: 'Area',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      identityInfo: {
        panNumber: 'ABCDE1234F',
        aadharNumber: '123456789012',
        occupation: 'salaried',
        monthlyIncome: '50000-100000',
        employerName: 'Tech Company'
      },
      accountInfo: {
        accountType: 'savings',
        initialDeposit: 5000,
        nomineeRequired: false
      },
      documents: {
        panCard: 'uploaded',
        aadharCard: 'uploaded',
        photograph: 'uploaded',
        signature: 'uploaded'
      },
      password: 'password123',
      status: 'documents_submitted',
      kycStatus: 'pending',
      submittedDate: '2024-01-15',
      balance: 0,
      canPerformOperations: false
    };

    // Test customer application 2 - KYC completed, ready for manager approval
    const testApp2: CustomerApplication = {
      id: 'APP002',
      personalInfo: {
        firstName: 'Priya',
        middleName: '',
        lastName: 'Sharma',
        dateOfBirth: '1992-05-15',
        gender: 'female',
        maritalStatus: 'single',
        fatherName: 'Father Name 2',
        motherName: 'Mother Name 2'
      },
      contactInfo: {
        email: 'priya@example.com',
        phone: '+91 9876543211',
        alternatePhone: '',
        address: {
          line1: '456 Park Avenue',
          line2: 'Sector 12',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001'
        }
      },
      identityInfo: {
        panNumber: 'FGHIJ5678K',
        aadharNumber: '234567890123',
        occupation: 'business',
        monthlyIncome: '100000-200000',
        employerName: 'Self Employed'
      },
      accountInfo: {
        accountType: 'current',
        initialDeposit: 10000,
        nomineeRequired: true,
        nomineeName: 'Raj Sharma',
        nomineeRelation: 'brother'
      },
      documents: {
        panCard: 'uploaded',
        aadharCard: 'uploaded',
        photograph: 'uploaded',
        signature: 'uploaded'
      },
      password: 'password123',
      status: 'kyc_completed',
      kycStatus: 'completed',
      submittedDate: '2024-01-14',
      kycDate: '2024-01-16',
      clerkId: 'CLK001',
      clerkNotes: `KYC Verification Completed:
- Customer Identity: Verified
- Documents: Verified
- Liveness Check: Passed
- Photos Captured: 3

Additional Notes: Customer was cooperative during video KYC. All documents verified successfully.

Verified by: Clerk CLK001
Date: ${new Date().toLocaleDateString()}`,
      balance: 0,
      canPerformOperations: false
    };

    // Test customer application 3 - Approved and active
    const testApp3: CustomerApplication = {
      id: 'APP003',
      personalInfo: {
        firstName: 'Rahul',
        middleName: 'Kumar',
        lastName: 'Singh',
        dateOfBirth: '1988-12-20',
        gender: 'male',
        maritalStatus: 'married',
        fatherName: 'Father Name 3',
        motherName: 'Mother Name 3'
      },
      contactInfo: {
        email: 'rahul@example.com',
        phone: '+91 9876543212',
        alternatePhone: '+91 9876543213',
        address: {
          line1: '789 MG Road',
          line2: 'Koramangala',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001'
        }
      },
      identityInfo: {
        panNumber: 'KLMNO9012P',
        aadharNumber: '345678901234',
        occupation: 'salaried',
        monthlyIncome: '75000-100000',
        employerName: 'IT Solutions Inc'
      },
      accountInfo: {
        accountType: 'savings',
        initialDeposit: 15000,
        nomineeRequired: true,
        nomineeName: 'Sunita Singh',
        nomineeRelation: 'wife'
      },
      documents: {
        panCard: 'uploaded',
        aadharCard: 'uploaded',
        photograph: 'uploaded',
        signature: 'uploaded'
      },
      password: 'password123',
      status: 'approved',
      kycStatus: 'verified',
      submittedDate: '2024-01-10',
      kycDate: '2024-01-12',
      approvalDate: '2024-01-13',
      clerkId: 'CLK001',
      managerId: 'MNG001',
      clerkNotes: 'KYC completed successfully. All documents verified.',
      managerNotes: 'Application approved. Account created successfully.',
      accountNumber: 'VLTX1234567890',
      balance: 15000,
      canPerformOperations: true
    };

    const testUser1: User = {
      id: 'USER001',
      email: 'abhay@example.com',
      role: 'customer',
      applicationId: 'APP001'
    };

    const testUser2: User = {
      id: 'USER002',
      email: 'priya@example.com',
      role: 'customer',
      applicationId: 'APP002'
    };

    const testUser3: User = {
      id: 'USER003',
      email: 'rahul@example.com',
      role: 'customer',
      applicationId: 'APP003'
    };

    this.applications.set('APP001', testApp1);
    this.applications.set('APP002', testApp2);
    this.applications.set('APP003', testApp3);

    this.users.set('abhay@example.com', testUser1);
    this.users.set('priya@example.com', testUser2);
    this.users.set('rahul@example.com', testUser3);
  }

  // User Authentication
  login(email: string, password: string): User | null {
    const user = this.users.get(email);
    if (user) {
      // In real app, verify password
      this.currentUser = user;
      return user;
    }
    return null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  // Application Management
  createApplication(applicationData: Partial<CustomerApplication>): string {
    const id = 'APP' + Date.now().toString().slice(-6);
    const application: CustomerApplication = {
      id,
      personalInfo: applicationData.personalInfo!,
      contactInfo: applicationData.contactInfo!,
      identityInfo: applicationData.identityInfo!,
      accountInfo: applicationData.accountInfo!,
      documents: applicationData.documents!,
      password: applicationData.password!,
      status: 'documents_submitted',
      kycStatus: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      balance: 0,
      canPerformOperations: false
    };

    this.applications.set(id, application);

    // Create user account
    const user: User = {
      id: 'USER' + Date.now().toString().slice(-6),
      email: applicationData.contactInfo!.email,
      role: 'customer',
      applicationId: id
    };

    this.users.set(applicationData.contactInfo!.email, user);
    this.saveToStorage();

    return id;
  }

  getApplication(id: string): CustomerApplication | null {
    return this.applications.get(id) || null;
  }

  getApplicationByEmail(email: string): CustomerApplication | null {
    const user = this.users.get(email);
    if (user && user.applicationId) {
      return this.applications.get(user.applicationId) || null;
    }
    return null;
  }

  // Clerk Operations
  getPendingApplications(): CustomerApplication[] {
    return Array.from(this.applications.values()).filter(
      app => app.status === 'documents_submitted' || app.kycStatus === 'pending'
    );
  }

  startVideoKYC(applicationId: string, clerkId: string): boolean {
    const app = this.applications.get(applicationId);
    if (app && app.kycStatus === 'pending') {
      app.kycStatus = 'in_progress';
      app.clerkId = clerkId;
      app.status = 'kyc_in_progress';
      return true;
    }
    return false;
  }

  completeKYC(applicationId: string, notes: string): boolean {
    const app = this.applications.get(applicationId);
    if (app && app.kycStatus === 'in_progress') {
      app.kycStatus = 'completed';
      app.status = 'kyc_completed';
      app.clerkNotes = notes;
      app.kycDate = new Date().toISOString().split('T')[0];
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Manager Operations
  getKYCCompletedApplications(): CustomerApplication[] {
    return Array.from(this.applications.values()).filter(
      app => app.status === 'kyc_completed'
    );
  }

  approveApplication(applicationId: string, managerId: string, notes: string): boolean {
    const app = this.applications.get(applicationId);
    if (app && app.status === 'kyc_completed') {
      app.status = 'approved';
      app.managerId = managerId;
      app.managerNotes = notes;
      app.approvalDate = new Date().toISOString().split('T')[0];
      // Generate VaultX branded account number: VLTX + 4 digit year + 8 digit sequence
      const currentYear = new Date().getFullYear();
      const sequence = Date.now().toString().slice(-8);
      app.accountNumber = `VLTX${currentYear}${sequence}`;
      app.balance = app.accountInfo.initialDeposit;
      app.canPerformOperations = true;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  rejectApplication(applicationId: string, managerId: string, reason: string): boolean {
    const app = this.applications.get(applicationId);
    if (app && app.status === 'kyc_completed') {
      app.status = 'rejected';
      app.managerId = managerId;
      app.managerNotes = reason;
      app.canPerformOperations = false;
      return true;
    }
    return false;
  }

  // Customer Operations
  updateBalance(applicationId: string, newBalance: number): boolean {
    const app = this.applications.get(applicationId);
    if (app && app.canPerformOperations) {
      app.balance = newBalance;
      return true;
    }
    return false;
  }

  canPerformOperations(email: string): boolean {
    const app = this.getApplicationByEmail(email);
    return app?.canPerformOperations || false;
  }

  getApplicationStatus(email: string): string {
    const app = this.getApplicationByEmail(email);
    return app?.status || 'not_found';
  }

  // Admin Operations
  getAllApplications(): CustomerApplication[] {
    return Array.from(this.applications.values());
  }

  getApplicationsByStatus(status: string): CustomerApplication[] {
    return Array.from(this.applications.values()).filter(app => app.status === status);
  }

  getSystemStats(): {
    totalApplications: number;
    pendingApplications: number;
    kycCompletedApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalBalance: number;
    activeCustomers: number;
  } {
    const allApps = this.getAllApplications();
    return {
      totalApplications: allApps.length,
      pendingApplications: allApps.filter(app => app.status === 'documents_submitted' || app.kycStatus === 'pending').length,
      kycCompletedApplications: allApps.filter(app => app.status === 'kyc_completed').length,
      approvedApplications: allApps.filter(app => app.status === 'approved').length,
      rejectedApplications: allApps.filter(app => app.status === 'rejected').length,
      totalBalance: allApps.filter(app => app.status === 'approved').reduce((sum, app) => sum + app.balance, 0),
      activeCustomers: allApps.filter(app => app.canPerformOperations).length
    };
  }

  // Audit operations for admin
  getAuditLogs(): Array<{
    id: string;
    timestamp: string;
    user: string;
    action: string;
    details: string;
    status: string;
  }> {
    const logs = [];
    const allApps = this.getAllApplications();

    for (const app of allApps) {
      if (app.submittedDate) {
        logs.push({
          id: `LOG_${app.id}_SUBMIT`,
          timestamp: new Date(app.submittedDate).toLocaleString(),
          user: app.contactInfo.email,
          action: 'Application Submitted',
          details: `Customer ${app.personalInfo.firstName} ${app.personalInfo.lastName} submitted application ${app.id}`,
          status: 'success'
        });
      }

      if (app.kycDate && app.clerkId) {
        logs.push({
          id: `LOG_${app.id}_KYC`,
          timestamp: new Date(app.kycDate).toLocaleString(),
          user: app.clerkId,
          action: 'KYC Completed',
          details: `KYC verification completed for application ${app.id}`,
          status: 'success'
        });
      }

      if (app.approvalDate && app.managerId) {
        logs.push({
          id: `LOG_${app.id}_APPROVE`,
          timestamp: new Date(app.approvalDate).toLocaleString(),
          user: app.managerId,
          action: 'Application Approved',
          details: `Application ${app.id} approved with account number ${app.accountNumber}`,
          status: 'success'
        });
      }
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

// Singleton instance
export const applicationState = new ApplicationStateManager();
