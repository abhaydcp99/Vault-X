import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { employeeState } from '@/lib/employeeState';
import { Shield, ChevronLeft, Users, UserCheck, Crown, Briefcase, Mail, AlertCircle, CheckCircle, Clock, Building2, Sparkles, ArrowRight, Lock, Star, Globe } from 'lucide-react';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [credentials, setCredentials] = useState({
    employeeId: '',
    password: '',
    role: ''
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Animation variants from About Us
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // First verify if employee exists and credentials are correct
      const employee = employeeState.getEmployeeById(credentials.employeeId);
      if (!employee) {
        setError('Employee ID not found');
        setIsLoading(false);
        return;
      }

      if (employee.password !== credentials.password) {
        setError('Invalid password');
        setIsLoading(false);
        return;
      }

      if (employee.role !== credentials.role) {
        setError('Selected role does not match your assigned role');
        setIsLoading(false);
        return;
      }

      // Generate OTP
      const otpResult = employeeState.generateOTP(credentials.employeeId);
      if (otpResult.success) {
        setGeneratedOtp(otpResult.otp || '');
        setOtpSent(true);
        setStep('otp');
        setSuccess(`OTP sent successfully! For testing: ${otpResult.otp}`);
      } else {
        setError(otpResult.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    }

    setIsLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = employeeState.verifyLogin(credentials.employeeId, credentials.password, otp);

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate(result.redirectTo || '/');
        }, 1500);
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during OTP verification');
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    const otpResult = employeeState.generateOTP(credentials.employeeId);
    if (otpResult.success) {
      setGeneratedOtp(otpResult.otp || '');
      setSuccess(`New OTP sent! For testing: ${otpResult.otp}`);
    } else {
      setError(otpResult.message);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'clerk':
        return <Users className="w-5 h-5" />;
      case 'manager':
        return <UserCheck className="w-5 h-5" />;
      case 'admin':
        return <Crown className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'clerk':
        return 'Access KYC applications and conduct video verification sessions';
      case 'manager':
        return 'Review applications, approve accounts, and manage operations';
      case 'admin':
        return 'System administration, user management, and audit oversight';
      default:
        return 'Select your role to continue';
    }
  };

  const getRoleGradient = (role: string) => {
    switch (role) {
      case 'clerk':
        return theme === 'dark' ? 'from-blue-400 to-cyan-500' : 'from-blue-500 to-cyan-500';
      case 'manager':
        return theme === 'dark' ? 'from-emerald-400 to-green-500' : 'from-emerald-500 to-green-500';
      case 'admin':
        return theme === 'dark' ? 'from-purple-400 to-pink-500' : 'from-purple-500 to-pink-500';
      default:
        return theme === 'dark' ? 'from-gray-400 to-slate-500' : 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <motion.div
        className={`absolute top-20 left-10 w-32 h-32 ${themeClasses.floatingElements[0]} rounded-full blur-3xl`}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-20 right-10 w-40 h-40 ${themeClasses.floatingElements[1]} rounded-full blur-3xl`}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/4 w-24 h-24 ${themeClasses.floatingElements[2]} rounded-full blur-3xl`}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <header className={`${themeClasses.headerBackground} border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-90`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChevronLeft className={`w-5 h-5 ${themeClasses.primaryText}`} />
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-8 h-8 ${themeClasses.accentGradient} rounded-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </motion.div>
                <motion.span
                  className={`text-xl font-bold ${themeClasses.primaryText}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  VaultX
                </motion.span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className={`text-sm ${themeClasses.secondaryText}`}>New Employee?</span>
              <Link to="/employee/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm" className={themeClasses.secondaryButton}>
                    Register
                  </Button>
                </motion.div>
              </Link>
              <Link to="/customer/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm" className={themeClasses.secondaryButton}>
                    Customer Login
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className={`mb-4 ${theme === 'dark' ? 'bg-slate-800 text-cyan-400 border-slate-700' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
              <Building2 className="w-4 h-4 mr-2" />
              Employee Portal
            </Badge>
          </motion.div>
          
          <motion.h1
            className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}
            variants={fadeInUp}
          >
            Welcome to VaultX
            <motion.span
              className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-green-600'} block`}
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              System Portal
            </motion.span>
          </motion.h1>
          
          <motion.p
            className={`text-lg ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            variants={fadeInUp}
          >
            Secure access for Administrators, Managers, and Clerks to manage banking operations
          </motion.p>
        </motion.div>

        <div className="flex items-center justify-center min-h-[calc(60vh)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className={`w-full max-w-md shadow-2xl border-0 ${theme === 'dark' ? 'bg-slate-900/90 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
              <CardHeader className="text-center">
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${getRoleGradient(credentials.role)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {getRoleIcon(credentials.role)}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className={`text-2xl ${themeClasses.primaryText} flex items-center justify-center space-x-2`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} />
                    </motion.div>
                    <span>Employee Portal</span>
                  </CardTitle>
                  <CardDescription className={themeClasses.secondaryText}>
                    {getRoleDescription(credentials.role)}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <Alert className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700/50' : 'bg-red-50 border-red-200'}`}>
                      <AlertCircle className={`h-4 w-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                      <AlertDescription className={`${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <Alert className={`${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-700/50' : 'bg-green-50 border-green-200'}`}>
                      <CheckCircle className={`h-4 w-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-green-600'}`} />
                      <AlertDescription className={`${theme === 'dark' ? 'text-emerald-300' : 'text-green-800'}`}>{success}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {step === 'credentials' ? (
                  <motion.form 
                    onSubmit={handleCredentialsSubmit} 
                    className="space-y-4"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                  >
                    <motion.div className="space-y-2" variants={fadeInUp}>
                      <Label htmlFor="role" className={themeClasses.primaryText}>Select Role</Label>
                      <Select value={credentials.role} onValueChange={(value) => setCredentials(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clerk">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>Clerk</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="manager">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="w-4 h-4" />
                              <span>Manager</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="admin">
                            <div className="flex items-center space-x-2">
                              <Crown className="w-4 h-4" />
                              <span>Admin</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeInUp}>
                      <Label htmlFor="employeeId" className={themeClasses.primaryText}>Employee ID</Label>
                      <Input
                        id="employeeId"
                        type="text"
                        placeholder="Enter your employee ID (e.g., CLK001)"
                        value={credentials.employeeId}
                        onChange={(e) => setCredentials(prev => ({ ...prev, employeeId: e.target.value }))}
                        className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                        required
                      />
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeInUp}>
                      <Label htmlFor="password" className={themeClasses.primaryText}>Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                        required
                      />
                    </motion.div>

                    <motion.div className="flex items-center justify-between" variants={fadeInUp}>
                      <Link
                        to="/employee/register"
                        className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        New employee? Register here
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      variants={fadeInUp}
                    >
                      <Button
                        type="submit"
                        className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'} text-white shadow-lg`}
                        disabled={isLoading || !credentials.role || !credentials.employeeId || !credentials.password}
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 mr-2"
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            Send OTP
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.form 
                    onSubmit={handleOtpSubmit} 
                    className="space-y-4"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                  >
                    <motion.div className="text-center mb-4" variants={fadeInUp}>
                      <Badge variant="outline" className={`flex items-center space-x-2 w-fit mx-auto ${theme === 'dark' ? 'border-slate-600 text-slate-300' : ''}`}>
                        <Mail className="w-4 h-4" />
                        <span>OTP sent to registered contact</span>
                      </Badge>
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeInUp}>
                      <Label htmlFor="otp" className={themeClasses.primaryText}>Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                        required
                        className={`text-center text-lg tracking-widest ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                      />
                      <div className={`text-sm ${themeClasses.secondaryText} text-center flex items-center justify-center space-x-1`}>
                        <Clock className="w-4 h-4" />
                        <span>OTP expires in 5 minutes</span>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center justify-between" variants={fadeInUp}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setStep('credentials')}
                          className={`text-sm ${themeClasses.secondaryText}`}
                        >
                          ← Back to credentials
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleResendOtp}
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                        >
                          Resend OTP
                        </Button>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      variants={fadeInUp}
                    >
                      <Button
                        type="submit"
                        className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500' : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'} text-white shadow-lg`}
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 mr-2"
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                            Verifying OTP...
                          </>
                        ) : (
                          <>
                            Login
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

                <motion.div 
                  className="mt-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className={`w-full border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className={`${theme === 'dark' ? 'bg-slate-900 text-slate-400' : 'bg-white text-gray-600'} px-2`}>Access Guidelines</span>
                    </div>
                  </div>

                  <div className={`text-xs ${themeClasses.secondaryText} space-y-2`}>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-400'} rounded-full mt-1.5 flex-shrink-0`} />
                      <span>Use only your assigned employee credentials</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-emerald-400' : 'bg-green-400'} rounded-full mt-1.5 flex-shrink-0`} />
                      <span>OTP will be sent to your registered contact</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-purple-400' : 'bg-purple-400'} rounded-full mt-1.5 flex-shrink-0`} />
                      <span>All activities are logged for audit purposes</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Alert className={`${theme === 'dark' ? 'bg-blue-900/20 border-blue-700/50' : 'bg-blue-50 border-blue-200'}`}>
                      <AlertCircle className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      <AlertDescription className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                        <strong>Test Credentials:</strong><br />
                        Clerk: CLK001 / clerk123<br />
                        Manager: MNG001 / manager123<br />
                        Admin: ADM001 / admin123
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
