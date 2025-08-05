import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, Upload, ChevronLeft, ArrowRight, User, Phone, Mail, MapPin, FileText, CreditCard, UserCheck, Sparkles, Star, CheckCircle, Building2, Lock, Globe } from 'lucide-react';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const CustomerRegister = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Address Information
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    permanentAddressSame: false,
    permAddressLine1: '',
    permAddressLine2: '',
    permCity: '',
    permState: '',
    permPincode: '',
    
    // Identity Documents
    panNumber: '',
    aadharNumber: '',
    
    // Employment Information
    occupation: '',
    employerName: '',
    monthlyIncome: '',
    
    // Account Information
    accountType: '',
    initialDeposit: '',
    nomineeRequired: false,
    nomineeName: '',
    nomineeRelation: '',
    nomineePhone: '',
    
    // Documents
    panCard: null,
    aadharCard: null,
    photograph: null,
    signature: null,
    
    // Terms and Conditions
    agreeTerms: false,
    agreeKYC: false,
    agreeMarketing: false,
    
    password: '',
    confirmPassword: ''
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
        staggerChildren: 0.1
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import application state
      const { applicationState } = await import('@/lib/applicationState');

      // Create application data structure
      const applicationData = {
        personalInfo: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          fatherName: formData.fatherName,
          motherName: formData.motherName
        },
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
          alternatePhone: formData.alternatePhone,
          address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }
        },
        identityInfo: {
          panNumber: formData.panNumber,
          aadharNumber: formData.aadharNumber,
          occupation: formData.occupation,
          monthlyIncome: formData.monthlyIncome,
          employerName: formData.employerName
        },
        accountInfo: {
          accountType: formData.accountType as 'savings' | 'current',
          initialDeposit: parseInt(formData.initialDeposit),
          nomineeRequired: formData.nomineeRequired,
          nomineeName: formData.nomineeName,
          nomineeRelation: formData.nomineeRelation
        },
        documents: {
          panCard: formData.panCard ? 'uploaded' : null,
          aadharCard: formData.aadharCard ? 'uploaded' : null,
          photograph: formData.photograph ? 'uploaded' : null,
          signature: formData.signature ? 'uploaded' : null
        },
        password: formData.password
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create application in state management
      const applicationId = applicationState.createApplication(applicationData);

      console.log('Application created with ID:', applicationId);

      // Store success message in localStorage to show on login page
      localStorage.setItem('registrationSuccess', 'true');
      localStorage.setItem('registrationEmail', formData.email);

      // Navigate to login page
      navigate('/customer/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [User, Mail, FileText, CreditCard, Shield];
  const stepTitles = ['Personal Info', 'Contact Details', 'Identity & Work', 'Account Setup', 'Security & Terms'];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center space-x-2 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Personal Information</h3>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-3 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="firstName" className={themeClasses.primaryText}>First Name *</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="middleName" className={themeClasses.primaryText}>Middle Name</Label>
                <Input 
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  placeholder="Enter middle name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className={themeClasses.primaryText}>Last Name *</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="dateOfBirth" className={themeClasses.primaryText}>Date of Birth *</Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}
                />
              </div>
              <div>
                <Label className={themeClasses.primaryText}>Gender *</Label>
                <RadioGroup 
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className={themeClasses.secondaryText}>Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className={themeClasses.secondaryText}>Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className={themeClasses.secondaryText}>Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="maritalStatus" className={themeClasses.primaryText}>Marital Status *</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="fatherName" className={themeClasses.primaryText}>Father's Name *</Label>
                <Input 
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Enter father's name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="motherName" className={themeClasses.primaryText}>Mother's Name *</Label>
                <Input 
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  placeholder="Enter mother's name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center space-x-2 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-400 to-cyan-500' : 'bg-gradient-to-r from-green-500 to-blue-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Contact & Address Information</h3>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="email" className={themeClasses.primaryText}>Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="phone" className={themeClasses.primaryText}>Mobile Number *</Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Label htmlFor="alternatePhone" className={themeClasses.primaryText}>Alternate Contact Number</Label>
              <Input 
                id="alternatePhone"
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                placeholder="Enter alternate contact number"
                className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
              />
            </motion.div>

            <motion.div className="flex items-center space-x-2 mt-8 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Current Address</h3>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Label htmlFor="addressLine1" className={themeClasses.primaryText}>Address Line 1 *</Label>
              <Input 
                id="addressLine1"
                value={formData.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                placeholder="House/Flat No., Building Name"
                className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Label htmlFor="addressLine2" className={themeClasses.primaryText}>Address Line 2</Label>
              <Input 
                id="addressLine2"
                value={formData.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                placeholder="Street Name, Area"
                className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
              />
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="city" className={themeClasses.primaryText}>City *</Label>
                <Input 
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter city"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="state" className={themeClasses.primaryText}>State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pincode" className={themeClasses.primaryText}>PIN Code *</Label>
                <Input 
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div className="flex items-center space-x-2" variants={fadeInUp}>
              <Checkbox 
                id="permanentAddressSame"
                checked={formData.permanentAddressSame}
                onCheckedChange={(checked) => handleInputChange('permanentAddressSame', checked)}
              />
              <Label htmlFor="permanentAddressSame" className={themeClasses.secondaryText}>Permanent address same as current address</Label>
            </motion.div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center space-x-2 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Identity & Employment Information</h3>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="panNumber" className={themeClasses.primaryText}>PAN Number *</Label>
                <Input 
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  placeholder="Enter PAN number"
                  className={`uppercase mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="aadharNumber" className={themeClasses.primaryText}>Aadhaar Number *</Label>
                <Input 
                  id="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                  placeholder="Enter 12-digit Aadhaar number"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="occupation" className={themeClasses.primaryText}>Occupation *</Label>
                <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                  <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried Employee</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="homemaker">Homemaker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="monthlyIncome" className={themeClasses.primaryText}>Monthly Income (₹) *</Label>
                <Select value={formData.monthlyIncome} onValueChange={(value) => handleInputChange('monthlyIncome', value)}>
                  <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-25000">Below ₹25,000</SelectItem>
                    <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000-250000">₹1,00,000 - ₹2,50,000</SelectItem>
                    <SelectItem value="250000-500000">₹2,50,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="above-500000">Above ₹5,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {(formData.occupation === 'salaried' || formData.occupation === 'professional') && (
              <motion.div variants={fadeInUp}>
                <Label htmlFor="employerName" className={themeClasses.primaryText}>Employer/Company Name *</Label>
                <Input 
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => handleInputChange('employerName', e.target.value)}
                  placeholder="Enter employer/company name"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </motion.div>
            )}
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center space-x-2 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Account & Document Upload</h3>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="accountType" className={themeClasses.primaryText}>Account Type *</Label>
                <RadioGroup 
                  value={formData.accountType}
                  onValueChange={(value) => handleInputChange('accountType', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="savings" id="savings" />
                    <Label htmlFor="savings" className={themeClasses.secondaryText}>Savings Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className={themeClasses.secondaryText}>Current Account</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="initialDeposit" className={themeClasses.primaryText}>Initial Deposit (₹) *</Label>
                <Input 
                  id="initialDeposit"
                  type="number"
                  value={formData.initialDeposit}
                  onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                  placeholder="Minimum ₹1000"
                  min="1000"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <h4 className={`font-semibold ${themeClasses.primaryText}`}>Upload Documents *</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className={themeClasses.primaryText}>PAN Card</Label>
                  <div
                    className={`border-2 border-dashed ${theme === 'dark' ? 'border-slate-600 bg-slate-800/30 hover:border-cyan-400' : 'border-gray-300 hover:border-blue-400'} rounded-lg p-4 text-center cursor-pointer transition-all duration-300`}
                    onClick={() => document.getElementById('pan-upload')?.click()}
                  >
                    <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'} mx-auto mb-2`} />
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {formData.panCard ? formData.panCard.name : 'Click to upload PAN card'}
                    </p>
                    <input
                      id="pan-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('panCard', e.target.files?.[0] || null)}
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className={themeClasses.primaryText}>Aadhaar Card</Label>
                  <div
                    className={`border-2 border-dashed ${theme === 'dark' ? 'border-slate-600 bg-slate-800/30 hover:border-emerald-400' : 'border-gray-300 hover:border-green-400'} rounded-lg p-4 text-center cursor-pointer transition-all duration-300`}
                    onClick={() => document.getElementById('aadhar-upload')?.click()}
                  >
                    <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-emerald-400' : 'text-green-500'} mx-auto mb-2`} />
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {formData.aadharCard ? formData.aadharCard.name : 'Click to upload Aadhaar card'}
                    </p>
                    <input
                      id="aadhar-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('aadharCard', e.target.files?.[0] || null)}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className={themeClasses.primaryText}>Photograph</Label>
                  <div
                    className={`border-2 border-dashed ${theme === 'dark' ? 'border-slate-600 bg-slate-800/30 hover:border-purple-400' : 'border-gray-300 hover:border-purple-400'} rounded-lg p-4 text-center cursor-pointer transition-all duration-300`}
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} mx-auto mb-2`} />
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {formData.photograph ? formData.photograph.name : 'Upload passport size photo'}
                    </p>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('photograph', e.target.files?.[0] || null)}
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Label className={themeClasses.primaryText}>Signature</Label>
                  <div
                    className={`border-2 border-dashed ${theme === 'dark' ? 'border-slate-600 bg-slate-800/30 hover:border-amber-400' : 'border-gray-300 hover:border-amber-400'} rounded-lg p-4 text-center cursor-pointer transition-all duration-300`}
                    onClick={() => document.getElementById('signature-upload')?.click()}
                  >
                    <Upload className={`w-8 h-8 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-500'} mx-auto mb-2`} />
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {formData.signature ? formData.signature.name : 'Upload signature image'}
                    </p>
                    <input
                      id="signature-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('signature', e.target.files?.[0] || null)}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="nomineeRequired"
                  checked={formData.nomineeRequired}
                  onCheckedChange={(checked) => handleInputChange('nomineeRequired', checked)}
                />
                <Label htmlFor="nomineeRequired" className={themeClasses.secondaryText}>Add Nominee (Optional)</Label>
              </div>

              {formData.nomineeRequired && (
                <motion.div 
                  className="grid md:grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <Label htmlFor="nomineeName" className={themeClasses.primaryText}>Nominee Name</Label>
                    <Input 
                      id="nomineeName"
                      value={formData.nomineeName}
                      onChange={(e) => handleInputChange('nomineeName', e.target.value)}
                      placeholder="Enter nominee name"
                      className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomineeRelation" className={themeClasses.primaryText}>Relationship</Label>
                    <Select value={formData.nomineeRelation} onValueChange={(value) => handleInputChange('nomineeRelation', value)}>
                      <SelectTrigger className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white' : ''}`}>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="son">Son</SelectItem>
                        <SelectItem value="daughter">Daughter</SelectItem>
                        <SelectItem value="brother">Brother</SelectItem>
                        <SelectItem value="sister">Sister</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            className="space-y-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="flex items-center space-x-2 mb-6" variants={fadeInUp}>
              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-green-500 to-blue-500'} rounded-full flex items-center justify-center shadow-lg`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${themeClasses.primaryText}`}>Account Security & Terms</h3>
            </motion.div>
            
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <div>
                <Label htmlFor="password" className={themeClasses.primaryText}>Create Password *</Label>
                <Input 
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter strong password"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
                <p className={`text-xs ${themeClasses.mutedText} mt-1`}>
                  Password must be at least 8 characters with uppercase, lowercase, number and special character
                </p>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className={themeClasses.primaryText}>Confirm Password *</Label>
                <Input 
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  className={`mt-1 ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div 
              className={`space-y-4 ${theme === 'dark' ? 'bg-slate-800/30 border border-slate-700' : 'bg-blue-50 border border-blue-200'} p-6 rounded-lg`}
              variants={fadeInUp}
            >
              <h4 className={`font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Lock className="w-5 h-5" />
                <span>Terms and Conditions</span>
              </h4>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                />
                <Label htmlFor="agreeTerms" className={`text-sm ${themeClasses.secondaryText}`}>
                  I agree to the <Link to="/terms" className={`${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'} underline`}>Terms and Conditions</Link> and 
                  <Link to="/privacy" className={`${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'} underline`}> Privacy Policy</Link>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeKYC"
                  checked={formData.agreeKYC}
                  onCheckedChange={(checked) => handleInputChange('agreeKYC', checked)}
                />
                <Label htmlFor="agreeKYC" className={`text-sm ${themeClasses.secondaryText}`}>
                  I consent to video KYC verification and understand that my video call will be recorded for verification purposes
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => handleInputChange('agreeMarketing', checked)}
                />
                <Label htmlFor="agreeMarketing" className={`text-sm ${themeClasses.secondaryText}`}>
                  I agree to receive promotional communications via email and SMS (Optional)
                </Label>
              </div>
            </motion.div>

            <motion.div 
              className={`${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-700/50' : 'bg-green-50 border border-green-200'} rounded-lg p-6`}
              variants={fadeInUp}
            >
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-green-800'} mb-2 flex items-center space-x-2`}>
                <CheckCircle className="w-5 h-5" />
                <span>What happens next?</span>
              </h4>
              <ul className={`text-sm ${theme === 'dark' ? 'text-emerald-200' : 'text-green-700'} space-y-1`}>
                <li>• Your application will be reviewed by our team</li>
                <li>• You'll receive an OTP for verification</li>
                <li>• A video KYC session will be scheduled</li>
                <li>• Account activation within 24-48 hours</li>
              </ul>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
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
              <span className={`text-sm ${themeClasses.secondaryText}`}>Need help?</span>
              <Button variant="outline" size="sm" className={themeClasses.secondaryButton}>Contact Support</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-4 py-8">
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
              Create Your Account
            </Badge>
          </motion.div>
          
          <motion.h1
            className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}
            variants={fadeInUp}
          >
            Join the Future of
            <motion.span
              className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-green-600'} block`}
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              Digital Banking
            </motion.span>
          </motion.h1>
          
          <motion.p
            className={`text-lg ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            variants={fadeInUp}
          >
            Open your VaultX account in minutes and experience banking reimagined with cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-medium ${themeClasses.primaryText}`}>Step {step} of 5</span>
            <span className={`text-sm ${themeClasses.secondaryText}`}>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {stepIcons.map((Icon, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  index + 1 <= step 
                    ? theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : theme === 'dark' ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs ${index + 1 <= step ? themeClasses.primaryText : themeClasses.mutedText}`}>
                  {stepTitles[index]}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className={`w-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-2`}>
            <motion.div 
              className={`${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500'} h-2 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className={`shadow-2xl border-0 ${theme === 'dark' ? 'bg-slate-900/80 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <CardTitle className={`text-2xl ${themeClasses.primaryText} flex items-center justify-center space-x-2`}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} />
                  </motion.div>
                  <span>Open Your Bank Account</span>
                </CardTitle>
              </motion.div>
              <CardDescription className={themeClasses.secondaryText}>
                Fill in the details below to start your banking journey with us
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                <motion.div 
                  className="flex justify-between mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {step > 1 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                        className={themeClasses.secondaryButton}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    </motion.div>
                  )}
                  
                  {step < 5 ? (
                    <motion.div
                      className="ml-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className={`${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'} text-white shadow-lg`}
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="ml-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        className={`${theme === 'dark' ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500' : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'} text-white shadow-lg`}
                        disabled={!formData.agreeTerms || !formData.agreeKYC || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 mr-2"
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerRegister;
