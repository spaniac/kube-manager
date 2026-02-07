-- K8s Manager Database Initialization Script
-- This script creates all tables based on DATABASE.md schema specification

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL
);

-- Create role_permissions join table
CREATE TABLE IF NOT EXISTS role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    namespace VARCHAR(255),
    UNIQUE (role_id, permission_id, namespace)
);

-- Create user_roles join table
CREATE TABLE IF NOT EXISTS user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    namespace VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, role_id, namespace)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_token VARCHAR(500) UNIQUE NOT NULL,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    last_activity_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ip_address VARCHAR(50),
    user_agent VARCHAR(500)
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(255),
    old_values VARCHAR(500),
    new_values VARCHAR(500),
    result VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ip_address VARCHAR(255),
    user_agent VARCHAR(500)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_permissions_type ON permissions(type);
CREATE INDEX IF NOT EXISTS idx_permissions_resource_type ON permissions(resource_type);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_namespace ON user_roles(namespace);
CREATE INDEX IF NOT EXISTS idx_session_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_session_refresh_token ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS idx_session_access_token ON sessions(access_token);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_resource_type ON audit_logs(resource_type);

-- Insert default roles
INSERT INTO roles (name, description)
VALUES
    ('ADMIN', 'Full cluster access'),
    ('DEVELOPER', 'Namespace access with read/write'),
    ('VIEWER', 'Read-only access')
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (type, resource_type)
VALUES
    ('READ', 'POD'),
    ('WRITE', 'POD'),
    ('DELETE', 'POD'),
    ('EXEC', 'POD'),
    ('READ', 'DEPLOYMENT'),
    ('WRITE', 'DEPLOYMENT'),
    ('DELETE', 'DEPLOYMENT'),
    ('READ', 'STATEFULSET'),
    ('WRITE', 'STATEFULSET'),
    ('DELETE', 'STATEFULSET'),
    ('READ', 'DAEMONSET'),
    ('WRITE', 'DAEMONSET'),
    ('DELETE', 'DAEMONSET'),
    ('READ', 'SERVICE'),
    ('WRITE', 'SERVICE'),
    ('DELETE', 'SERVICE'),
    ('READ', 'CONFIGMAP'),
    ('WRITE', 'CONFIGMAP'),
    ('DELETE', 'CONFIGMAP'),
    ('READ', 'SECRET'),
    ('WRITE', 'SECRET'),
    ('DELETE', 'SECRET'),
    ('READ', 'NAMESPACE'),
    ('WRITE', 'NAMESPACE'),
    ('DELETE', 'NAMESPACE'),
    ('ALL', 'ALL')
ON CONFLICT DO NOTHING;

-- Grant admin role all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'ADMIN'
ON CONFLICT (role_id, permission_id, namespace) DO NOTHING;

-- Insert initial admin user (loginable via OAuth2)
INSERT INTO users (email, name, created_at)
VALUES ('admin@k8smanager.local', 'Administrator', NOW())
ON CONFLICT (email) DO NOTHING;