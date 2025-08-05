import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { applicationState } from '@/lib/applicationState';
import {
  Shield,
  Eye,
  EyeOff,
  Send,
  Download,
  History,
  CreditCard,
  PieChart,
  Bell,
  Settings,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Smartphone,
  Zap,
  Users,
  Wallet,
  TrendingUp,
  Gift,
  Receipt3,
  Banknote,
  FileText,
  CheckCircle,
  Minus,
  Clock,
  AlertCircle,
  UserCheck,
  Video,
  Lock,
  User
} from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [application, setApplication] = useState<any>(null);
  const [canPerformOperations, setCanPerformOperations] = useState(false);
  const [transferDialog, setTransferDialog] = useState(false);
  const [addMoneyDialog, setAddMoneyDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  
  const [transferData, setTransferData] = useState({
    amount: '',
    recipient: '',
    note: ''
  });

  const [moneyAmount, setMoneyAmount] = useState('');
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    // Get current user and application
    const currentUser = applicationState.getCurrentUser();
    if (!currentUser) {
      navigate('/customer/login');
      return;
    }

    const userApp = applicationState.getApplicationByEmail(currentUser.email);
    if (userApp) {
      setApplication(userApp);
      setCanPerformOperations(userApp.canPerformOperations);

      // Load profile photo if exists
      const savedPhoto = localStorage.getItem(`customer_photo_${userApp.id}`);
      if (savedPhoto && savedPhoto !== 'null' && savedPhoto !== 'undefined') {
        setProfilePhoto(savedPhoto);
      } else {
        // Use a default avatar URL for demo purposes
        const defaultAvatars = [
          'https://images.unsplash.com/photo-1494790108755-2616b332d1bb?w=150&h=150&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        ];
        const avatarIndex = userApp.id.charCodeAt(userApp.id.length - 1) % defaultAvatars.length;
        setProfilePhoto(defaultAvatars[avatarIndex]);
      }

      // Initialize transactions if approved
      if (userApp.canPerformOperations && recentTransactions.length === 0) {
        setRecentTransactions([
          {
            id: 1,
            type: 'credit',
            description: 'Initial Deposit',
            amount: userApp.accountInfo.initialDeposit,
            date: userApp.approvalDate || userApp.submittedDate,
            balance: userApp.balance
          }
        ]);
      }
    }
  }, [navigate]);

  const handleTransfer = () => {
    if (!canPerformOperations) {
      alert('Please complete KYC verification to perform transactions.');
      return;
    }

    const amount = parseFloat(transferData.amount);
    if (amount && amount > 0 && amount <= application.balance) {
      const newBalance = application.balance - amount;
      
      // Update application state
      applicationState.updateBalance(application.id, newBalance);
      
      // Update local state
      setApplication(prev => ({ ...prev, balance: newBalance }));
      
      const newTransaction = {
        id: Date.now(),
        type: 'debit',
        description: `Transfer to ${transferData.recipient}`,
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        balance: newBalance
      };
      setRecentTransactions(prev => [newTransaction, ...prev]);
      
      setTransferDialog(false);
      setTransferData({ amount: '', recipient: '', note: '' });
      alert(`₹${amount.toLocaleString()} transferred successfully!`);
    } else {
      alert('Invalid amount or insufficient balance!');
    }
  };

  const handleAddMoney = () => {
    if (!canPerformOperations) {
      alert('Please complete KYC verification to perform transactions.');
      return;
    }

    const amount = parseFloat(moneyAmount);
    if (amount && amount > 0) {
      const newBalance = application.balance + amount;
      
      applicationState.updateBalance(application.id, newBalance);
      setApplication(prev => ({ ...prev, balance: newBalance }));
      
      const newTransaction = {
        id: Date.now(),
        type: 'credit',
        description: 'Money Added to Account',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        balance: newBalance
      };
      setRecentTransactions(prev => [newTransaction, ...prev]);
      
      setAddMoneyDialog(false);
      setMoneyAmount('');
      alert(`₹${amount.toLocaleString()} added successfully!`);
    } else {
      alert('Please enter a valid amount!');
    }
  };

  const handleWithdraw = () => {
    if (!canPerformOperations) {
      alert('Please complete KYC verification to perform transactions.');
      return;
    }

    const amount = parseFloat(moneyAmount);
    if (amount && amount > 0 && amount <= application.balance) {
      const newBalance = application.balance - amount;
      
      applicationState.updateBalance(application.id, newBalance);
      setApplication(prev => ({ ...prev, balance: newBalance }));
      
      const newTransaction = {
        id: Date.now(),
        type: 'debit',
        description: 'Cash Withdrawal',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        balance: newBalance
      };
      setRecentTransactions(prev => [newTransaction, ...prev]);
      
      setWithdrawDialog(false);
      setMoneyAmount('');
      alert(`₹${amount.toLocaleString()} withdrawn successfully!`);
    } else {
      alert('Invalid amount or insufficient balance!');
    }
  };

  const downloadStatement = () => {
    if (!canPerformOperations) {
      alert('Please complete KYC verification to access statements.');
      return;
    }

    const statementContent = `
VaultX Bank Statement
Account: ${application.accountNumber}
Name: ${application.personalInfo.firstName} ${application.personalInfo.lastName}
Balance: ₹${application.balance.toLocaleString()}

Recent Transactions:
${recentTransactions.map(t => `${t.date}: ${t.description} - ${t.type === 'credit' ? '+' : '-'}₹${t.amount}`).join('\n')}
    `;
    
    const blob = new Blob([statementContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vaultx-statement.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getKYCStatusInfo = () => {
    if (!application) return { status: 'Unknown', description: 'Loading...', color: 'gray' };

    switch (application.status) {
      case 'documents_submitted':
        return { 
          status: 'Documents Submitted', 
          description: 'Your documents are being reviewed by our team',
          color: 'blue',
          nextStep: 'Awaiting clerk review for video KYC'
        };
      case 'kyc_in_progress':
        return { 
          status: 'KYC In Progress', 
          description: 'Video KYC verification is in progress',
          color: 'yellow',
          nextStep: 'Please wait for clerk to complete verification'
        };
      case 'kyc_completed':
        return { 
          status: 'KYC Completed', 
          description: 'KYC verification completed, awaiting manager approval',
          color: 'blue',
          nextStep: 'Application is with manager for final approval'
        };
      case 'approved':
        return { 
          status: 'Approved', 
          description: 'Your account has been approved! You can now perform all banking operations.',
          color: 'green',
          nextStep: 'All banking features are now available'
        };
      case 'rejected':
        return { 
          status: 'Rejected', 
          description: 'Your application has been rejected. Please contact support.',
          color: 'red',
          nextStep: 'Contact customer support for assistance'
        };
      default:
        return { 
          status: 'Pending', 
          description: 'Application is being processed',
          color: 'gray',
          nextStep: 'Please wait for processing'
        };
    }
  };

  const kycInfo = getKYCStatusInfo();

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #059669 100%)'
    }}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">₹</span>
              </div>
              <span className="text-xl font-bold text-white">VaultX</span>
              <span className="text-white/80 text-sm">Customer Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-sm text-white/80">Welcome, {application.personalInfo.firstName}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => {
                applicationState.logout();
                navigate('/');
              }}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KYC Status Alert */}
        {!canPerformOperations && (
          <Alert className={`mb-6 border-2 ${
            kycInfo.color === 'blue' ? 'border-blue-400 bg-blue-50' :
            kycInfo.color === 'yellow' ? 'border-yellow-400 bg-yellow-50' :
            kycInfo.color === 'green' ? 'border-green-400 bg-green-50' :
            kycInfo.color === 'red' ? 'border-red-400 bg-red-50' :
            'border-gray-400 bg-gray-50'
          }`}>
            <AlertCircle className={`h-4 w-4 ${
              kycInfo.color === 'blue' ? 'text-blue-600' :
              kycInfo.color === 'yellow' ? 'text-yellow-600' :
              kycInfo.color === 'green' ? 'text-green-600' :
              kycInfo.color === 'red' ? 'text-red-600' :
              'text-gray-600'
            }`} />
            <AlertTitle className={`${
              kycInfo.color === 'blue' ? 'text-blue-800' :
              kycInfo.color === 'yellow' ? 'text-yellow-800' :
              kycInfo.color === 'green' ? 'text-green-800' :
              kycInfo.color === 'red' ? 'text-red-800' :
              'text-gray-800'
            }`}>
              KYC Status: {kycInfo.status}
            </AlertTitle>
            <AlertDescription className={`mt-2 ${
              kycInfo.color === 'blue' ? 'text-blue-700' :
              kycInfo.color === 'yellow' ? 'text-yellow-700' :
              kycInfo.color === 'green' ? 'text-green-700' :
              kycInfo.color === 'red' ? 'text-red-700' :
              'text-gray-700'
            }`}>
              {kycInfo.description}
              <br />
              <strong>Next Step:</strong> {kycInfo.nextStep}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Account Balance */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm">Account Balance</p>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {showBalance ? `₹${application.balance.toLocaleString()}` : '��••••••'}
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-slate-600 hover:bg-slate-100"
                    >
                      {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Account: {application.accountNumber || 'Pending Approval'}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white border-0 w-full h-10 text-xs"
                  disabled={!canPerformOperations}
                  onClick={() => canPerformOperations ? setAddMoneyDialog(true) : null}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  <span className="truncate">Add Money</span>
                  {!canPerformOperations && <Lock className="w-3 h-3 ml-1" />}
                </Button>

                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white border-0 w-full h-10 text-xs"
                  disabled={!canPerformOperations}
                  onClick={() => canPerformOperations ? setWithdrawDialog(true) : null}
                >
                  <Minus className="w-3 h-3 mr-1" />
                  <span className="truncate">Withdraw</span>
                  {!canPerformOperations && <Lock className="w-3 h-3 ml-1" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">KYC Status</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {canPerformOperations ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                    <span className="text-xl font-bold text-slate-900">
                      {canPerformOperations ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    {canPerformOperations ? 'Verification complete' : 'Under review'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* This Month */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">This Month</p>
                  <h3 className="text-2xl font-bold text-slate-900">{recentTransactions.length}</h3>
                  <p className="text-slate-500 text-sm">Total transactions</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Account Type</p>
                  <h3 className="text-2xl font-bold text-slate-900 capitalize">
                    {application.accountInfo.accountType}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {application.accountInfo.accountType === 'savings' ? 'Savings Account' : 'Current Account'}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { icon: Send, label: 'Fund Transfer', action: () => canPerformOperations ? setTransferDialog(true) : null },
              { icon: Download, label: 'Statements', action: downloadStatement },
              { icon: Plus, label: 'Add Money', action: () => canPerformOperations ? setAddMoneyDialog(true) : null },
              { icon: CreditCard, label: 'Apply Cards', action: () => canPerformOperations ? alert('Card application submitted!') : alert('Complete KYC to apply for cards') },
              { icon: Smartphone, label: 'Recharge', action: () => canPerformOperations ? alert('Recharge feature coming soon!') : alert('Complete KYC to use recharge services') },
              { icon: PieChart, label: 'Investments', action: () => canPerformOperations ? alert('Investment options available!') : alert('Complete KYC to access investments') }
            ].map((item, index) => (
              <Card 
                key={index}
                className={`hover:shadow-lg transition-shadow cursor-pointer bg-white/95 ${!canPerformOperations ? 'opacity-75' : ''}`}
                onClick={item.action}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 relative">
                    <item.icon className="w-6 h-6 text-blue-600" />
                    {!canPerformOperations && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-red-500" />}
                  </div>
                  <h3 className="font-semibold text-sm">{item.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="bg-white/90">
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="kyc">KYC Status</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  {canPerformOperations ? 'Your recent transactions' : 'Complete KYC verification to view transaction history'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {canPerformOperations && recentTransactions.length > 0 ? (
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? 
                              <ArrowDownLeft className="w-5 h-5" /> : 
                              <ArrowUpRight className="w-5 h-5" />
                            }
                          </div>
                          <div>
                            <p className="font-medium text-sm">{transaction.description}</p>
                            <p className="text-xs text-gray-600">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">Bal: ₹{transaction.balance.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {canPerformOperations ? 'No Transactions Yet' : 'KYC Verification Required'}
                    </h3>
                    <p className="text-gray-600">
                      {canPerformOperations 
                        ? 'Your transactions will appear here once you start using your account' 
                        : 'Complete your KYC verification to view and perform transactions'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="kyc">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>KYC Verification Status</CardTitle>
                <CardDescription>Track your account verification progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* KYC Timeline */}
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-3 ${application.status !== 'documents_submitted' ? 'text-green-600' : 'text-blue-600'}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Documents Submitted</span>
                      <span className="text-xs text-gray-500">({application.submittedDate})</span>
                    </div>
                    
                    <div className={`flex items-center space-x-3 ${
                      ['kyc_in_progress', 'kyc_completed', 'approved'].includes(application.status) ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {['kyc_in_progress', 'kyc_completed', 'approved'].includes(application.status) ? 
                        <CheckCircle className="w-5 h-5" /> : 
                        <Clock className="w-5 h-5" />
                      }
                      <span className="font-medium">Video KYC Verification</span>
                      {application.kycDate && <span className="text-xs text-gray-500">({application.kycDate})</span>}
                    </div>
                    
                    <div className={`flex items-center space-x-3 ${
                      application.status === 'approved' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {application.status === 'approved' ? 
                        <CheckCircle className="w-5 h-5" /> : 
                        <Clock className="w-5 h-5" />
                      }
                      <span className="font-medium">Manager Approval</span>
                      {application.approvalDate && <span className="text-xs text-gray-500">({application.approvalDate})</span>}
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Current Status</h4>
                    <p className="text-blue-700">{kycInfo.description}</p>
                    <p className="text-sm text-blue-600 mt-2">
                      <strong>Next Step:</strong> {kycInfo.nextStep}
                    </p>
                  </div>

                  {/* Notes */}
                  {application.clerkNotes && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Clerk Notes</h4>
                      <p className="text-green-700">{application.clerkNotes}</p>
                    </div>
                  )}

                  {application.managerNotes && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Manager Notes</h4>
                      <p className="text-purple-700">{application.managerNotes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account and personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Personal Information</h4>
                    <div className="flex items-start space-x-4 mb-4">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {application.personalInfo.firstName} {application.personalInfo.lastName}</p>
                        <p><strong>Email:</strong> {application.contactInfo.email}</p>
                        <p><strong>Phone:</strong> {application.contactInfo.phone}</p>
                        <p><strong>Date of Birth:</strong> {application.personalInfo.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Account Type:</strong> {application.accountInfo.accountType}</p>
                      <p><strong>Account Number:</strong> {application.accountNumber || 'Pending Approval'}</p>
                      <p><strong>IFSC Code:</strong> VLTX0001234</p>
                      <p><strong>Branch:</strong> Main Branch</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <Dialog open={transferDialog} onOpenChange={setTransferDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fund Transfer</DialogTitle>
              <DialogDescription>Transfer money to another account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Recipient Account</Label>
                <Input 
                  placeholder="Enter account number"
                  value={transferData.recipient}
                  onChange={(e) => setTransferData(prev => ({ ...prev, recipient: e.target.value }))}
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input 
                  type="number"
                  placeholder="Enter amount"
                  value={transferData.amount}
                  onChange={(e) => setTransferData(prev => ({ ...prev, amount: e.target.value }))}
                />
                <p className="text-xs text-slate-600 mt-1">Available balance: ₹{application.balance.toLocaleString()}</p>
              </div>
              <div>
                <Label>Note</Label>
                <Input 
                  placeholder="Transfer note"
                  value={transferData.note}
                  onChange={(e) => setTransferData(prev => ({ ...prev, note: e.target.value }))}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setTransferDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleTransfer} className="flex-1">
                  Transfer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={addMoneyDialog} onOpenChange={setAddMoneyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money</DialogTitle>
              <DialogDescription>Add money to your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Amount</Label>
                <Input 
                  type="number"
                  placeholder="Enter amount"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setAddMoneyDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddMoney} className="flex-1 bg-green-600 hover:bg-green-700">
                  Add Money
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Money</DialogTitle>
              <DialogDescription>Withdraw money from your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Amount</Label>
                <Input 
                  type="number"
                  placeholder="Enter amount"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-1">Available balance: ₹{application.balance.toLocaleString()}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setWithdrawDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleWithdraw} className="flex-1 bg-red-600 hover:bg-red-700">
                  Withdraw
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDashboard;
