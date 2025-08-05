import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { applicationState } from '@/lib/applicationState';
import { employeeState } from '@/lib/employeeState';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  Users, 
  Video, 
  Camera, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Phone,
  User,
  Calendar,
  AlertCircle,
  Download,
  Upload,
  Search,
  Filter,
  UserCheck,
  RefreshCw
} from 'lucide-react';

const ClerkDashboard = () => {
  const navigate = useNavigate();
  const [currentEmployee, setCurrentEmployee] = useState(employeeState.getCurrentEmployee());
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [documentViewModal, setDocumentViewModal] = useState<{open: boolean; type: string; url: string}>({open: false, type: '', url: ''});
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [kycHistory, setKycHistory] = useState<any[]>([]);

  const [kycSession, setKycSession] = useState({
    customerVerified: false,
    documentsVerified: false,
    livenessCheck: false,
    notes: '',
    capturedImages: []
  });

  useEffect(() => {
    // Check if user is logged in and is a clerk
    const employee = employeeState.getCurrentEmployee();
    if (!employee) {
      navigate('/employee/login');
      return;
    }
    if (employee.role !== 'clerk') {
      navigate('/');
      return;
    }
    setCurrentEmployee(employee);
    loadPendingApplications();
    loadKycHistory();
  }, [navigate]);

  const loadPendingApplications = () => {
    setRefreshing(true);
    // Simulate network delay
    setTimeout(() => {
      const pendingApps = applicationState.getPendingApplications();
      setApplications(pendingApps);
      setRefreshing(false);
    }, 500);
  };

  const loadKycHistory = () => {
    // Load completed KYC verifications
    const allApps = applicationState.getAllApplications();
    const completedKyc = allApps.filter(app =>
      app.kycStatus === 'completed' && app.clerkId === currentEmployee?.employeeId
    );
    setKycHistory(completedKyc);
  };

  const startVideoKYC = (application: any) => {
    setSelectedApplication(application);
    setIsVideoCallActive(true);
    
    // Update application status to in_progress
    applicationState.startVideoKYC(application.id, currentEmployee?.employeeId || 'CLK001');
    loadPendingApplications();
  };

  const endVideoKYC = () => {
    setIsVideoCallActive(false);
    setSelectedApplication(null);
    setCapturedImages([]);
    setKycSession({
      customerVerified: false,
      documentsVerified: false,
      livenessCheck: false,
      notes: '',
      capturedImages: []
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false
      });
      setCameraStream(stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (!cameraStream) {
      alert('Camera not active. Please start camera first.');
      return;
    }

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.srcObject = cameraStream;
    video.autoplay = true;
    video.muted = true;

    video.addEventListener('loadedmetadata', () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Draw current video frame to canvas
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to image data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImages(prev => [...prev, imageDataUrl]);
      setKycSession(prev => ({ ...prev, capturedImages: [...prev.capturedImages, imageDataUrl] }));

      // Store captured photo for customer profile
      if (selectedApplication) {
        localStorage.setItem(`customer_photo_${selectedApplication.id}`, imageDataUrl);
      }

      alert('Photo captured successfully!');

      // Clean up video element
      video.pause();
      video.srcObject = null;
    });

    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
      alert('Error capturing photo. Please try again.');
    });
  };

  const viewDocument = (type: string, application: any) => {
    // Enhanced document URLs with realistic examples
    const documentUrls = {
      panCard: 'https://cdn.builder.io/api/v1/image/assets%2Fdcaf23672af14208a756eb0512378fad%2Fbd917d6087284d768052b28d6ac24473?format=webp&width=600',
      aadharCard: 'https://via.placeholder.com/600x400/f3e5f5/7b1fa2?text=Aadhaar+Card+Document',
      photograph: localStorage.getItem(`customer_photo_${application.id}`) || 'https://images.unsplash.com/photo-1494790108755-2616b332d1bb?w=400&h=400&fit=crop&crop=face',
      signature: 'https://via.placeholder.com/600x200/fff3e0/f57c00?text=Digital+Signature'
    };

    setDocumentViewModal({
      open: true,
      type: type,
      url: documentUrls[type as keyof typeof documentUrls] || '/placeholder.svg'
    });
  };

  const completeKYC = () => {
    if (!selectedApplication) return;

    const notes = `KYC Verification Completed:
- Customer Identity: ${kycSession.customerVerified ? 'Verified' : 'Failed'}
- Documents: ${kycSession.documentsVerified ? 'Verified' : 'Failed'}
- Liveness Check: ${kycSession.livenessCheck ? 'Passed' : 'Failed'}
- Photos Captured: ${capturedImages.length}

Additional Notes: ${kycSession.notes}

Verified by: Clerk ${currentEmployee?.employeeId || 'CLK001'}
Date: ${new Date().toLocaleDateString()}`;

    // Complete KYC in application state
    const success = applicationState.completeKYC(selectedApplication.id, notes);

    if (success) {
      alert('KYC verification completed successfully! Application has been forwarded to manager for approval.');
      stopCamera();
      endVideoKYC();
      loadPendingApplications();
    } else {
      alert('Failed to complete KYC. Please try again.');
    }
  };

  // Cleanup camera when component unmounts or video call ends
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  React.useEffect(() => {
    if (isVideoCallActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isVideoCallActive]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'documents_submitted':
        return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>;
      case 'kyc_in_progress':
        return <Badge className="bg-blue-100 text-blue-800">KYC In Progress</Badge>;
      case 'kyc_completed':
        return <Badge className="bg-green-100 text-green-800">KYC Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getKYCStatusBadge = (kycStatus: string) => {
    switch (kycStatus) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{kycStatus}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">₹</span>
              </div>
              <span className="text-xl font-bold text-gray-900">VaultX Clerk Portal</span>
              <span className="text-gray-600 text-sm">Welcome, {currentEmployee?.firstName} {currentEmployee?.lastName}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadPendingApplications}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600"
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

      {isVideoCallActive ? (
        // Video KYC Interface - EXCLUSIVE TO CLERKS
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Video KYC Session</h2>
                <p className="text-gray-600">
                  Customer: {selectedApplication?.personalInfo.firstName} {selectedApplication?.personalInfo.lastName}
                </p>
                <p className="text-gray-600">Application ID: {selectedApplication?.id}</p>
                <Badge className="bg-blue-100 text-blue-800 mt-2">CLERK EXCLUSIVE FEATURE</Badge>
              </div>
              <Button variant="destructive" onClick={endVideoKYC}>
                End Session
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Video Call Area */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="w-5 h-5" />
                      <span>Live Video Call</span>
                      <Badge className="bg-red-100 text-red-800">LIVE</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      {cameraStream ? (
                        <video
                          ref={(videoRef) => {
                            if (videoRef && cameraStream) {
                              videoRef.srcObject = cameraStream;
                            }
                          }}
                          autoPlay
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-white">
                          <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p className="text-lg font-semibold">Video KYC Session Active</p>
                          <p className="text-sm opacity-75">Camera loading...</p>
                        </div>
                      )}

                      {cameraStream && (
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">LIVE</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Active Call
                      </Button>
                      <Button
                        variant="outline"
                        onClick={capturePhoto}
                        disabled={!cameraStream}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Capture Photo
                      </Button>
                      <Button variant="destructive" onClick={endVideoKYC}>
                        <XCircle className="w-4 h-4 mr-2" />
                        End Call
                      </Button>
                    </div>

                    {capturedImages.length > 0 && (
                      <div className="mt-4">
                        <Label className="text-sm font-medium">Captured Photos ({capturedImages.length})</Label>
                        <div className="flex space-x-2 mt-2 overflow-x-auto">
                          {capturedImages.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Captured ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-80"
                              onClick={() => setDocumentViewModal({open: true, type: `captured-${index}`, url: img})}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Document Verification */}
                <Card>
                  <CardHeader>
                    <CardTitle>Document Verification</CardTitle>
                    <CardDescription>Verify customer documents during video call</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>PAN Card Verification</Label>
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">PAN: {selectedApplication?.identityInfo.panNumber}</p>
                          <div className="flex space-x-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewDocument('panCard', selectedApplication)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Document
                            </Button>
                            <Button size="sm" className="bg-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Aadhaar Card Verification</Label>
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Aadhaar: {selectedApplication?.identityInfo.aadharNumber}</p>
                          <div className="flex space-x-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewDocument('aadharCard', selectedApplication)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Document
                            </Button>
                            <Button size="sm" className="bg-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label>Customer Information Verification</Label>
                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm"><strong>Name:</strong> {selectedApplication?.personalInfo.firstName} {selectedApplication?.personalInfo.lastName}</p>
                          <p className="text-sm"><strong>Email:</strong> {selectedApplication?.contactInfo.email}</p>
                          <p className="text-sm"><strong>Phone:</strong> {selectedApplication?.contactInfo.phone}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm"><strong>DOB:</strong> {selectedApplication?.personalInfo.dateOfBirth}</p>
                          <p className="text-sm"><strong>Gender:</strong> {selectedApplication?.personalInfo.gender}</p>
                          <p className="text-sm"><strong>Occupation:</strong> {selectedApplication?.identityInfo.occupation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* KYC Checklist */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>KYC Verification Checklist</CardTitle>
                    <CardDescription>Complete all verification steps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer Identity Verified</span>
                      <Button 
                        size="sm" 
                        variant={kycSession.customerVerified ? "default" : "outline"}
                        onClick={() => setKycSession(prev => ({ ...prev, customerVerified: !prev.customerVerified }))}
                      >
                        {kycSession.customerVerified ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documents Verified</span>
                      <Button 
                        size="sm" 
                        variant={kycSession.documentsVerified ? "default" : "outline"}
                        onClick={() => setKycSession(prev => ({ ...prev, documentsVerified: !prev.documentsVerified }))}
                      >
                        {kycSession.documentsVerified ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Liveness Check Passed</span>
                      <Button 
                        size="sm" 
                        variant={kycSession.livenessCheck ? "default" : "outline"}
                        onClick={() => setKycSession(prev => ({ ...prev, livenessCheck: !prev.livenessCheck }))}
                      >
                        {kycSession.livenessCheck ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>KYC Notes</Label>
                      <Textarea 
                        placeholder="Add any additional notes or observations..."
                        value={kycSession.notes}
                        onChange={(e) => setKycSession(prev => ({ ...prev, notes: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Verification Guidelines:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Verify customer face matches photo ID</li>
                        <li>• Check document authenticity</li>
                        <li>• Confirm personal details verbally</li>
                        <li>• Test liveness (ask to blink, move head)</li>
                        <li>• Record any discrepancies in notes</li>
                      </ul>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={completeKYC}
                      disabled={!kycSession.customerVerified || !kycSession.documentsVerified || !kycSession.livenessCheck}
                    >
                      Complete KYC & Forward to Manager
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Main Dashboard
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-orange-500 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Pending KYC</p>
                    <h2 className="text-3xl font-bold">{applications.filter(app => app.kycStatus === 'pending').length}</h2>
                    <p className="text-orange-100 text-sm">Applications pending review</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Video KYC Sessions</p>
                    <h2 className="text-3xl font-bold">{applications.filter(app => app.kycStatus === 'in_progress').length}</h2>
                    <p className="text-blue-100 text-sm">In Progress</p>
                  </div>
                  <Video className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Completed Today</p>
                    <h2 className="text-3xl font-bold">{applications.filter(app => app.kycStatus === 'completed').length}</h2>
                    <p className="text-green-100 text-sm">Verifications complete</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="applications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">KYC Applications</TabsTrigger>
              <TabsTrigger value="history">Review History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              {/* Applications Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Pending KYC Applications</span>
                      </CardTitle>
                      <CardDescription>Review and conduct Video KYC for customer applications</CardDescription>
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
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Pending Applications</h3>
                      <p className="text-gray-600">All applications have been processed or none are available for review.</p>
                      <Button variant="outline" className="mt-4" onClick={loadPendingApplications}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Applications
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {app.personalInfo.firstName} {app.personalInfo.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">ID: {app.id}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {getStatusBadge(app.status)}
                              {getKYCStatusBadge(app.kycStatus)}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <Label className="text-xs text-gray-600">Submitted</Label>
                              <p className="text-sm">{app.submittedDate}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Account Type</Label>
                              <p className="text-sm capitalize">{app.accountInfo.accountType}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Documents</Label>
                              <p className="text-sm">
                                {Object.values(app.documents).filter(doc => doc).length}/4 Uploaded
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Email</Label>
                              <p className="text-sm">{app.contactInfo.email}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label className="text-xs text-gray-600">Contact Information</Label>
                              <p className="text-sm">Phone: {app.contactInfo.phone}</p>
                              <p className="text-sm">PAN: {app.identityInfo.panNumber}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Personal Details</Label>
                              <p className="text-sm">DOB: {app.personalInfo.dateOfBirth}</p>
                              <p className="text-sm">Occupation: {app.identityInfo.occupation}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    View Documents
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Customer Documents</DialogTitle>
                                    <DialogDescription>
                                      {app.personalInfo.firstName} {app.personalInfo.lastName} - Application ID: {app.id}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>PAN Card</Label>
                                      <div className="border rounded-lg p-3 text-center bg-blue-50">
                                        <div className="mb-2">
                                          <img
                                            src="https://via.placeholder.com/120x80/e3f2fd/1976d2?text=PAN"
                                            alt="PAN Preview"
                                            className="w-full h-16 object-cover rounded border mx-auto"
                                          />
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">PAN: {app.identityInfo.panNumber}</p>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="w-full"
                                          onClick={() => viewDocument('panCard', app)}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          View Full
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Aadhaar Card</Label>
                                      <div className="border rounded-lg p-3 text-center bg-purple-50">
                                        <div className="mb-2">
                                          <img
                                            src="https://via.placeholder.com/120x80/f3e5f5/7b1fa2?text=Aadhaar"
                                            alt="Aadhaar Preview"
                                            className="w-full h-16 object-cover rounded border mx-auto"
                                          />
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">Aadhaar: {app.identityInfo.aadharNumber}</p>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="w-full"
                                          onClick={() => viewDocument('aadharCard', app)}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          View Full
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Photograph</Label>
                                      <div className="border rounded-lg p-3 text-center bg-green-50">
                                        <div className="mb-2">
                                          <img
                                            src={localStorage.getItem(`customer_photo_${app.id}`) || "https://images.unsplash.com/photo-1494790108755-2616b332d1bb?w=120&h=80&fit=crop&crop=face"}
                                            alt="Customer Photo Preview"
                                            className="w-full h-16 object-cover rounded border mx-auto"
                                          />
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">Customer Photo</p>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="w-full"
                                          onClick={() => viewDocument('photograph', app)}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          View Full
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Signature</Label>
                                      <div className="border rounded-lg p-3 text-center bg-orange-50">
                                        <div className="mb-2">
                                          <img
                                            src="https://via.placeholder.com/120x60/fff3e0/f57c00?text=Signature"
                                            alt="Signature Preview"
                                            className="w-full h-12 object-cover rounded border mx-auto"
                                          />
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">Digital Signature</p>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="w-full"
                                          onClick={() => viewDocument('signature', app)}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          View Full
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                            
                            <div className="flex space-x-2">
                              {app.kycStatus === 'pending' && (
                                <Button 
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => startVideoKYC(app)}
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Start Video KYC
                                </Button>
                              )}
                              {app.kycStatus === 'in_progress' && (
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => startVideoKYC(app)}
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Resume KYC
                                </Button>
                              )}
                              {app.kycStatus === 'completed' && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Forwarded to Manager
                                </Badge>
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
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Review History</CardTitle>
                  <CardDescription>Previously completed KYC verifications by you</CardDescription>
                </CardHeader>
                <CardContent>
                  {kycHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
                      <p className="text-gray-600">Your completed KYC verifications will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {kycHistory.map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {app.personalInfo.firstName} {app.personalInfo.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">ID: {app.id}</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">KYC Completed</Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-gray-600">Verification Date</Label>
                              <p>{app.kycDate}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Account Type</Label>
                              <p className="capitalize">{app.accountInfo.accountType}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Status</Label>
                              <p className="text-green-600 font-medium">Forwarded to Manager</p>
                            </div>
                          </div>

                          {app.clerkNotes && (
                            <div className="mt-3 p-3 bg-white rounded border">
                              <Label className="text-xs text-gray-600">Your Notes:</Label>
                              <p className="text-sm mt-1">{app.clerkNotes.split('\n').slice(0, 3).join(' ')}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Document Viewing Modal */}
      <Dialog open={documentViewModal.open} onOpenChange={(open) => setDocumentViewModal(prev => ({...prev, open}))}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Document Viewer</DialogTitle>
            <DialogDescription>
              {documentViewModal.type.charAt(0).toUpperCase() + documentViewModal.type.slice(1)} Document
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-auto">
            <img
              src={documentViewModal.url}
              alt={documentViewModal.type}
              className="w-full h-auto border rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDocumentViewModal(prev => ({...prev, open: false}))}>
              Close
            </Button>
            <Button onClick={() => alert('Document verified!')}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClerkDashboard;
