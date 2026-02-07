/**
 * Test user fixtures for E2E tests
 */

export const testUsers = {
  admin: {
    username: 'admin@k8smanager.local',
    password: 'admin123',
    role: 'admin',
    description: 'Admin user with full permissions',
  },
  developer: {
    username: 'developer@k8smanager.local',
    password: 'dev123',
    role: 'developer',
    description: 'Developer with namespace-scoped permissions',
  },
  readonly: {
    username: 'readonly@k8smanager.local',
    password: 'readonly123',
    role: 'readonly',
    description: 'Read-only user for testing access control',
  },
};

export const getTestUser = (role: keyof typeof testUsers) => testUsers[role];

/**
 * Expected URL paths based on user roles
 */
export const expectedPaths = {
  admin: ['/dashboards', '/admin/roles', '/cluster'],
  developer: ['/dashboards', '/namespaces', '/pods', '/deployments'],
  readonly: ['/namespaces', '/pods', '/deployments'],
};
