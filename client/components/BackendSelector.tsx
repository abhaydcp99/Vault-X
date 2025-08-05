import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Server, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Settings,
  Database,
  Coffee,
  Zap
} from 'lucide-react';
import { 
  BACKEND_CONFIGS, 
  BackendType, 
  getActiveBackend, 
  setActiveBackend, 
  isBackendAvailable, 
  getAvailableBackends 
} from '@shared/backends';

interface BackendStatus {
  backend: BackendType;
  available: boolean;
  responseTime?: number;
}

const BackendSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBackend, setCurrentBackend] = useState<BackendType>(() => {
    const active = getActiveBackend();
    return Object.keys(BACKEND_CONFIGS).find(key => BACKEND_CONFIGS[key as BackendType].baseUrl === active.baseUrl) as BackendType || 'springboot';
  });
  const [backendStatuses, setBackendStatuses] = useState<BackendStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkBackendStatuses = async () => {
    setIsChecking(true);
    const statuses: BackendStatus[] = [];

    for (const [key, config] of Object.entries(BACKEND_CONFIGS)) {
      const startTime = Date.now();
      try {
        const available = await isBackendAvailable(key as BackendType);
        const responseTime = Date.now() - startTime;
        statuses.push({
          backend: key as BackendType,
          available,
          responseTime: available ? responseTime : undefined
        });
      } catch (error) {
        statuses.push({
          backend: key as BackendType,
          available: false
        });
      }
    }

    setBackendStatuses(statuses);
    setIsChecking(false);
  };

  useEffect(() => {
    checkBackendStatuses();
    
    // Listen for backend changes
    const handleBackendChange = (event: CustomEvent) => {
      setCurrentBackend(event.detail);
    };

    window.addEventListener('backendChanged', handleBackendChange as EventListener);
    return () => {
      window.removeEventListener('backendChanged', handleBackendChange as EventListener);
    };
  }, []);

  const handleBackendSwitch = (backend: BackendType) => {
    const status = backendStatuses.find(s => s.backend === backend);
    if (!status?.available) {
      alert(`${BACKEND_CONFIGS[backend].name} backend is not available. Please start the server first.`);
      return;
    }

    setActiveBackend(backend);
    setCurrentBackend(backend);
    setIsOpen(false);
    
    // Show success message
    const config = BACKEND_CONFIGS[backend];
    alert(`Switched to ${config.name} backend successfully!\n\nAPI: ${config.baseUrl}\nPort: ${config.port}`);
  };

  const getBackendIcon = (backend: BackendType) => {
    return backend === 'springboot' ? Coffee : Zap;
  };

  const activeConfig = BACKEND_CONFIGS[currentBackend];
  const currentStatus = backendStatuses.find(s => s.backend === currentBackend);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Server className="w-4 h-4" />
          <span>{activeConfig.name}</span>
          {currentStatus?.available ? (
            <CheckCircle className="w-3 h-3 text-green-500" />
          ) : (
            <XCircle className="w-3 h-3 text-red-500" />
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Backend Configuration</span>
          </DialogTitle>
          <DialogDescription>
            Choose between Spring Boot and .NET Core backends. Both provide the same banking API functionality.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Backend Status */}
          <Alert className={currentStatus?.available ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <div className="flex items-center space-x-2">
              {currentStatus?.available ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <AlertDescription className={currentStatus?.available ? 'text-green-800' : 'text-red-800'}>
                <strong>Current:</strong> {activeConfig.name} backend is {currentStatus?.available ? 'running' : 'not available'}
                {currentStatus?.responseTime && ` (${currentStatus.responseTime}ms response time)`}
              </AlertDescription>
            </div>
          </Alert>

          {/* Backend Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(BACKEND_CONFIGS).map(([key, config]) => {
              const backend = key as BackendType;
              const status = backendStatuses.find(s => s.backend === backend);
              const Icon = getBackendIcon(backend);
              const isActive = backend === currentBackend;

              return (
                <Card 
                  key={backend} 
                  className={`cursor-pointer transition-all border-2 ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : status?.available 
                        ? 'border-green-200 hover:border-green-400' 
                        : 'border-gray-200 opacity-60'
                  }`}
                  onClick={() => handleBackendSwitch(backend)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-6 h-6 ${backend === 'springboot' ? 'text-green-600' : 'text-purple-600'}`} />
                        <CardTitle className="text-lg">{config.name}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isActive && <Badge variant="default">Active</Badge>}
                        {status?.available ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                    <CardDescription>{config.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-gray-500" />
                        <span>Port: {config.port}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Server className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-xs">{config.baseUrl}</span>
                      </div>
                      {status?.responseTime && (
                        <div className="text-green-600 text-xs">
                          Response time: {status.responseTime}ms
                        </div>
                      )}
                    </div>

                    {status?.available && !isActive && (
                      <Button 
                        className="w-full mt-3" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBackendSwitch(backend);
                        }}
                      >
                        Switch to {config.name}
                      </Button>
                    )}

                    {!status?.available && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        Server not running. Start with: <code>cd backend-{backend} && ./start.sh</code>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center pt-4">
            <Button 
              variant="outline" 
              onClick={checkBackendStatuses} 
              disabled={isChecking}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </Button>
          </div>

          {/* Instructions */}
          <Alert>
            <AlertDescription className="text-sm">
              <strong>To start backends:</strong><br />
              • Spring Boot: <code>cd backend-springboot && ./start.sh</code><br />
              • .NET Core: <code>cd backend-dotnet && ./start.sh</code><br />
              Both backends provide identical functionality and can run simultaneously on different ports.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BackendSelector;
