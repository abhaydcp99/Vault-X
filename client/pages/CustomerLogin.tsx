import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronLeft, Mail, Phone, Lock, Timer, CheckCircle, UserCheck, Sparkles, ArrowRight, Building2, Globe } from 'lucide-react';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [loginStep, setLoginStep] = useState('credentials'); // 'credentials' | 'otp'
  const [loginMethod, setLoginMethod] = useState('email');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [developmentOtp] = useState('123456'); // Development OTP for testing
  const [credentials, setCredentials] = useState({
    email: '',
    phone: '',
    password: ''
  });

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

  useEffect(() => {
    // Check if user just registered
    const registrationSuccess = localStorage.getItem('registrationSuccess');
    const registrationEmail = localStorage.getItem('registrationEmail');

    if (registrationSuccess === 'true') {
      setShowSuccessMessage(true);
      if (registrationEmail) {
        setCredentials(prev => ({ ...prev, email: registrationEmail }));
      }
      // Clear the success flag
      localStorage.removeItem('registrationSuccess');
      localStorage.removeItem('registrationEmail');

      // Hide success message after 10 seconds
      setTimeout(() => setShowSuccessMessage(false), 10000);
    }
  }, []);

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Import application state
      const { applicationState } = await import('@/lib/applicationState');

      // Verify credentials
      const user = applicationState.login(
        loginMethod === 'email' ? credentials.email : credentials.phone,
        credentials.password
      );

      if (user) {
        setTimeout(() => {
          setIsLoading(false);
          setLoginStep('otp');
          // Start OTP timer
          const timer = setInterval(() => {
            setOtpTimer(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }, 1500);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          alert('Invalid credentials. Please check your email/phone and password.');
        }, 1500);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      alert('Login failed. Please try again.');
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if OTP is correct (accept development OTP or simulate verification)
    if (otp === developmentOtp || otp === '123456') {
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to customer dashboard
        navigate('/customer/dashboard');
      }, 1500);
    } else {
      // Show error for wrong OTP
      setTimeout(() => {
        setIsLoading(false);
        alert('Invalid OTP. Use 123456 for testing or contact support.');
      }, 1500);
    }
  };

  const resendOtp = () => {
    setOtpTimer(120);
    // Show development OTP message
    alert(`Development Mode: Your OTP is ${developmentOtp}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loginStep === 'otp') {
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

        {/* Header */}
        <header className={`${themeClasses.headerBackground} border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.button 
                onClick={() => setLoginStep('credentials')}
                className={`flex items-center space-x-2 ${themeClasses.primaryText} hover:${themeClasses.secondaryText}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </motion.button>
              
              <Link to="/" className="flex items-center space-x-2">
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
              </Link>
              
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className={`w-full max-w-md shadow-2xl border-0 ${theme === 'dark' ? 'bg-slate-900/90 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
              <CardHeader className="text-center">
                <motion.div
                  className={`w-16 h-16 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className={`text-2xl ${themeClasses.primaryText}`}>Verify OTP</CardTitle>
                  <CardDescription className={themeClasses.secondaryText}>
                    We've sent a 6-digit verification code to{' '}
                    <span className={`font-medium ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {loginMethod === 'email' ? credentials.email : credentials.phone}
                    </span>
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleOtpVerification} className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="otp" className={themeClasses.primaryText}>Enter OTP</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                          <InputOTPSlot index={1} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                          <InputOTPSlot index={2} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                          <InputOTPSlot index={3} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                          <InputOTPSlot index={4} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                          <InputOTPSlot index={5} className={theme === 'dark' ? 'bg-slate-800 border-slate-600 text-white' : ''} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {/* Development Mode Helper */}
                    <motion.div 
                      className={`mt-3 p-3 ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-700/50' : 'bg-green-50 border border-green-200'} rounded-lg`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className={`text-sm text-center flex items-center justify-center space-x-2 ${theme === 'dark' ? 'text-emerald-300' : 'text-green-700'}`}>
                        <Sparkles className="w-4 h-4" />
                        <span><strong>Development Mode:</strong> Use OTP <code className={`${theme === 'dark' ? 'bg-emerald-800/50' : 'bg-green-200'} px-1 rounded font-mono`}>123456</code> for testing</span>
                      </p>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {otpTimer > 0 ? (
                      <div className={`flex items-center justify-center space-x-2 ${themeClasses.secondaryText}`}>
                        <Timer className="w-4 h-4" />
                        <span className="text-sm">
                          Resend OTP in {formatTime(otpTimer)}
                        </span>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          type="button" 
                          variant="link" 
                          onClick={resendOtp}
                          className={`${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                        >
                          Resend OTP
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button 
                      type="submit" 
                      className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'} text-white shadow-lg`}
                      disabled={otp.length !== 6 || isLoading}
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
                          Verify & Login
                          <CheckCircle className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <span className={`text-sm ${themeClasses.secondaryText}`}>New customer?</span>
              <Link to="/customer/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm" className={themeClasses.secondaryButton}>
                    Open Account
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Alert className={`${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-700/50' : 'bg-green-50 border border-green-200'} max-w-md mx-auto`}>
              <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-green-600'}`} />
              <AlertDescription className={`${theme === 'dark' ? 'text-emerald-300' : 'text-green-800'}`}>
                <strong>Registration Successful!</strong> Your application has been submitted. You can now login to track your application status.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className={`mb-4 ${theme === 'dark' ? 'bg-slate-800 text-cyan-400 border-slate-700' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
              <UserCheck className="w-4 h-4 mr-2" />
              Customer Login
            </Badge>
          </motion.div>
          
          <motion.h1
            className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}
            variants={fadeInUp}
          >
            Welcome Back to
            <motion.span
              className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-green-600'} block`}
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              VaultX Digital Banking
            </motion.span>
          </motion.h1>
          
          <motion.p
            className={`text-lg ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            variants={fadeInUp}
          >
            Access your account securely and manage your finances with our advanced digital platform
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
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                  <CardTitle className={`text-2xl ${themeClasses.primaryText} flex items-center justify-center space-x-2`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} />
                    </motion.div>
                    <span>Welcome Back</span>
                  </CardTitle>
                  <CardDescription className={themeClasses.secondaryText}>
                    Sign in to your VaultX account
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Tabs value={loginMethod} onValueChange={setLoginMethod} className="mb-6">
                    <TabsList className={`grid w-full grid-cols-2 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                      <TabsTrigger 
                        value="email" 
                        className={`flex items-center space-x-2 ${theme === 'dark' ? 'data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400' : ''}`}
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="phone" 
                        className={`flex items-center space-x-2 ${theme === 'dark' ? 'data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400' : ''}`}
                      >
                        <Phone className="w-4 h-4" />
                        <span>Mobile</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <form onSubmit={handleLogin} className="space-y-4 mt-6">
                      <TabsContent value="email" className="space-y-4 mt-0">
                        <motion.div 
                          className="space-y-2"
                          variants={fadeInUp}
                        >
                          <Label htmlFor="email" className={themeClasses.primaryText}>Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={credentials.email}
                            onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                            className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                            required
                          />
                        </motion.div>
                      </TabsContent>
                      
                      <TabsContent value="phone" className="space-y-4 mt-0">
                        <motion.div 
                          className="space-y-2"
                          variants={fadeInUp}
                        >
                          <Label htmlFor="phone" className={themeClasses.primaryText}>Mobile Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={credentials.phone}
                            onChange={(e) => setCredentials(prev => ({ ...prev, phone: e.target.value }))}
                            className={`${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                            required
                          />
                        </motion.div>
                      </TabsContent>

                      <motion.div 
                        className="space-y-2"
                        variants={fadeInUp}
                      >
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

                      <motion.div 
                        className="flex items-center justify-between"
                        variants={fadeInUp}
                      >
                        <Link 
                          to="/forgot-password" 
                          className={`text-sm ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                        >
                          Forgot password?
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
                          disabled={isLoading}
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
                              Signing in...
                            </>
                          ) : (
                            <>
                              Sign In
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </Tabs>

                  <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      Don't have an account?{' '}
                      <Link 
                        to="/customer/register" 
                        className={`font-medium ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        Open Account
                      </Link>
                    </p>
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

export default CustomerLogin;
