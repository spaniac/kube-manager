CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP NOT NULL
);

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL
);

CREATE TABLE role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    namespace VARCHAR(255),
    CONSTRAINT uk_role_permissions_role_permission_namespace UNIQUE (role_id, permission_id, namespace)
);

CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    namespace VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT uk_user_roles_user_role_namespace UNIQUE (user_id, role_id, namespace)
);

CREATE TABLE sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_token VARCHAR(500) NOT NULL UNIQUE,
    refresh_token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    last_activity_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(50),
    user_agent VARCHAR(500)
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    resource_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(255),
    user_agent VARCHAR(50) NOT NULL,
    old_values VARCHAR(500),
    new_values VARCHAR(500),
    result VARCHAR(255)
);

CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission_id);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_namespace ON user_roles(namespace);
CREATE INDEX idx_session_user_id ON sessions(user_id);
CREATE INDEX idx_session_refresh_token ON sessions(refresh_token);
CREATE INDEX idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(created_at);
CREATE INDEX idx_audit_resource_type ON audit_logs(resource_type);
