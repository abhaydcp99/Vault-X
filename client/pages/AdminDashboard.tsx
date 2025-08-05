import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationState } from '@/lib/applicationState';
import { employeeState, Employee } from '@/lib/employeeState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Shield,
  Users,
  Settings,
  BarChart3,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Clock,
  Key,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  Filter,
  Search,
  Crown,
  UserCheck,
  TrendingUp,
  CreditCard,
  Building,
  FileText,
  RefreshCw,
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState<any>({});
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editEmployeeDialog, setEditEmployeeDialog] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    employeeId: '',
    role: '',
    department: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    sessionTimeout: 5, // minutes
    otpExpiry: 2, // minutes
    maxLoginAttempts: 3,
    passwordExpiry: 90, // days
    enableTwoFactor: true
  });

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = () => {
    setRefreshing(true);
    setTimeout(() => {
      const allApps = applicationState.getAllApplications();
      const stats = applicationState.getSystemStats();
      const logs = applicationState.getAuditLogs();
      const allEmployees = employeeState.getAllEmployees();

      setApplications(allApps);
      setSystemStats(stats);
      setAuditLogs(logs);
      setEmployees(allEmployees);
      setRefreshing(false);
    }, 500);
  };

  // Employees loaded from state in useEffect



  const addEmployee = () => {
    if (!newUser.name || !newUser.email || !newUser.employeeId || !newUser.role || !newUser.department) {
      alert('Please fill all required fields');
      return;
    }

    const employeeData = {
      firstName: newUser.name.split(' ')[0],
      lastName: newUser.name.split(' ').slice(1).join(' ') || '',
      email: newUser.email,
      phone: '+91-9876543200',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      employeeId: newUser.employeeId,
      role: newUser.role as 'clerk' | 'manager' | 'admin',
      department: newUser.department,
      designation: newUser.role === 'admin' ? 'Administrator' : newUser.role === 'manager' ? 'Manager' : 'Clerk',
      joiningDate: new Date().toISOString().split('T')[0],
      reportingManager: 'ADM001',
      workLocation: 'Mumbai Main Branch',
      address: 'Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      password: 'temp123',
      emergencyContact: 'Emergency Contact',
      emergencyPhone: '+91-9876543299',
      qualifications: 'Graduate',
      experience: '2 years'
    };

    const result = employeeState.registerEmployee(employeeData);

    if (result.success) {
      alert(`Employee added successfully!\n\nLogin Credentials:\nEmployee ID: ${newUser.employeeId}\nPassword: temp123\n\nPlease share these credentials with the employee.`);
      setAddUserDialog(false);
      setNewUser({ name: '', email: '', employeeId: '', role: '', department: '' });
      loadSystemData(); // Refresh the employee list
    } else {
      alert(`Failed to add employee: ${result.message}`);
    }
  };

  const editEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditEmployeeDialog(true);
  };

  const updateEmployee = () => {
    if (!editingEmployee) return;

    const result = employeeState.updateEmployee(editingEmployee.employeeId, editingEmployee);

    if (result.success) {
      alert('Employee updated successfully!');
      setEditEmployeeDialog(false);
      setEditingEmployee(null);
      loadSystemData();
    } else {
      alert(`Failed to update employee: ${result.message}`);
    }
  };

  const resetPassword = (employeeId: string) => {
    const newPassword = 'temp123';
    const result = employeeState.updateEmployee(employeeId, { password: newPassword });

    if (result.success) {
      alert(`Password reset successfully!\n\nNew Password: ${newPassword}\nPlease share this with the employee.`);
    } else {
      alert(`Failed to reset password: ${result.message}`);
    }
  };

  const deleteEmployee = (employeeId: string) => {
    if (window.confirm('Are you sure you want to deactivate this employee?')) {
      const result = employeeState.deactivateEmployee(employeeId);

      if (result.success) {
        alert('Employee deactivated successfully!');
        loadSystemData();
      } else {
        alert(`Failed to deactivate employee: ${result.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VaultX Admin Portal</span>
              <Badge className="bg-red-500 text-white">Super Admin System Admin</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600"
                onClick={() => navigate('/')}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Applications</p>
                  <h2 className="text-3xl font-bold">{systemStats.totalApplications || 0}</h2>
                  <p className="text-blue-100 text-sm">Customer applications</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Customers</p>
                  <h2 className="text-3xl font-bold">{systemStats.activeCustomers || 0}</h2>
                  <p className="text-green-100 text-sm">With banking operations</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Balance</p>
                  <h2 className="text-3xl font-bold">₹{(systemStats.totalBalance || 0).toLocaleString()}</h2>
                  <p className="text-purple-100 text-sm">Across all accounts</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Pending KYC</p>
                  <h2 className="text-3xl font-bold">{systemStats.pendingApplications || 0}</h2>
                  <p className="text-red-100 text-sm">Awaiting verification</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="customers">Customer Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="audit">Security & Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <Badge className="bg-green-100 text-green-800">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security</span>
                    <Badge className="bg-blue-100 text-blue-800">Secure</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">New customer registered</p>
                        <p className="text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">KYC approved</p>
                        <p className="text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Large transaction alert</p>
                        <p className="text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Employee Management</CardTitle>
                  <Dialog open={addUserDialog} onOpenChange={setAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Employee
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                        <DialogDescription>Create a new employee account</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input 
                              value={newUser.name}
                              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter full name"
                            />
                          </div>
                          <div>
                            <Label>Employee ID</Label>
                            <Input 
                              value={newUser.employeeId}
                              onChange={(e) => setNewUser(prev => ({ ...prev, employeeId: e.target.value }))}
                              placeholder="Enter employee ID"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Email Address</Label>
                          <Input 
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter email address"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Role</Label>
                            <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clerk">Clerk</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Department</Label>
                            <Select value={newUser.department} onValueChange={(value) => setNewUser(prev => ({ ...prev, department: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kyc">KYC</SelectItem>
                                <SelectItem value="operations">Operations</SelectItem>
                                <SelectItem value="admin">Administration</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setAddUserDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addEmployee}>Add Employee</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Employee Dialog */}
                  <Dialog open={editEmployeeDialog} onOpenChange={setEditEmployeeDialog}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <DialogDescription>Update employee information</DialogDescription>
                      </DialogHeader>
                      {editingEmployee && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>First Name</Label>
                              <Input
                                value={editingEmployee.firstName}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, firstName: e.target.value} : null)}
                              />
                            </div>
                            <div>
                              <Label>Last Name</Label>
                              <Input
                                value={editingEmployee.lastName}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, lastName: e.target.value} : null)}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Email</Label>
                              <Input
                                type="email"
                                value={editingEmployee.email}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, email: e.target.value} : null)}
                              />
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <Input
                                value={editingEmployee.phone}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, phone: e.target.value} : null)}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Department</Label>
                              <Input
                                value={editingEmployee.department}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, department: e.target.value} : null)}
                              />
                            </div>
                            <div>
                              <Label>Designation</Label>
                              <Input
                                value={editingEmployee.designation}
                                onChange={(e) => setEditingEmployee(prev => prev ? {...prev, designation: e.target.value} : null)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Work Location</Label>
                            <Input
                              value={editingEmployee.workLocation}
                              onChange={(e) => setEditingEmployee(prev => prev ? {...prev, workLocation: e.target.value} : null)}
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setEditEmployeeDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={updateEmployee}>
                              Update Employee
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.employeeId} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {employee.role === 'admin' ? <Crown className="w-6 h-6 text-blue-600" /> :
                             employee.role === 'manager' ? <UserCheck className="w-6 h-6 text-blue-600" /> :
                             <Users className="w-6 h-6 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{employee.firstName} {employee.lastName}</h3>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                            <p className="text-xs text-gray-500">{employee.designation}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex space-x-2">
                            <Badge variant={employee.role === 'admin' ? 'destructive' : employee.role === 'manager' ? 'default' : 'secondary'}>
                              {employee.role.toUpperCase()}
                            </Badge>
                            <Badge variant={employee.isActive ? 'default' : 'destructive'}>
                              {employee.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </Badge>
                          </div>
                          {employee.lastLogin && (
                            <p className="text-xs text-gray-500">Last: {new Date(employee.lastLogin).toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600 font-medium">Employee ID</Label>
                          <p className="font-mono text-blue-600">{employee.employeeId}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 font-medium">Department</Label>
                          <p>{employee.department}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 font-medium">Work Location</Label>
                          <p>{employee.workLocation}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 font-medium">Joining Date</Label>
                          <p>{employee.joiningDate}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span> {employee.phone}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editEmployee(employee)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resetPassword(employee.employeeId)}
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Reset Password
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteEmployee(employee.employeeId)}
                            disabled={!employee.isActive}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {employee.isActive ? 'Deactivate' : 'Deactivated'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Management Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Total Customers</p>
                      <p className="text-2xl font-bold text-blue-600">{systemStats.totalApplications || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-800 font-medium">Active Accounts</p>
                      <p className="text-2xl font-bold text-green-600">{systemStats.approvedApplications || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">Pending KYC</p>
                      <p className="text-2xl font-bold text-yellow-600">{systemStats.pendingApplications || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-800 font-medium">Total Deposits</p>
                      <p className="text-xl font-bold text-purple-600">₹{((systemStats.totalBalance || 0) / 10000000).toFixed(1)}Cr</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Advanced Customer Management</CardTitle>
                    <CardDescription>Comprehensive customer oversight and management tools</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" onClick={loadSystemData} disabled={refreshing}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Applications Found</h3>
                    <p className="text-gray-600">No customer applications in the system</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">{systemStats.totalApplications}</p>
                        <p className="text-sm text-blue-800">Total Applications</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">{systemStats.pendingApplications}</p>
                        <p className="text-sm text-orange-800">Pending Review</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-yellow-600">{systemStats.kycCompletedApplications}</p>
                        <p className="text-sm text-yellow-800">Ready for Approval</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">{systemStats.approvedApplications}</p>
                        <p className="text-sm text-green-800">Approved & Active</p>
                      </div>
                    </div>

                    {applications.map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={localStorage.getItem(`customer_photo_${app.id}`) || `https://images.unsplash.com/photo-${['1494790108755-2616b332d1bb', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80'][app.id.charCodeAt(app.id.length - 1) % 3]}?w=60&h=60&fit=crop&crop=face`}
                                alt="Customer"
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://ui-avatars.com/api/?name=${app.personalInfo?.firstName || 'User'}+${app.personalInfo?.lastName || ''}&size=60&background=random`;
                                }}
                              />
                              {app.canPerformOperations && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {app.personalInfo?.firstName || 'N/A'} {app.personalInfo?.lastName || ''}
                              </h3>
                              <p className="text-sm text-gray-600">{app.contactInfo?.email || 'No email'}</p>
                              <p className="text-xs text-gray-500">ID: {app.id} • {app.accountNumber || 'No Account'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                              <Badge
                                className={
                                  app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  app.status === 'kyc_completed' ? 'bg-yellow-100 text-yellow-800' :
                                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-orange-100 text-orange-800'
                                }
                              >
                                {app.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              {app.canPerformOperations && (
                                <Badge className="bg-blue-100 text-blue-800">ACTIVE</Badge>
                              )}
                            </div>
                            {app.status === 'approved' && (
                              <div className="text-right">
                                <p className="text-lg font-bold text-green-600">₹{(app.balance || 0).toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Current Balance</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4 text-sm mb-4">
                          <div>
                            <Label className="text-xs text-gray-600 font-medium">Personal Info</Label>
                            <p className="font-medium">{app.personalInfo?.firstName || 'N/A'} {app.personalInfo?.lastName || ''}</p>
                            <p className="text-gray-600">{app.contactInfo?.phone || 'No phone'}</p>
                            <p className="text-gray-600">{app.personalInfo?.dateOfBirth || 'No DOB'}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium">Account Details</Label>
                            <p className="capitalize font-medium">{app.accountInfo?.accountType || 'N/A'} Account</p>
                            <p className="text-gray-600">Initial: ₹{(app.accountInfo?.initialDeposit || 0).toLocaleString()}</p>
                            {app.accountNumber && <p className="text-blue-600 font-mono text-xs">{app.accountNumber}</p>}
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium">Identity</Label>
                            <p className="text-gray-600">PAN: {app.identityInfo?.panNumber || 'N/A'}</p>
                            <p className="text-gray-600">Aadhaar: {app.identityInfo?.aadharNumber ? `${app.identityInfo.aadharNumber.slice(0, 4)}****${app.identityInfo.aadharNumber.slice(-4)}` : 'N/A'}</p>
                            <p className="text-gray-600 capitalize">{app.identityInfo?.occupation || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium">Timeline</Label>
                            <p className="text-gray-600">Applied: {app.submittedDate || 'N/A'}</p>
                            {app.kycDate && <p className="text-gray-600">KYC: {app.kycDate}</p>}
                            {app.approvalDate && <p className="text-green-600">Approved: {app.approvalDate}</p>}
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium">Risk Profile</Label>
                            <p className="text-green-600 font-medium">Low Risk</p>
                            <p className="text-gray-600">Monthly Income: {app.identityInfo?.monthlyIncome || 'N/A'}</p>
                            <p className="text-gray-600">Score: 850/900</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Full Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Documents
                            </Button>
                            {app.status === 'approved' && (
                              <Button variant="outline" size="sm">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Transactions
                              </Button>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            {app.status === 'approved' && (
                              <>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                      <CreditCard className="w-4 h-4 mr-2" />
                                      Manage Account
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Account Management</DialogTitle>
                                      <DialogDescription>
                                        Manage account for {app.personalInfo?.firstName} {app.personalInfo?.lastName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                          <Label>Account Status</Label>
                                          <select className="w-full p-2 border rounded" defaultValue="active">
                                            <option value="active">Active</option>
                                            <option value="suspended">Suspended</option>
                                            <option value="closed">Closed</option>
                                          </select>
                                        </div>
                                        <div>
                                          <Label>Daily Limit</Label>
                                          <Input type="number" defaultValue="100000" placeholder="Enter daily limit" />
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Admin Notes</Label>
                                        <Textarea placeholder="Add administrative notes..." rows={3} />
                                      </div>
                                      <div className="flex justify-end space-x-2">
                                        <Button variant="outline">Cancel</Button>
                                        <Button onClick={() => alert('Account settings updated!')}>Update Settings</Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Settings className="w-4 h-4 mr-2" />
                                      Restrictions
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Account Restrictions</DialogTitle>
                                      <DialogDescription>
                                        Set transaction and access restrictions
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="block-transfers" />
                                        <Label htmlFor="block-transfers">Block fund transfers</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="block-withdrawals" />
                                        <Label htmlFor="block-withdrawals">Block cash withdrawals</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="require-approval" />
                                        <Label htmlFor="require-approval">Require approval for large transactions</Label>
                                      </div>
                                      <div>
                                        <Label>Restriction Reason</Label>
                                        <Textarea placeholder="Enter reason for restrictions..." />
                                      </div>
                                      <div className="flex justify-end space-x-2">
                                        <Button variant="outline">Cancel</Button>
                                        <Button onClick={() => alert('Restrictions applied!')}>Apply Restrictions</Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </>
                            )}
                            {app.status !== 'approved' && app.status !== 'rejected' && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  if (window.confirm(`Fast track approval for ${app.personalInfo?.firstName} ${app.personalInfo?.lastName}?`)) {
                                    alert('Application fast-tracked for approval!');
                                  }
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Fast Track
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure system-wide settings and security parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Session & Security</h3>
                    
                    <div>
                      <Label>Session Timeout (minutes)</Label>
                      <Input 
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div>
                      <Label>OTP Expiry (minutes)</Label>
                      <Input 
                        type="number"
                        value={systemSettings.otpExpiry}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, otpExpiry: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div>
                      <Label>Max Login Attempts</Label>
                      <Input 
                        type="number"
                        value={systemSettings.maxLoginAttempts}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Password Policy</h3>
                    
                    <div>
                      <Label>Password Expiry (days)</Label>
                      <Input 
                        type="number"
                        value={systemSettings.passwordExpiry}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="twoFactor"
                        checked={systemSettings.enableTwoFactor}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, enableTwoFactor: e.target.checked }))}
                      />
                      <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Update Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>System activity and security logs</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {auditLogs.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Audit Logs</h3>
                    <p className="text-gray-600">System activity logs will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className={`w-4 h-4 ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                            <span className="font-semibold text-sm">{log.action}</span>
                          </div>
                          <span className="text-xs text-gray-600">{log.timestamp}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">{log.details}</p>

                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>User: {log.user}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
