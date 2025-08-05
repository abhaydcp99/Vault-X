/**
 * Backend Configuration for VaultX Banking System
 * Supports both Spring Boot and .NET Core backends
 */

export interface BackendConfig {
  name: string;
  baseUrl: string;
  type: 'springboot' | 'dotnet';
  port: number;
  description: string;
}

export const BACKEND_CONFIGS: Record<string, BackendConfig> = {
  springboot: {
    name: 'Spring Boot',
    baseUrl: 'http://localhost:8081/api',
    type: 'springboot',
    port: 8081,
    description: 'Java Spring Boot backend with JPA and H2 database'
  },
  dotnet: {
    name: '.NET Core',
    baseUrl: 'http://localhost:5001/api',
    type: 'dotnet',
    port: 5001,
    description: '.NET Core backend with Entity Framework and In-Memory database'
  }
};

export type BackendType = keyof typeof BACKEND_CONFIGS;

// Default backend - can be changed via environment variable or UI
export const DEFAULT_BACKEND: BackendType = 'springboot';

export function getActiveBackend(): BackendConfig {
  const selectedBackend = localStorage.getItem('selectedBackend') as BackendType || DEFAULT_BACKEND;
  return BACKEND_CONFIGS[selectedBackend];
}

export function setActiveBackend(backend: BackendType): void {
  localStorage.setItem('selectedBackend', backend);
  // Trigger a custom event to notify components of backend change
  window.dispatchEvent(new CustomEvent('backendChanged', { detail: backend }));
}

export function isBackendAvailable(backend: BackendType): Promise<boolean> {
  const config = BACKEND_CONFIGS[backend];
  return fetch(`${config.baseUrl}/ping`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.ok)
    .catch(() => false);
}

export async function getAvailableBackends(): Promise<BackendType[]> {
  const availableBackends: BackendType[] = [];
  
  for (const [key, config] of Object.entries(BACKEND_CONFIGS)) {
    const isAvailable = await isBackendAvailable(key as BackendType);
    if (isAvailable) {
      availableBackends.push(key as BackendType);
    }
  }
  
  return availableBackends;
}
