import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronLeft, Users, UserCheck, Crown, Briefcase, Mail, Phone, MapPin, Calendar, Building, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Professional Information
    employeeId: '',
    role: '',
    department: '',
    designation: '',
    joiningDate: '',
    reportingManager: '',
    workLocation: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Security
    password: '',
    confirmPassword: '',
    
    // Additional Details
    emergencyContact: '',
    emergencyPhone: '',
    qualifications: '',
    experience: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
      if (!formData.role) newErrors.role = 'Role is required';
      if (!formData.department.trim()) newErrors.department = 'Department is required';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
      if (!formData.workLocation.trim()) newErrors.workLocation = 'Work location is required';
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    }

    if (step === 4) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      setIsLoading(true);
      
      // Simulate API call for registration
      setTimeout(() => {
        setIsLoading(false);
        setRegistrationComplete(true);
        
        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/employee/login');
        }, 3000);
      }, 2000);
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

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-banking-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-banking-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-banking-900">Registration Successful!</CardTitle>
            <CardDescription>
              Your employee account has been created successfully. You will be redirected to login page shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Employee ID:</strong> {formData.employeeId}<br />
                <strong>Email:</strong> {formData.email}<br />
                Please save these credentials for login.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate('/employee/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-banking-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-banking-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChevronLeft className="w-5 h-5 text-banking-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-banking-500 to-banking-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-banking-900">VaultX</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-banking-600">Already have account?</span>
              <Link to="/employee/login">
                <Button variant="outline" size="sm">Employee Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <Card className="w-full max-w-2xl shadow-lg border-banking-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-banking-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {getRoleIcon(formData.role)}
            </div>
            <CardTitle className="text-2xl text-banking-900">Employee Registration</CardTitle>
            <CardDescription>
              Join VaultX team - Complete your employee registration
            </CardDescription>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-banking-600 text-white' 
                      : 'bg-banking-200 text-banking-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-banking-600' : 'bg-banking-200'}`} />}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4 mt-2 text-xs text-banking-600">
              <span className={currentStep === 1 ? 'font-medium' : ''}>Personal</span>
              <span className={currentStep === 2 ? 'font-medium' : ''}>Professional</span>
              <span className={currentStep === 3 ? 'font-medium' : ''}>Address</span>
              <span className={currentStep === 4 ? 'font-medium' : ''}>Security</span>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-banking-900 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-banking-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      placeholder="e.g., CLK001, MNG001, ADM001"
                    />
                    {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
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
                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="e.g., Operations, Customer Service"
                    />
                    {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="e.g., Senior Clerk, Branch Manager"
                    />
                    {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Joining Date *</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    />
                    {errors.joiningDate && <p className="text-sm text-red-500">{errors.joiningDate}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reportingManager">Reporting Manager</Label>
                    <Input
                      id="reportingManager"
                      value={formData.reportingManager}
                      onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                      placeholder="Enter reporting manager name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="workLocation">Work Location *</Label>
                    <Input
                      id="workLocation"
                      value={formData.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      placeholder="e.g., Mumbai Main Branch, Delhi Office"
                    />
                    {errors.workLocation && <p className="text-sm text-red-500">{errors.workLocation}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-banking-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Address Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                      {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state"
                      />
                      {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter pincode"
                      />
                      {errors.pincode && <p className="text-sm text-red-500">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Security & Additional Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-banking-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security & Additional Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact person"
                    />
                    {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      placeholder="Emergency contact number"
                    />
                    {errors.emergencyPhone && <p className="text-sm text-red-500">{errors.emergencyPhone}</p>}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="qualifications">Educational Qualifications</Label>
                    <Textarea
                      id="qualifications"
                      value={formData.qualifications}
                      onChange={(e) => handleInputChange('qualifications', e.target.value)}
                      placeholder="Enter your educational background"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="experience">Previous Work Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Enter your previous work experience"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeRegister;
