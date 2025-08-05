export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'clerk' | 'manager' | 'admin';
  department: string;
  designation: string;
  joiningDate: string;
  workLocation: string;
  isActive: boolean;
  password: string;
  createdAt: string;
  lastLogin?: string;
}

export interface EmployeeRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  employeeId: string;
  role: 'clerk' | 'manager' | 'admin';
  department: string;
  designation: string;
  joiningDate: string;
  reportingManager: string;
  workLocation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  password: string;
  emergencyContact: string;
  emergencyPhone: string;
  qualifications: string;
  experience: string;
}

class EmployeeStateManager {
  private employees: Map<string, Employee> = new Map();
  private currentEmployee: Employee | null = null;
  private otpStore: Map<string, { otp: string; expiresAt: number; attempts: number }> = new Map();

  constructor() {
    this.loadFromStorage();
    this.initializeDefaultEmployees();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('vaultx_employees');
    if (stored) {
      const data = JSON.parse(stored);
      this.employees = new Map(data.employees || []);
      this.currentEmployee = data.currentEmployee || null;
    }
  }

  private saveToStorage() {
    const data = {
      employees: Array.from(this.employees.entries()),
      currentEmployee: this.currentEmployee
    };
    localStorage.setItem('vaultx_employees', JSON.stringify(data));
  }

  private initializeDefaultEmployees() {
    // Create default employees if they don't exist
    const defaultEmployees = [
      {
        id: 'emp_001',
        employeeId: 'CLK001',
        firstName: 'John',
        lastName: 'Clerk',
        email: 'clerk@vaultx.com',
        phone: '+91-9876543210',
        role: 'clerk' as const,
        department: 'Customer Service',
        designation: 'Senior Clerk',
        joiningDate: '2024-01-15',
        workLocation: 'Mumbai Main Branch',
        isActive: true,
        password: 'clerk123',
        createdAt: new Date().toISOString()
      },
      {
        id: 'emp_002',
        employeeId: 'MNG001',
        firstName: 'Sarah',
        lastName: 'Manager',
        email: 'manager@vaultx.com',
        phone: '+91-9876543211',
        role: 'manager' as const,
        department: 'Operations',
        designation: 'Branch Manager',
        joiningDate: '2023-06-01',
        workLocation: 'Mumbai Main Branch',
        isActive: true,
        password: 'manager123',
        createdAt: new Date().toISOString()
      },
      {
        id: 'emp_003',
        employeeId: 'ADM001',
        firstName: 'Michael',
        lastName: 'Admin',
        email: 'admin@vaultx.com',
        phone: '+91-9876543212',
        role: 'admin' as const,
        department: 'Administration',
        designation: 'System Administrator',
        joiningDate: '2023-01-01',
        workLocation: 'Mumbai Head Office',
        isActive: true,
        password: 'admin123',
        createdAt: new Date().toISOString()
      }
    ];

    defaultEmployees.forEach(emp => {
      if (!this.employees.has(emp.employeeId)) {
        this.employees.set(emp.employeeId, emp);
      }
    });

    this.saveToStorage();
  }

  registerEmployee(data: EmployeeRegistrationData): { success: boolean; message: string; employee?: Employee } {
    // Check if employee ID already exists
    if (this.employees.has(data.employeeId)) {
      return { success: false, message: 'Employee ID already exists' };
    }

    // Check if email already exists
    const existingEmail = Array.from(this.employees.values()).find(emp => emp.email === data.email);
    if (existingEmail) {
      return { success: false, message: 'Email already registered' };
    }

    const newEmployee: Employee = {
      id: `emp_${Date.now()}`,
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      department: data.department,
      designation: data.designation,
      joiningDate: data.joiningDate,
      workLocation: data.workLocation,
      isActive: true,
      password: data.password,
      createdAt: new Date().toISOString()
    };

    this.employees.set(data.employeeId, newEmployee);
    this.saveToStorage();

    return { 
      success: true, 
      message: 'Employee registered successfully', 
      employee: newEmployee 
    };
  }

