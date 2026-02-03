# Contributing to K8s Manager

Thank you for your interest in contributing to K8s Manager! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [Issue Reporting](#issue-reporting)

## Code of Conduct

Be respectful, constructive, and inclusive. Treat all contributors with courtesy and professionalism.

## Getting Started

### Prerequisites

- **Java 21** for backend development
- **Node.js 18+** for frontend development
- **Docker** for local testing
- **kubectl** for Kubernetes testing
- **Git** for version control

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/kube-manager.git
cd kube-manager

# Backend setup
cd apps/backend
./gradlew build
./gradlew bootRun &

# Frontend setup (new terminal)
cd apps/frontend
npm install
npm run dev
```

### IDE Setup

**Backend (IntelliJ IDEA)**:
1. Install Checkstyle and SpotBugs plugins
2. Import project as Gradle project
3. Enable "Save Actions" plugin

**Frontend (VS Code)**:
1. Install ESLint, Prettier extensions
2. Set default formatter to Prettier
3. Enable ESLint on save

## Development Workflow

### Branching Strategy

```
main
  ├─ feature/user-management
  ├─ fix/login-bug
  ├─ refactor/api-layer
  └─ hotfix/security-patch
```

### Creating a Branch

```bash
# Sync main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples**:
```
feat(auth): add OAuth2 integration with Keycloak

fix(backend): resolve memory leak in metrics service

docs(readme): update deployment instructions

refactor(frontend): extract common table component
```

## Coding Standards

### Backend (Java)

**Style Guide**: Google Java Style

```java
// Good
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(CreateUserRequest request) {
        // Implementation
    }
}

// Bad
public class UserService {
    private UserRepository uRepo; // Non-descriptive name
    public UserService(UserRepository uRepo) { this.uRepo = uRepo; }
    public User createUser(CreateUserRequest r) { /* No documentation */ }
}
```

**Best Practices**:
- Use dependency injection over static methods
- Prefer immutability (records, final fields)
- Include JavaDoc for public APIs
- Handle exceptions properly
- Use proper logging levels (DEBUG, INFO, WARN, ERROR)

**Testing**:
- Write unit tests for all public methods
- Use JUnit 5 and Mockito
- Aim for >80% code coverage

### Frontend (TypeScript)

**Style Guide**: Google TypeScript Style

```typescript
// Good
interface User {
    id: string;
    name: string;
    email: string;
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get('/api/v1/users');
    return response.data;
};

// Bad
interface user { id; name; email; } // Non-capitalized, no types
const FetchUsers = async () => { // Non-conventional naming
    const d = await api.get('/api/v1/users');
    return d.data; // Non-descriptive variable
};
```

**Best Practices**:
- Use strict TypeScript mode
- Prefer functional components over class components
- Use custom hooks for reusable logic
- Include PropTypes or TypeScript interfaces
- Handle loading and error states

**Testing**:
- Test components with Vitest and React Testing Library
- Mock API calls
- Test user interactions
- Cover edge cases

## Testing

### Running Tests

**Backend**:
```bash
# Unit tests
cd apps/backend
./gradlew test

# Integration tests
./gradlew integrationTest

# Generate coverage report
./gradlew jacocoTestReport
```

**Frontend**:
```bash
# Unit tests
cd apps/frontend
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**E2E Tests**:
```bash
# Playwright tests
cd apps/frontend
npx playwright test
```

### Pre-commit Hooks

The project uses Git hooks for quality checks:

```bash
# Install hooks (run once after clone)
npm install husky

# Hooks run automatically on:
# - Pre-commit: lint and format
# - Pre-push: run tests
```

## Submitting Changes

### Pull Request Process

1. **Update your branch**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests locally**:
   ```bash
   # Backend
   ./gradlew test

   # Frontend
   npm test
   ```

3. **Create Pull Request**:
   - Go to GitHub Pull Requests page
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template

### Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Code Review Guidelines

**For Reviewers**:
- Review for code quality and style
- Check for potential bugs
- Verify tests are sufficient
- Suggest improvements constructively
- Respond within 48 hours

**For Authors**:
- Address all review comments
- Explain your reasoning for disagreements
- Keep discussions focused and respectful
- Update PR with changes promptly

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened (include error messages).

## Environment
- K8s Manager Version:
- Kubernetes Version:
- Browser/OS:
- Additional context:

## Screenshots
If applicable, add screenshots to help explain.

## Logs
Relevant log outputs.
```

### Feature Requests

Use the feature request template:

```markdown
## Feature Description
A clear and concise description of the feature.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How should the feature work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Any other context, mockups, or examples.
```

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- About page in the application

## Questions?

- Check [GitHub Issues](https://github.com/your-org/kube-manager/issues)
- Contact maintainers: maintainers@example.com
- Join discussion: #k8s-manager on Slack

Thank you for contributing! 🎉
