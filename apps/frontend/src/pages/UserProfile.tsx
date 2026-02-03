import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '@api/client';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const response = await apiClient.get<UserProfile>('/auth/profile');
      setProfile(response.data);
      setFormData({ name: response.data.name });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load profile' });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await apiClient.put('/auth/profile', { name: formData.name });
      setProfile((prev) => prev ? { ...prev, name: formData.name } : null);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '#dc2626';
      case 'DEVELOPER':
        return '#2563eb';
      case 'VIEWER':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  if (!user || !profile) {
    return (
      <div className="user-profile loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <div className="avatar-placeholder">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="profile-info">
          <h1>{profile.name}</h1>
          <p className="profile-email">{profile.email}</p>

          <div className="profile-roles">
            {user.roles.map((role) => (
              <span
                key={role}
                className="role-badge"
                style={{ backgroundColor: getRoleBadgeColor(role) }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>User ID</label>
              <span>{profile.id}</span>
            </div>
            <div className="info-item">
              <label>Email</label>
              <span>{profile.email}</span>
            </div>
            <div className="info-item">
              <label>Account Created</label>
              <span>{formatDate(profile.createdAt)}</span>
            </div>
            <div className="info-item">
              <label>Last Login</label>
              <span>{formatDate(profile.lastLoginAt)}</span>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="section-header">
            <h2>Display Name</h2>
            {!isEditing && (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
                type="button"
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="edit-form">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                placeholder="Display Name"
                required
                disabled={isLoading}
              />
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="save-button"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          ) : (
            <p className="display-name">{profile.name}</p>
          )}
        </section>

        <section className="profile-section">
          <h2>Permissions</h2>
          <div className="permissions-list">
            {user.permissions.map((permissionSet, index) => (
              <div key={index} className="permission-group">
                <h3>{permissionSet.resourceType}</h3>
                <div className="permission-actions">
                  {permissionSet.permissions.map((perm) => (
                    <span key={perm} className="permission-tag">
                      {perm}
                    </span>
                  ))}
                </div>
                {permissionSet.namespaces && (
                  <div className="permission-namespaces">
                    <strong>Namespaces:</strong>{' '}
                    {permissionSet.namespaces.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section danger-zone">
          <h2>Danger Zone</h2>
          <p className="danger-warning">
            These actions are irreversible. Please be certain.
          </p>
          <button
            onClick={handleLogout}
            className="logout-button"
            type="button"
          >
            Log Out
          </button>
        </section>
      </div>

      {message && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <style>{`
        .user-profile {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px;
        }

        .user-profile.loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #e5e7eb;
          flex-shrink: 0;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: 700;
          color: #6b7280;
          background: #f3f4f6;
        }

        .profile-info {
          flex: 1;
        }

        .profile-info h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #111827;
        }

        .profile-email {
          font-size: 15px;
          color: #6b7280;
          margin: 0 0 12px 0;
        }

        .profile-roles {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .role-badge {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .profile-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-item label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-item span {
          font-size: 15px;
          color: #111827;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .edit-button {
          padding: 6px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .edit-button:hover {
          background: #2563eb;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .edit-form input {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
        }

        .edit-form input:disabled {
          background: #f9fafb;
          cursor: not-allowed;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-button,
        .save-button {
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .cancel-button {
          background: #e5e7eb;
          color: #374151;
        }

        .cancel-button:hover:not(:disabled) {
          background: #d1d5db;
        }

        .save-button {
          background: #3b82f6;
          color: white;
        }

        .save-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .cancel-button:disabled,
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .display-name {
          font-size: 15px;
          color: #374151;
        }

        .permissions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .permission-group {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .permission-group h3 {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #111827;
        }

        .permission-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .permission-tag {
          padding: 4px 10px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
        }

        .permission-namespaces {
          font-size: 13px;
          color: #6b7280;
        }

        .danger-zone {
          border: 2px solid #fecaca;
        }

        .danger-warning {
          color: #dc2626;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .logout-button {
          width: 100%;
          padding: 12px 20px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-button:hover {
          background: #b91c1c;
        }

        .message {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-size: 14px;
          font-weight: 500;
          z-index: 1000;
        }

        .message-success {
          background: #10b981;
          color: white;
        }

        .message-error {
          background: #ef4444;
          color: white;
        }
      `}</style>
    </div>
  );
}
