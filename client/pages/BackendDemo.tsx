import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackendSelector from '@/components/BackendSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Code, 
  Database, 
  Server,
  Home,
  Coffee,
  Zap,
  Activity
} from 'lucide-react';
import { apiService } from '@shared/apiService';
import { BACKEND_CONFIGS, BackendType, getActiveBackend } from '@shared/backends';

interface TestResult {
  name: string;
  success: boolean;
  data?: any;
  error?: string;
  responseTime?: number;
}

const BackendDemo: React.FC = () => {
  const [activeBackend, setActiveBackend] = useState(() => getActiveBackend());
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  useEffect(() => {
    const handleBackendChange = () => {
      setActiveBackend(getActiveBackend());
      setTestResults([]); // Clear previous results when backend changes
    };

    window.addEventListener('backendChanged', handleBackendChange);
    return () => window.removeEventListener('backendChanged', handleBackendChange);
  }, []);

  const runApiTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);
    const results: TestResult[] = [];

    // Test 1: Ping endpoint
    try {
      const startTime = Date.now();
      const response = await apiService.ping();
      const responseTime = Date.now() - startTime;
      results.push({
        name: 'Ping Test',
        success: true,
        data: response.data,
        responseTime
      });
    } catch (error) {
      results.push({
        name: 'Ping Test',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Demo endpoint
    try {
      const startTime = Date.now();
      const response = await apiService.demo();
      const responseTime = Date.now() - startTime;
      results.push({
        name: 'Demo Endpoint',
        success: true,
        data: response.data,
        responseTime
      });
    } catch (error) {
      results.push({
        name: 'Demo Endpoint',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: Get all customers
    try {
      const startTime = Date.now();
      const response = await apiService.getAllCustomers();
      const responseTime = Date.now() - startTime;
      results.push({
        name: 'Get All Customers',
        success: true,
        data: response.data,
        responseTime
      });
    } catch (error) {
      results.push({
        name: 'Get All Customers',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  const BackendIcon = activeBackend.type === 'springboot' ? Coffee : Zap;
  const passedTests = testResults.filter(r => r.success).length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-blue-600" />
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </motion.div>
                <span className="text-xl font-bold text-gray-900">VaultX</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <BackendSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Code className="w-4 h-4 mr-2" />
            Backend Integration Demo
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VaultX Banking API Demo
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test and compare both Spring Boot and .NET Core backends providing identical banking functionality
          </p>
        </motion.div>

        {/* Current Backend Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8 border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BackendIcon className={`w-6 h-6 ${activeBackend.type === 'springboot' ? 'text-green-600' : 'text-purple-600'}`} />
                <span>Active Backend: {activeBackend.name}</span>
              </CardTitle>
              <CardDescription>{activeBackend.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-gray-500" />
                  <span>Base URL: <code className="bg-gray-100 px-1 rounded">{activeBackend.baseUrl}</code></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span>Port: {activeBackend.port}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span>Type: {activeBackend.type}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Tests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Endpoint Tests</CardTitle>
                  <CardDescription>
                    Test the banking API endpoints to verify backend connectivity and functionality
                  </CardDescription>
                </div>
                <Button 
                  onClick={runApiTests} 
                  disabled={isRunningTests}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
                  <span>{isRunningTests ? 'Running Tests...' : 'Run Tests'}</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {testResults.length > 0 && (
                <div className="mb-6">
                  <Alert className={passedTests === totalTests ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                    <AlertDescription className={passedTests === totalTests ? 'text-green-800' : 'text-yellow-800'}>
                      <strong>Test Results:</strong> {passedTests}/{totalTests} tests passed
                      {passedTests === totalTests && ' �� All tests successful!'}
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <Tabs defaultValue="results" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="results">Test Results</TabsTrigger>
                  <TabsTrigger value="endpoints">Available Endpoints</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="space-y-4">
                  {testResults.length === 0 && !isRunningTests && (
                    <div className="text-center py-8 text-gray-500">
                      Click "Run Tests" to start testing the API endpoints
                    </div>
                  )}

                  {isRunningTests && (
                    <div className="text-center py-8">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                      <p className="text-gray-600">Running API tests...</p>
                    </div>
                  )}

                  {testResults.map((result, index) => (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`border-l-4 ${result.success ? 'border-l-green-500' : 'border-l-red-500'}`}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              {result.success ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                              <span>{result.name}</span>
                            </CardTitle>
                            {result.responseTime && (
                              <Badge variant="secondary">
                                {result.responseTime}ms
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          {result.success ? (
                            <div>
                              <p className="text-sm text-green-600 mb-2">✅ Success</p>
                              {result.data && (
                                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                  {JSON.stringify(result.data, null, 2)}
                                </pre>
                              )}
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-red-600 mb-2">❌ Failed</p>
                              <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                                {result.error}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
                
                <TabsContent value="endpoints" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { method: 'GET', path: '/ping', description: 'Health check endpoint' },
                      { method: 'GET', path: '/demo', description: 'Demo endpoint with backend info' },
                      { method: 'POST', path: '/customers/register', description: 'Register new customer' },
                      { method: 'POST', path: '/customers/login', description: 'Customer login' },
                      { method: 'GET', path: '/customers', description: 'Get all customers' },
                      { method: 'GET', path: '/customers/{id}', description: 'Get customer by ID' },
                      { method: 'POST', path: '/customers/{id}/transactions', description: 'Create transaction' },
                      { method: 'GET', path: '/customers/{id}/transactions', description: 'Get customer transactions' },
                      { method: 'GET', path: '/customers/{id}/balance', description: 'Get customer balance' },
                      { method: 'PUT', path: '/customers/{id}/status', description: 'Update customer status' }
                    ].map((endpoint, index) => (
                      <Card key={index} className="text-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge 
                              variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {activeBackend.baseUrl}{endpoint.path}
                            </code>
                          </div>
                          <p className="text-gray-600">{endpoint.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backend Comparison */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Backend Comparison</CardTitle>
              <CardDescription>Compare features and technologies used in both backend implementations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(BACKEND_CONFIGS).map(([key, config]) => {
                  const Icon = key === 'springboot' ? Coffee : Zap;
                  return (
                    <Card key={key} className="border-2">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Icon className={`w-6 h-6 ${key === 'springboot' ? 'text-green-600' : 'text-purple-600'}`} />
                          <span>{config.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><strong>Technology:</strong> {key === 'springboot' ? 'Java Spring Boot' : '.NET Core'}</p>
                          <p><strong>Database:</strong> {key === 'springboot' ? 'H2 In-Memory' : 'In-Memory'}</p>
                          <p><strong>ORM:</strong> {key === 'springboot' ? 'JPA/Hibernate' : 'Entity Framework'}</p>
                          <p><strong>Port:</strong> {config.port}</p>
                          <p><strong>Documentation:</strong> {key === 'springboot' ? 'Swagger UI' : 'Swagger UI'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="space-x-4">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/customer/register">
              <Button>
                Try Banking App
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BackendDemo;
