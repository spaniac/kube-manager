# Authentication and User Management

## Overview

K8s Manager uses OAuth2/OIDC for authentication with Keycloak as the primary identity provider. The system supports multiple identity providers, session management, and user profile management.

---

## Authentication Flow

### 1. Login Flow

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  Client  │          │ Backend  │          │ Keycloak │
│ (Browser)│          │ (API)    │          │ (IdP)    │
└─────┬────┘          └─────┬────┘          └─────┬────┘
      │                    │                    │
      │ GET /oauth2/authorization/code/keycloak
      │────────────────────>│                    │
      │                    │                    │
      │ Redirect to Keycloak                    │
      │<────────────────────┤                    │
      │                    │                    │
      │ GET keycloak/auth  │                    │
      │───────────────────────────────────────────>│
      │                    │                    │
      │ User enters credentials                │
      │───────────────────────────────────────────>│
      │                    │                    │
      │ Redirect with code │                    │
      │<───────────────────────────────────────────│
      │                    │                    │
      │ GET /oauth2/callback?code=xxx         │
      │────────────────────>│                    │
      │                    │                    │
      │ Exchange code for tokens               │
      │                    │ POST /token        │
      │                    │───────────────────>│
      │                    │                    │
      │ Set session cookie │                    │
      │<────────────────────┤                    │
      │                    │                    │
```

### 2. Token Management

**Access Token:**
- Format: JWT (JSON Web Token)
- Lifetime: 30 minutes (configurable)
- Stored in: HTTP session
- Used for: API authentication

**Refresh Token:**
- Format: JWT
- Lifetime: 30 days (configurable)
- Stored in: HttpOnly cookie
- Used for: Obtaining new access tokens

**Session Cookie:**
- Name: `JSESSIONID`
- Attributes: HttpOnly, Secure, SameSite=Strict
- Lifetime: 30 minutes idle timeout

### 3. Logout Flow

```
1. Client calls POST /auth/logout
2. Backend invalidates session in database
3. Backend redirects to Keycloak logout endpoint
4. Keycloak logs out user
5. Redirect to login page
```

---

## User Management

### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    private Long id;
    private String email;           // OAuth2 subject (unique)
    private String name;            // Display name from IdP
    private String avatarUrl;       // Profile picture from IdP
    private Instant createdAt;
    private Instant lastLoginAt;

    @OneToMany(mappedBy = "user")
    private Set<UserRole> userRoles;

    @OneToMany(mappedBy = "user")
    private Set<Session> sessions;
}
```

### User Profile

**Endpoints:**

#### Get Current User Profile
```http
GET /api/v1/users/profile
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-15T10:00:00Z",
    "lastLoginAt": "2024-02-06T14:30:00Z",
    "roles": ["DEVELOPER", "VIEWER"]
  }
}
```

### Session Management

**Endpoints:**

#### Get User Sessions
```http
GET /api/v1/users/sessions
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0 ...",
      "createdAt": "2024-02-06T14:00:00Z",
      "lastActivityAt": "2024-02-06T14:30:00Z",
      "expiresAt": "2024-02-06T14:30:00Z",
      "active": true
    }
  ]
}
```

#### Revoke Specific Session
```http
DELETE /api/v1/users/sessions/{sessionId}
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "Session revoked successfully"
}
```

#### Revoke All Other Sessions
```http
DELETE /api/v1/users/sessions/revoke-all
Authorization: Bearer <access_token>
```

Response:
```json
{
  "success": true,
  "message": "All other sessions revoked successfully"
}
```

---

## Authentication Features

### Remember Me

**Description:** Allows users to stay logged in across browser sessions.

**Implementation:**
- Checkbox on login page (enabled by default)
- When checked, refresh token stored in persistent cookie (30 days)
- When unchecked, refresh token stored in session cookie (browser close clears)

**Configuration:**
```properties
# application.properties
auth.remember-me.enabled=true
auth.remember-me.token-validity-days=30
```

### Multiple Identity Providers

**Supported Providers:**
- Keycloak (primary)
- Google (via Keycloak social login)
- GitHub (via Keycloak social login)
- Any OIDC-compliant provider

**Provider Selection:**
- Login page shows all configured providers as buttons
- User selects provider before authentication
- Provider configuration stored in Keycloak

### Multi-Factor Authentication (MFA)

