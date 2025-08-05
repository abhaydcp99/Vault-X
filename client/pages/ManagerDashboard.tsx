import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { applicationState } from '@/lib/applicationState';
import { employeeState } from '@/lib/employeeState';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar, 
  FileText, 
  Eye,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  Send,
  Filter,
  Search,
  Building,
  UserCheck,
  RefreshCw,
  Building2,
  Settings,
  Download,
  BarChart3
} from 'lucide-react';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [currentEmployee, setCurrentEmployee] = useState(employeeState.getCurrentEmployee());
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [accountActions, setAccountActions] = useState<{[key: string]: any}>({});
  const [transactionLimits, setTransactionLimits] = useState<{[key: string]: number}>({});
  const [realTimeStats, setRealTimeStats] = useState({
    totalBalance: 0,
    todayTransactions: 0,
    activeUsers: 0,
    alertsCount: 0
  });
  const [transactionMonitor, setTransactionMonitor] = useState<any[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<any[]>([]);
  
  const [approvalData, setApprovalData] = useState({
    accountNumber: '',
    accountType: 'savings',
    welcomeEmail: true,
    notes: ''
  });
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Check if user is logged in and is a manager
    const employee = employeeState.getCurrentEmployee();
    if (!employee) {
      navigate('/employee/login');
      return;
    }
    if (employee.role !== 'manager') {
      navigate('/');
      return;
    }
    setCurrentEmployee(employee);

    // Load saved data from localStorage
    const savedAccountActions = localStorage.getItem('vaultx_account_actions');
    const savedTransactionLimits = localStorage.getItem('vaultx_transaction_limits');

    if (savedAccountActions) {
      setAccountActions(JSON.parse(savedAccountActions));
    }
    if (savedTransactionLimits) {
      setTransactionLimits(JSON.parse(savedTransactionLimits));
    }

    loadKYCCompletedApplications();
    loadRealTimeStats();
    loadTransactionMonitor();
    loadStaffPerformance();

    // Set up real-time updates - more frequent for better UX
    const interval = setInterval(() => {
      loadRealTimeStats();
      loadTransactionMonitor();
      loadStaffPerformance();
      loadKYCCompletedApplications(); // Refresh applications too
    }, 5000); // Update every 5 seconds for real-time feel

    return () => clearInterval(interval);
  }, [navigate]);

  const loadKYCCompletedApplications = () => {
    setRefreshing(true);
    setTimeout(() => {
      const completedApps = applicationState.getKYCCompletedApplications();
      setApplications(completedApps);
      setRefreshing(false);
    }, 500);
  };

  const loadRealTimeStats = () => {
    // Simulate real-time banking statistics
    const approvedApps = applications.filter(app => app.status === 'approved');
    const totalBalance = approvedApps.reduce((sum, app) => sum + (app.balance || app.accountInfo?.initialDeposit || 0), 0);

    setRealTimeStats({
      totalBalance: totalBalance + Math.floor(Math.random() * 1000000), // Simulated additional balances
      todayTransactions: Math.floor(Math.random() * 150) + 50,
      activeUsers: approvedApps.length + Math.floor(Math.random() * 20),
      alertsCount: Math.floor(Math.random() * 5)
    });
  };

  const loadTransactionMonitor = () => {
    // Simulate real-time transaction monitoring
    const transactions = [
      {
        id: 'TXN001',
        from: 'VLTX20241234567',
        to: 'VLTX20241234568',
        amount: 15000,
        type: 'transfer',
        status: 'completed',
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        risk: 'low'
      },
      {
        id: 'TXN002',
        from: 'VLTX20241234569',
        to: 'External Bank',
        amount: 75000,
        type: 'withdrawal',
        status: 'pending',
        timestamp: new Date(Date.now() - Math.random() * 1800000).toISOString(),
        risk: 'medium'
      },
      {
        id: 'TXN003',
        from: 'External Bank',
        to: 'VLTX20241234570',
        amount: 250000,
        type: 'deposit',
        status: 'flagged',
        timestamp: new Date(Date.now() - Math.random() * 900000).toISOString(),
        risk: 'high'
      },
      {
        id: 'TXN004',
        from: 'VLTX20241234571',
        to: 'VLTX20241234572',
        amount: 5500,
        type: 'transfer',
        status: 'completed',
        timestamp: new Date(Date.now() - Math.random() * 600000).toISOString(),
        risk: 'low'
      },
      {
        id: 'TXN005',
        from: 'VLTX20241234573',
        to: 'Merchant Payment',
        amount: 12000,
        type: 'payment',
        status: 'completed',
        timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(),
        risk: 'low'
      }
    ];

    setTransactionMonitor(transactions);
  };

  const loadStaffPerformance = () => {
    // Get all employees and their performance metrics
    const allEmployees = employeeState.getAllEmployees();
    const clerks = allEmployees.filter(emp => emp.role === 'clerk');

    const performance = clerks.map(clerk => ({
      ...clerk,
      applicationsProcessed: Math.floor(Math.random() * 20) + 5,
      kycCompleted: Math.floor(Math.random() * 15) + 2,
      averageTime: Math.floor(Math.random() * 30) + 10, // minutes
      customerRating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      efficiency: Math.floor(Math.random() * 30) + 70, // 70-100%
      lastActive: new Date(Date.now() - Math.random() * 86400000).toISOString()
    }));

    setStaffPerformance(performance);
  };

  const approveApplication = () => {
    if (!selectedApplication) return;

    // Generate VaultX branded account number and IFSC
    const currentYear = new Date().getFullYear();
    const sequence = Date.now().toString().slice(-8);
    const accountNumber = `VLTX${currentYear}${sequence}`;
    const ifscCode = `VLTX0${sequence.slice(-6)}`;

    const notes = `Application Approved:
Account Number: ${accountNumber}
Account Type: ${selectedApplication.accountInfo.accountType}
Branch: VaultX Main Branch
IFSC: ${ifscCode}

Manager Notes: ${approvalData.notes}

Approved by: Manager ${currentEmployee?.employeeId || 'MNG001'}
Date: ${new Date().toLocaleDateString()}`;

    const success = applicationState.approveApplication(selectedApplication.id, currentEmployee?.employeeId || 'MNG001', notes);
    
    if (success) {
      // Simulate sending welcome email
      alert(`Application approved successfully! 
      
Welcome email sent to ${selectedApplication.contactInfo.email} with:
- Account Number: ${accountNumber}
- Account Type: ${selectedApplication.accountInfo.accountType}
- Branch: VaultX Main Branch
- IFSC Code: ${ifscCode}

Customer can now login and perform all banking operations.`);
      
      setApprovalDialog(false);
      setSelectedApplication(null);
      setApprovalData({ accountNumber: '', accountType: 'savings', welcomeEmail: true, notes: '' });
      loadKYCCompletedApplications();
    } else {
      alert('Failed to approve application. Please try again.');
    }
  };

  const rejectApplication = () => {
    if (!selectedApplication) return;

    const success = applicationState.rejectApplication(selectedApplication.id, currentEmployee?.employeeId || 'MNG001', rejectionReason);
    
    if (success) {
      alert(`Application rejected. Customer will be notified via email.`);
      setRejectionDialog(false);
      setSelectedApplication(null);
      setRejectionReason('');
      loadKYCCompletedApplications();
    } else {
      alert('Failed to reject application. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'kyc_completed':
        return <Badge className="bg-orange-100 text-orange-800">Ready for Approval</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
    }}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">₹</span>
              </div>
              <span className="text-xl font-bold text-white">VaultX Manager Portal</span>
              <span className="text-white/80 text-sm">Welcome, {currentEmployee?.firstName} {currentEmployee?.lastName}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={loadKYCCompletedApplications}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={() => {
                  employeeState.logout();
                  navigate('/');
                }}
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
          <Card className="bg-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending Review</p>
                  <h2 className="text-3xl font-bold">{applications.filter(app => app.status === 'kyc_completed').length}</h2>
                  <p className="text-orange-100 text-sm">Applications for final approval</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Approved Today</p>
                  <h2 className="text-3xl font-bold">{applications.filter(app => app.status === 'approved' && app.approvalDate === new Date().toISOString().split('T')[0]).length}</h2>
                  <p className="text-green-100 text-sm">Applications approved</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pink-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Portfolio Value</p>
                  <h2 className="text-3xl font-bold">₹{Math.floor(realTimeStats.totalBalance / 1000000)}M</h2>
                  <p className="text-pink-100 text-sm">Total managed assets</p>
                </div>
                <TrendingUp className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Users</p>
                  <h2 className="text-3xl font-bold">{realTimeStats.activeUsers}</h2>
                  <p className="text-purple-100 text-sm">Currently online</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <Button 
              className={`${activeTab === 'pending' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('pending')}
            >
              Pending Review
            </Button>
            <Button 
              className={`${activeTab === 'accounts' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('accounts')}
            >
              Account Management
            </Button>
            <Button 
              className={`${activeTab === 'transactions' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('transactions')}
            >
              Transaction Oversight
            </Button>
            <Button 
              className={`${activeTab === 'staff' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('staff')}
            >
              Staff Management
            </Button>
            <Button
              className={`${activeTab === 'reports' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </Button>
            <Button
              className={`${activeTab === 'history' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
              variant="ghost"
              onClick={() => setActiveTab('history')}
            >
              History
            </Button>
          </div>
        </div>

        {/* Pending Review Tab */}
        {activeTab === 'pending' && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Applications for Final Review</span>
                  </CardTitle>
                  <CardDescription>Review KYC verified applications for final approval</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications for Review</h3>
                  <p className="text-gray-600">All applications have been processed or none are ready for manager approval.</p>
                  <Button variant="outline" className="mt-4" onClick={loadKYCCompletedApplications}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Applications
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {app.personalInfo.firstName} {app.personalInfo.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">Application ID: {app.id}</p>
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{app.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{app.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-gray-600" />
                            <span className="text-sm capitalize">{app.accountInfo.accountType} Account</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Submitted: {app.submittedDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">KYC by: {app.clerkId}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Initial Deposit: ₹{app.accountInfo.initialDeposit.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Identity</span>
                            <Badge className="bg-green-100 text-green-800">✓ verified</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Documents</span>
                            <Badge className="bg-green-100 text-green-800">✓ verified</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Video KYC</span>
                            <Badge className="bg-green-100 text-green-800">✓ completed</Badge>
                          </div>
                        </div>
                      </div>

                      {app.clerkNotes && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <Label className="text-sm font-medium text-blue-800">KYC Verification Report:</Label>
                          <div className="text-sm text-blue-700 mt-1 whitespace-pre-line">{app.clerkNotes}</div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Application
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Download Documents
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Dialog open={rejectionDialog} onOpenChange={setRejectionDialog}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setSelectedApplication(app)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Application</DialogTitle>
                                <DialogDescription>
                                  Please provide a detailed reason for rejecting this application.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Rejection Reason</Label>
                                  <Textarea 
                                    placeholder="Enter detailed reason for rejection..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={4}
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setRejectionDialog(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={rejectApplication}>
                                    Reject Application
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={approvalDialog} onOpenChange={setApprovalDialog}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => setSelectedApplication(app)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Application
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Approve Application</DialogTitle>
                                <DialogDescription>
                                  Review and confirm the account details before approval.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                  <h4 className="font-semibold text-green-800 mb-2">Application Summary</h4>
                                  <div className="text-sm text-green-700 space-y-1">
                                    <p>Customer: {selectedApplication?.personalInfo.firstName} {selectedApplication?.personalInfo.lastName}</p>
                                    <p>Email: {selectedApplication?.contactInfo.email}</p>
                                    <p>Phone: {selectedApplication?.contactInfo.phone}</p>
                                    <p>Account Type: {selectedApplication?.accountInfo.accountType}</p>
                                    <p>Initial Deposit: ₹{selectedApplication?.accountInfo.initialDeposit.toLocaleString()}</p>
                                  </div>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg">
                                  <h4 className="font-semibold text-yellow-800 mb-2">Account Configuration</h4>
                                  <div className="text-sm text-yellow-700 space-y-1">
                                    <p><strong>Account Type:</strong> {selectedApplication?.accountInfo.accountType} (as selected by customer)</p>
                                    <p><strong>Branch:</strong> VaultX Main Branch</p>
                                    <p><strong>IFSC Code:</strong> Will be auto-generated</p>
                                    <p><strong>Initial Deposit:</strong> ₹{selectedApplication?.accountInfo.initialDeposit.toLocaleString()}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label>Manager Notes</Label>
                                  <Textarea 
                                    placeholder="Add any notes for this approval..."
                                    value={approvalData.notes}
                                    onChange={(e) => setApprovalData(prev => ({ ...prev, notes: e.target.value }))}
                                    rows={3}
                                  />
                                </div>

                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox" 
                                    id="welcomeEmail"
                                    checked={approvalData.welcomeEmail}
                                    onChange={(e) => setApprovalData(prev => ({ ...prev, welcomeEmail: e.target.checked }))}
                                  />
                                  <Label htmlFor="welcomeEmail">Send welcome email with account details</Label>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setApprovalDialog(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={approveApplication} className="bg-green-600 hover:bg-green-700">
                                    <Send className="w-4 h-4 mr-2" />
                                    Approve & Send Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Account Management Tab */}
        {activeTab === 'accounts' && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Account Management</span>
              </CardTitle>
              <CardDescription>Manage customer accounts, holds, and restrictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.filter(app => app.status === 'approved').map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {app.personalInfo.firstName} {app.personalInfo.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">Account: {app.accountNumber}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active Account</Badge>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label className="text-xs text-gray-600">Current Balance</Label>
                        <p className="text-lg font-semibold text-green-600">₹{app.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Account Type</Label>
                        <p className="text-sm capitalize">{app.accountInfo.accountType}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Account Status</Label>
                        <p className={`text-sm font-medium ${
                          accountActions[app.id]?.status === 'hold' ? 'text-red-600' : 
                          accountActions[app.id]?.status === 'restricted' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {accountActions[app.id]?.status === 'hold' ? 'ON HOLD' :
                           accountActions[app.id]?.status === 'restricted' ? 'RESTRICTED' : 'ACTIVE'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Daily Limit</Label>
                        <p className="text-sm">₹{(transactionLimits[app.id] || 100000).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Documents
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Customer Documents</DialogTitle>
                              <DialogDescription>
                                {app.personalInfo.firstName} {app.personalInfo.lastName} - {app.accountNumber}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>PAN Card</Label>
                                <div className="border rounded-lg p-4 text-center bg-blue-50">
                                  <img 
                                    src="https://via.placeholder.com/300x200/e3f2fd/1976d2?text=PAN+Card" 
                                    alt="PAN Card" 
                                    className="w-full h-32 object-cover rounded mb-2"
                                  />
                                  <p className="text-sm text-gray-600">PAN: {app.identityInfo.panNumber}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Aadhaar Card</Label>
                                <div className="border rounded-lg p-4 text-center bg-purple-50">
                                  <img 
                                    src="https://via.placeholder.com/300x200/f3e5f5/7b1fa2?text=Aadhaar+Card" 
                                    alt="Aadhaar Card" 
                                    className="w-full h-32 object-cover rounded mb-2"
                                  />
                                  <p className="text-sm text-gray-600">Aadhaar: {app.identityInfo.aadharNumber}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4 mr-2" />
                              Account Actions
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Account Management Actions</DialogTitle>
                              <DialogDescription>
                                Manage account status and restrictions for {app.personalInfo.firstName} {app.personalInfo.lastName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Account Status</Label>
                                <Select 
                                  value={accountActions[app.id]?.status || 'active'}
                                  onValueChange={(value) => setAccountActions(prev => ({...prev, [app.id]: {...prev[app.id], status: value}}))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="hold">Place on Hold</SelectItem>
                                    <SelectItem value="restricted">Restricted Access</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label>Daily Transaction Limit</Label>
                                <Input 
                                  type="number"
                                  placeholder="Enter daily limit"
                                  value={transactionLimits[app.id] || 100000}
                                  onChange={(e) => setTransactionLimits(prev => ({...prev, [app.id]: parseInt(e.target.value) || 100000}))}
                                />
                              </div>
                              
                              <div>
                                <Label>Reason for Action</Label>
                                <Textarea 
                                  placeholder="Enter reason for this action..."
                                  value={accountActions[app.id]?.reason || ''}
                                  onChange={(e) => setAccountActions(prev => ({...prev, [app.id]: {...prev[app.id], reason: e.target.value}}))}
                                />
                              </div>
                              
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={() => {
                                  // Apply account changes - store in localStorage for persistence
                                  const accountUpdates = {
                                    ...accountActions,
                                    [app.id]: {
                                      ...accountActions[app.id],
                                      appliedAt: new Date().toISOString(),
                                      appliedBy: currentEmployee?.employeeId
                                    }
                                  };
                                  setAccountActions(accountUpdates);
                                  localStorage.setItem('vaultx_account_actions', JSON.stringify(accountUpdates));

                                  const limitUpdates = {
                                    ...transactionLimits,
                                    [app.id]: transactionLimits[app.id] || 100000
                                  };
                                  setTransactionLimits(limitUpdates);
                                  localStorage.setItem('vaultx_transaction_limits', JSON.stringify(limitUpdates));

                                  alert(`Account action applied successfully for ${app.personalInfo.firstName} ${app.personalInfo.lastName}!\n\nStatus: ${accountActions[app.id]?.status || 'active'}\nDaily Limit: ₹${(transactionLimits[app.id] || 100000).toLocaleString()}\nApplied by: ${currentEmployee?.firstName} ${currentEmployee?.lastName}`);
                                }}>
                                  Apply Changes
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction Oversight Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Real-time Transaction Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Portfolio</p>
                      <h3 className="text-2xl font-bold">₹{realTimeStats.totalBalance.toLocaleString()}</h3>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Today's Transactions</p>
                      <h3 className="text-2xl font-bold">{realTimeStats.todayTransactions}</h3>
                    </div>
                    <RefreshCw className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Active Users</p>
                      <h3 className="text-2xl font-bold">{realTimeStats.activeUsers}</h3>
                    </div>
                    <Users className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Risk Alerts</p>
                      <h3 className="text-2xl font-bold">{realTimeStats.alertsCount}</h3>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Transaction Monitor */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span>Live Transaction Monitor</span>
                    </CardTitle>
                    <CardDescription>Real-time transaction oversight and risk management</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={loadTransactionMonitor}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionMonitor.map((txn) => (
                    <div key={txn.id} className={`border rounded-lg p-4 ${
                      txn.risk === 'high' ? 'border-red-200 bg-red-50' :
                      txn.risk === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-green-200 bg-green-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            txn.status === 'completed' ? 'bg-green-500' :
                            txn.status === 'pending' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold">{txn.id}</h4>
                            <p className="text-sm text-gray-600">{new Date(txn.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${
                            txn.risk === 'high' ? 'bg-red-100 text-red-800' :
                            txn.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {txn.risk} risk
                          </Badge>
                          <Badge variant={txn.status === 'completed' ? 'default' : 'outline'}>
                            {txn.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600">From</Label>
                          <p className="font-mono">{txn.from}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">To</Label>
                          <p className="font-mono">{txn.to}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Amount</Label>
                          <p className="font-semibold text-lg">₹{txn.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Type</Label>
                          <p className="capitalize">{txn.type}</p>
                        </div>
                      </div>

                      {txn.status === 'flagged' && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="destructive">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Investigate
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-2" />
                            Block
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Staff Management Tab */}
        {activeTab === 'staff' && (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>Staff Performance Dashboard</span>
                  </CardTitle>
                  <CardDescription>Monitor clerk performance and productivity metrics</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={loadStaffPerformance}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {staffPerformance.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Staff Data</h3>
                  <p className="text-gray-600">Staff performance data will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {staffPerformance.map((staff) => (
                    <div key={staff.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {staff.firstName} {staff.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">{staff.employeeId} • {staff.designation}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${
                            staff.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                            staff.efficiency >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {staff.efficiency}% Efficient
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {staff.customerRating}★ Rating
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-2xl font-bold text-blue-600">{staff.applicationsProcessed}</p>
                            <p className="text-xs text-blue-600">Applications Processed</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-2xl font-bold text-green-600">{staff.kycCompleted}</p>
                            <p className="text-xs text-green-600">KYC Completed</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="text-2xl font-bold text-purple-600">{staff.averageTime}m</p>
                            <p className="text-xs text-purple-600">Avg Processing Time</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-yellow-50 rounded-lg p-3">
                            <p className="text-2xl font-bold text-yellow-600">{staff.customerRating}</p>
                            <p className="text-xs text-yellow-600">Customer Rating</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-indigo-50 rounded-lg p-3">
                            <p className="text-2xl font-bold text-indigo-600">{staff.efficiency}%</p>
                            <p className="text-xs text-indigo-600">Efficiency Score</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600">Contact Information</Label>
                          <p>{staff.email}</p>
                          <p>{staff.phone}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Department & Location</Label>
                          <p>{staff.department}</p>
                          <p>{staff.workLocation}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Last Active</Label>
                          <p>{new Date(staff.lastActive).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{new Date(staff.lastActive).toLocaleTimeString()}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Performance
                          </Button>
                        </div>

                        <div className="flex space-x-2">
                          {staff.efficiency >= 90 && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Commend Performance
                            </Button>
                          )}
                          {staff.efficiency < 75 && (
                            <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-600">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Performance Review
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
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm">Weekly Growth</p>
                      <h3 className="text-3xl font-bold">+12.5%</h3>
                      <p className="text-indigo-100 text-sm">Customer acquisition</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Success Rate</p>
                      <h3 className="text-3xl font-bold">94.2%</h3>
                      <p className="text-green-100 text-sm">Application approval</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Avg Processing</p>
                      <h3 className="text-3xl font-bold">2.3 hrs</h3>
                      <p className="text-orange-100 text-sm">Application to approval</p>
                    </div>
                    <Clock className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Reports */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                  <CardDescription>Key performance indicators for your branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Monthly Applications</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-32">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">85/100</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Target: 85%</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Customer Satisfaction</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-32">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">4.7/5.0</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Processing Efficiency</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-32">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">92%</span>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Outstanding</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Risk Management</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-32">
                            <div className="bg-yellow-600 h-2 rounded-full" style={{width: '78%'}}></div>
                          </div>
                          <span className="text-sm font-semibold">78%</span>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions & Reports */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-green-600" />
                    <span>Generate Reports</span>
                  </CardTitle>
                  <CardDescription>Download detailed analytics and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Monthly Performance Report
                      <Badge className="ml-auto bg-blue-100 text-blue-800">PDF</Badge>
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Customer Analytics Dashboard
                      <Badge className="ml-auto bg-green-100 text-green-800">Excel</Badge>
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Staff Performance Summary
                      <Badge className="ml-auto bg-purple-100 text-purple-800">PDF</Badge>
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Risk Assessment Report
                      <Badge className="ml-auto bg-orange-100 text-orange-800">PDF</Badge>
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Business Growth Analysis
                      <Badge className="ml-auto bg-indigo-100 text-indigo-800">Excel</Badge>
                    </Button>

                    <div className="border-t pt-3 mt-4">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Custom Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Branch Comparison */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Branch Comparison</span>
                </CardTitle>
                <CardDescription>Performance comparison with other VaultX branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border">
                    <h4 className="font-semibold text-green-800">Mumbai Main (You)</h4>
                    <p className="text-2xl font-bold text-green-600">1st</p>
                    <p className="text-sm text-green-600">Overall Ranking</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border">
                    <h4 className="font-semibold text-blue-800">Delhi North</h4>
                    <p className="text-2xl font-bold text-blue-600">2nd</p>
                    <p className="text-sm text-blue-600">Overall Ranking</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border">
                    <h4 className="font-semibold text-orange-800">Bangalore Tech</h4>
                    <p className="text-2xl font-bold text-orange-600">3rd</p>
                    <p className="text-sm text-orange-600">Overall Ranking</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold text-gray-800">Chennai Express</h4>
                    <p className="text-2xl font-bold text-gray-600">4th</p>
                    <p className="text-sm text-gray-600">Overall Ranking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            {/* Action History Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Actions</p>
                      <h3 className="text-2xl font-bold">{Object.keys(accountActions).length + applications.filter(app => app.status === 'approved' || app.status === 'rejected').length}</h3>
                    </div>
                    <Clock className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Approvals</p>
                      <h3 className="text-2xl font-bold">{applications.filter(app => app.status === 'approved').length}</h3>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Rejections</p>
                      <h3 className="text-2xl font-bold">{applications.filter(app => app.status === 'rejected').length}</h3>
                    </div>
                    <XCircle className="w-8 h-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Account Actions</p>
                      <h3 className="text-2xl font-bold">{Object.keys(accountActions).length}</h3>
                    </div>
                    <Settings className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed History */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Action History</span>
                    </CardTitle>
                    <CardDescription>Complete history of all managerial actions and decisions</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export History
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Application Approvals/Rejections */}
                  {applications.filter(app => app.status === 'approved' || app.status === 'rejected').map((app) => (
                    <div key={`app-${app.id}`} className={`border rounded-lg p-4 ${
                      app.status === 'approved' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            app.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold">Application {app.status === 'approved' ? 'Approved' : 'Rejected'}</h4>
                            <p className="text-sm text-gray-600">{app.personalInfo.firstName} {app.personalInfo.lastName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {app.status.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{app.approvalDate || app.rejectionDate}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600">Customer Details</Label>
                          <p>Email: {app.contactInfo.email}</p>
                          <p>Account Type: {app.accountInfo.accountType}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">{app.status === 'approved' ? 'Account Details' : 'Rejection Reason'}</Label>
                          {app.status === 'approved' ? (
                            <>
                              <p>Account: {app.accountNumber || 'Generated'}</p>
                              <p>Balance: ₹{(app.balance || app.accountInfo.initialDeposit).toLocaleString()}</p>
                            </>
                          ) : (
                            <p className="text-red-700">{app.rejectionReason || 'Standard rejection process'}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Manager Action</Label>
                          <p>By: {currentEmployee?.firstName} {currentEmployee?.lastName}</p>
                          <p>ID: {currentEmployee?.employeeId}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Account Management Actions */}
                  {Object.entries(accountActions).filter(([_, action]) => action.appliedAt).map(([appId, action]) => {
                    const customer = applications.find(app => app.id === appId);
                    return (
                      <div key={`action-${appId}`} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <div>
                              <h4 className="font-semibold">Account Management Action</h4>
                              <p className="text-sm text-gray-600">{customer?.personalInfo.firstName} {customer?.personalInfo.lastName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-800">ACCOUNT ACTION</Badge>
                            <p className="text-xs text-gray-500 mt-1">{new Date(action.appliedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-gray-600">Customer Details</Label>
                            <p>Email: {customer?.contactInfo.email}</p>
                            <p>Account: {customer?.accountNumber}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Action Details</Label>
                            <p>Status: {action.status}</p>
                            <p>Daily Limit: ₹{(transactionLimits[appId] || 100000).toLocaleString()}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">Manager Action</Label>
                            <p>By: {currentEmployee?.firstName} {currentEmployee?.lastName}</p>
                            <p>Reason: {action.reason || 'Administrative action'}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {applications.filter(app => app.status === 'approved' || app.status === 'rejected').length === 0 && Object.keys(accountActions).length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No History Available</h3>
                      <p className="text-gray-600">Your managerial actions and decisions will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
