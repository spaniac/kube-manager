import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Provider {
  id: 'keycloak' | 'google' | 'github';
  name: string;
  icon: string;
  color: string;
}

const providers: Provider[] = [
  { id: 'keycloak', name: 'Keycloak', icon: '🔑', color: '#3380cc' },
  { id: 'google', name: 'Google', icon: '🔴', color: '#db4437' },
  { id: 'github', name: 'GitHub', icon: '🐙', color: '#333' },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // If already authenticated, redirect to intended page or dashboard
  if (!isLoading && isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  }

  const handleProviderLogin = async (providerId: Provider['id']) => {
    setError(null);
    setIsLoggingIn(true);

    try {
      // In a real OAuth2 flow, this would redirect to the provider's authorization URL
      // For demo purposes, we'll simulate the flow
      const redirectUri = `${window.location.origin}${location.pathname}`;

      // Generate a fake authorization code (in real app, this comes from OAuth provider)
      const fakeCode = `${providerId}_${Date.now()}`;

      await login({
        provider: providerId,
        code: fakeCode,
        redirectUri,
      });

      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="login-page loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>K8s Manager</h1>
          <p>Sign in to access your Kubernetes dashboard</p>
        </div>

        <div className="login-providers">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="provider-button"
              onClick={() => handleProviderLogin(provider.id)}
              disabled={isLoggingIn}
              style={{ '--provider-color': provider.color } as React.CSSProperties}
              type="button"
            >
              <span className="provider-icon">{provider.icon}</span>
              <span className="provider-name">
                Sign in with {provider.name}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <div className="login-footer">
          <p className="remember-me">
            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
          </p>
          <p className="login-help">
            Need help? Contact your administrator
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-page.loading {
          flex-direction: column;
        }

        .login-container {
          background: white;
          padding: 48px 40px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #333;
        }

        .login-header p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .login-providers {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .provider-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          border: 2px solid var(--provider-color, #333);
          border-radius: 6px;
          background: white;
          color: var(--provider-color, #333);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .provider-button:hover:not(:disabled) {
          background: var(--provider-color, #333);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .provider-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .provider-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .provider-icon {
          font-size: 20px;
        }

        .provider-name {
          flex: 1;
        }

        .login-error {
          padding: 12px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .login-error p {
          margin: 0;
          font-size: 14px;
          color: #b91c1c;
        }

        .login-footer {
          text-align: center;
        }

        .remember-me {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .remember-me label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .login-help {
          font-size: 13px;
          color: #999;
          margin: 0;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
