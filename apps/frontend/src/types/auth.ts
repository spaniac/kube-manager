export type Role = 'ADMIN' | 'DEVELOPER' | 'VIEWER';

export type Permission =
  | 'READ'
  | 'WRITE'
  | 'DELETE'
  | 'EXEC'
  | 'LOGS';

export type ResourceType =
  | 'POD'
  | 'DEPLOYMENT'
  | 'SERVICE'
  | 'STATEFULSET'
  | 'DAEMONSET'
  | 'CONFIGMAP'
  | 'SECRET'
  | 'NAMESPACE';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: Role[];
  permissions: {
    resourceType: ResourceType;
    permissions: Permission[];
    namespaces?: string[];
  }[];
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  provider: 'keycloak' | 'google' | 'github';
  code?: string;
  redirectUri?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}
