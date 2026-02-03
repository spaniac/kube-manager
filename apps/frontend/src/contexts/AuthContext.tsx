import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, LoginCredentials, TokenResponse } from '../types/auth';
import apiClient from '../api/client';
import { useQueryClient } from '@tanstack/react-query';

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasPermission: (
    resourceType: string,
    permission: string,
    namespace?: string,
  ) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });

    queryClient.clear();
  };

  const refreshAccessToken = async (): Promise<void> => {
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (!storedRefreshToken) {
      logout();
      return;
    }

    try {
      const response = await apiClient.post<TokenResponse>('/auth/refresh', {
        refreshToken: storedRefreshToken,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Fetch user data separately or include in token response
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) as User : null;

      setAuthState({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      logout();
      throw error;
    }
  };

  const hasPermission = (
    resourceType: string,
    permission: string,
    namespace?: string,
  ): boolean => {
    if (!authState.user) {
      return false;
    }

    if (authState.user.roles.includes('ADMIN')) {
      return true;
    }

    const permissionSet = authState.user.permissions.find(
      (p) => p.resourceType === resourceType,
    );

    if (!permissionSet) {
      return false;
    }

    if (!permissionSet.permissions.includes(permission as any)) {
      return false;
    }

    if (namespace && permissionSet.namespaces) {
      return permissionSet.namespaces.includes(namespace);
    }

    return true;
  };

  const value: AuthContextType = {
    ...authState,
    login: async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
        const { access_token, refresh_token } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // Fetch user data separately after login
        // For now, store a minimal user object
        const user: User = {
          id: 'temp',
          email: credentials.code || 'unknown',
          name: credentials.code || 'unknown',
          roles: ['VIEWER'],
          permissions: [],
        };

        localStorage.setItem('user', JSON.stringify(user));

        setAuthState({
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    logout,
    refreshToken: refreshAccessToken,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