**Description:** Adds extra security layer with second authentication factor.

**Implementation:**
- Configured in Keycloak (not in K8s Manager)
- Supported MFA methods:
  - TOTP (Time-based One-Time Password)
  - SMS verification
  - Email verification
- MFA required per policy in Keycloak

### Password Management (Local Accounts)

**For non-OAuth2 local accounts:**

#### Change Password
```http
POST /api/v1/users/password/change
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

Response:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Request Password Reset
```http
POST /api/v1/users/password/reset
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Complete Password Reset
```http
POST /api/v1/users/password/reset/{token}
Content-Type: application/json

{
  "newPassword": "newPassword456"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## Session Security

### Concurrent Session Limits

**Configuration:**
```properties
auth.sessions.max-concurrent-per-user=5
```

**Behavior:**
- When limit reached, oldest inactive session revoked
- Active sessions (last activity < 5 minutes) never revoked
- Terminal sessions limited separately: 5 concurrent terminal sessions

### Session Timeout

**Configuration:**
```properties
auth.sessions.timeout-minutes=30
auth.sessions.idle-timeout-minutes=30
```

**Behavior:**
- After 30 minutes of inactivity, session marked as expired
- Expired sessions cleaned up automatically
- User redirected to login page

### IP Address Tracking

**Recorded for each session:**
- Client IP address
- User agent string
- Login timestamp
- Last activity timestamp

**Used for:**
- Security monitoring
- Detecting suspicious login attempts
- Audit logging

---

## OAuth2 Configuration

### Spring Security Configuration

```java
@Configuration
@EnableOAuth2Client
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .authorizationEndpoint(auth -> auth
                    .baseUri("/oauth2/authorization"))
                .redirectionEndpoint(redirect -> redirect
                    .baseUri("/oauth2/callback"))
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(5)
                .expiredUrl("/login?expired=true"))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/login", "/oauth2/**").permitAll()
                .anyRequest().authenticated());
    }
}
```

### Keycloak Configuration

```properties
# application.properties
spring.security.oauth2.client.registration.keycloak.client-id=k8s-manager
spring.security.oauth2.client.registration.keycloak.client-secret=${KEYCLOAK_CLIENT_SECRET}
spring.security.oauth2.client.registration.keycloak.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.keycloak.redirect-uri={baseUrl}/oauth2/callback/{registrationId}

spring.security.oauth2.client.provider.keycloak.issuer-uri=${KEYCLOAK_ISSUER_URI}
spring.security.oauth2.client.provider.keycloak.token-uri=${KEYCLOAK_ISSUER_URI}/protocol/openid-connect/token
spring.security.oauth2.client.provider.keycloak.authorization-uri=${KEYCLOAK_ISSUER_URI}/protocol/openid-connect/auth
spring.security.oauth2.client.provider.keycloak.user-info-uri=${KEYCLOAK_ISSUER_URI}/protocol/openid-connect/userinfo
spring.security.oauth2.client.provider.keycloak.jwk-set-uri=${KEYCLOAK_ISSUER_URI}/protocol/openid-connect/certs
```

---

## JWT Token Structure

### Access Token Payload

```json
{
  "sub": "user@example.com",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://example.com/avatar.jpg",
  "roles": ["DEVELOPER", "VIEWER"],
  "iat": 1707245600,
  "exp": 1707247400
}
```

**Fields:**
- `sub`: Subject (user email)
- `email`: User email
- `name`: Display name
- `picture`: Avatar URL
- `roles`: User's role names (resolved from database)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

---

## Security Best Practices

### 1. Token Storage
- Access token: Never stored in localStorage (XSS vulnerability)
- Refresh token: Stored in HttpOnly cookie (prevents XSS)
- CSRF protection: Enabled for state-changing operations

### 2. HTTPS Required
- All authentication flows require HTTPS in production
- Secure flag set on all cookies
- HSTS headers configured

### 3. Session Management
- Sessions invalidated on password change
- Sessions revoked on user deletion
- Session ID regenerated on login (session fixation prevention)

### 4. Rate Limiting
- Login attempts: 5 per minute per IP
- Password reset: 3 per hour per email
- Token refresh: 10 per minute per user

---

## Error Handling

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTH_INVALID_TOKEN` | 401 | Access token is invalid or expired |
| `AUTH_MISSING_TOKEN` | 401 | Authorization header missing |
| `AUTH_SESSION_EXPIRED` | 401 | Session has expired due to inactivity |
| `AUTH_CONCURRENT_LIMIT` | 429 | Maximum concurrent sessions reached |
| `AUTH_INVALID_CREDENTIALS` | 401 | Invalid username or password |
| `AUTH_PASSWORD_MISMATCH` | 400 | Current password does not match |
| `AUTH_PASSWORD_WEAK` | 400 | New password does not meet requirements |
| `AUTH_RESET_TOKEN_INVALID` | 400 | Password reset token is invalid or expired |
| `AUTH_USER_NOT_FOUND` | 404 | User does not exist |

---

## Audit Logging

All authentication events are logged:

**Logged Events:**
- `LOGIN` - Successful login
- `LOGOUT` - User logout
- `LOGIN_FAILED` - Failed login attempt
- `PASSWORD_CHANGED` - Password changed
- `PASSWORD_RESET_REQUESTED` - Password reset requested
- `PASSWORD_RESET_COMPLETED` - Password reset completed
- `SESSION_REVOKED` - Session revoked

**Audit Log Entry:**
```json
{
  "id": 12345,
  "userId": 1,
  "action": "LOGIN",
  "resourceType": "USER",
  "resourceId": "user@example.com",
  "result": "SUCCESS",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0 ...",
  "createdAt": "2024-02-06T14:30:00Z"
}
```

---

## API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /oauth2/authorization/{provider} | Initiate OAuth2 login | No |
| GET | /oauth2/callback/{provider} | OAuth2 callback | No |
| POST | /oauth2/logout | Logout user | Yes |
| POST | /users/password/change | Change password | Yes |
| POST | /users/password/reset | Request password reset | No |
| POST | /users/password/reset/{token} | Complete password reset | No |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /users/profile | Get current user profile | Yes |
| GET | /users/sessions | Get user sessions | Yes |
| DELETE | /users/sessions/{id} | Revoke specific session | Yes |
| DELETE | /users/sessions/revoke-all | Revoke all other sessions | Yes |

---

## Testing

### Integration Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLoginFlow() throws Exception {
        // Initiate OAuth2 login
        mockMvc.perform(get("/oauth2/authorization/keycloak"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrlPattern("https://keycloak.example.com/**"));
    }

    @Test
    public void testGetUserProfile() throws Exception {
        mockMvc.perform(get("/api/v1/users/profile")
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.email").value("user@example.com"));
    }
}
```

---

## Configuration Examples

### Production Configuration

```properties
# OAuth2 Providers
spring.security.oauth2.client.registration.keycloak.client-id=k8s-manager
spring.security.oauth2.client.registration.keycloak.client-secret=${KEYCLOAK_CLIENT_SECRET}
spring.security.oauth2.client.provider.keycloak.issuer-uri=${KEYCLOAK_ISSUER_URI}

# Session Management
auth.sessions.max-concurrent-per-user=5
auth.sessions.timeout-minutes=30
auth.sessions.idle-timeout-minutes=30

# Remember Me
auth.remember-me.enabled=true
auth.remember-me.token-validity-days=30

# Rate Limiting
auth.rate-limit.login.attempts-per-minute=5
auth.rate-limit.password-reset.attempts-per-hour=3
auth.rate-limit.token-refresh.attempts-per-minute=10
```

---

## Troubleshooting

### Common Issues

#### Issue: "Invalid token" error
**Cause:** Access token expired or malformed
**Solution:**
- Check if access token is still valid
- Refresh token using refresh token in cookie
- Re-authenticate if refresh token is also expired

#### Issue: "Maximum concurrent sessions reached"
**Cause:** User has 5 active sessions
**Solution:**
- Revoke old sessions in Profile > Sessions
- Or wait for sessions to expire (30 minutes idle timeout)

#### Issue: Password reset email not received
**Cause:**
- Email address incorrect
- Email provider blocking
- SMTP misconfiguration
**Solution:**
- Verify email address
- Check spam folder
- Check SMTP server logs

---

## Future Enhancements

- [ ] Support for SAML authentication
- [ ] WebAuthn/FIDO2 hardware key authentication
- [ ] Certificate-based authentication for service accounts
- [ ] Adaptive authentication (risk-based MFA)
- [ ] Biometric authentication (mobile app)
- [ ] Single Sign-Out (SSO logout across all applications)