  generateOTP(employeeId: string): { success: boolean; message: string; otp?: string } {
    const employee = this.employees.get(employeeId);
    if (!employee) {
      return { success: false, message: 'Employee not found' };
    }

    if (!employee.isActive) {
      return { success: false, message: 'Employee account is deactivated' };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

    this.otpStore.set(employeeId, {
      otp,
      expiresAt,
      attempts: 0
    });

    // For development purposes, we'll return the OTP
    // In production, this would be sent via SMS/Email
    console.log(`OTP for ${employeeId}: ${otp}`);
    
    return { 
      success: true, 
      message: 'OTP sent successfully', 
      otp // Remove this in production
    };
  }

  verifyLogin(employeeId: string, password: string, otp: string): { success: boolean; message: string; employee?: Employee; redirectTo?: string } {
    const employee = this.employees.get(employeeId);
    if (!employee) {
      return { success: false, message: 'Invalid employee ID' };
    }

    if (!employee.isActive) {
      return { success: false, message: 'Employee account is deactivated' };
    }

    if (employee.password !== password) {
      return { success: false, message: 'Invalid password' };
    }

    // Verify OTP
    const otpData = this.otpStore.get(employeeId);
    if (!otpData) {
      return { success: false, message: 'OTP not found or expired' };
    }

    if (Date.now() > otpData.expiresAt) {
      this.otpStore.delete(employeeId);
      return { success: false, message: 'OTP has expired' };
    }

    if (otpData.attempts >= 3) {
      this.otpStore.delete(employeeId);
      return { success: false, message: 'Maximum OTP attempts exceeded' };
    }

    if (otpData.otp !== otp) {
      otpData.attempts++;
      return { success: false, message: 'Invalid OTP' };
    }

    // Successful login
    this.otpStore.delete(employeeId);
    this.currentEmployee = employee;
    employee.lastLogin = new Date().toISOString();
    this.saveToStorage();

    // Determine redirect based on role
    let redirectTo = '/';
    switch (employee.role) {
      case 'clerk':
        redirectTo = '/clerk/dashboard';
        break;
      case 'manager':
        redirectTo = '/manager/dashboard';
        break;
      case 'admin':
        redirectTo = '/admin/dashboard';
        break;
    }

    return { 
      success: true, 
      message: 'Login successful', 
      employee,
      redirectTo
    };
  }

  getCurrentEmployee(): Employee | null {
    return this.currentEmployee;
  }

  logout(): void {
    this.currentEmployee = null;
    this.saveToStorage();
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  getEmployeeById(employeeId: string): Employee | null {
    return this.employees.get(employeeId) || null;
  }

  updateEmployee(employeeId: string, updates: Partial<Employee>): { success: boolean; message: string } {
    const employee = this.employees.get(employeeId);
    if (!employee) {
      return { success: false, message: 'Employee not found' };
    }

    Object.assign(employee, updates);
    this.saveToStorage();
    
    return { success: true, message: 'Employee updated successfully' };
  }

  deactivateEmployee(employeeId: string): { success: boolean; message: string } {
    const employee = this.employees.get(employeeId);
    if (!employee) {
      return { success: false, message: 'Employee not found' };
    }

    employee.isActive = false;
    this.saveToStorage();
    
    return { success: true, message: 'Employee deactivated successfully' };
  }

  // Check if user has permission for a specific role
  hasRole(requiredRole: 'clerk' | 'manager' | 'admin'): boolean {
    if (!this.currentEmployee) return false;
    
    const roleHierarchy = { 'clerk': 1, 'manager': 2, 'admin': 3 };
    const currentLevel = roleHierarchy[this.currentEmployee.role];
    const requiredLevel = roleHierarchy[requiredRole];
    
    return currentLevel >= requiredLevel;
  }

  // Development helper - get credentials for testing
  getTestCredentials(): { employeeId: string; password: string; role: string }[] {
    return Array.from(this.employees.values()).map(emp => ({
      employeeId: emp.employeeId,
      password: emp.password,
      role: emp.role
    }));
  }
}

export const employeeState = new EmployeeStateManager();
