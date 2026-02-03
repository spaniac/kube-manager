# K8s Manager

Web-based Kubernetes management tool similar to KubeSphere.

## Structure

```
kube-manager3/
├── apps/
│   ├── backend/       # Spring Boot 3.5.9 + Java 21
│   └── frontend/      # React 18.2 + TypeScript 5.3 + Vite 5.0
├── openspec/        # OpenSpec artifacts and specifications
├── .git/
└── README.md
```

## Development

### Backend (Spring Boot)
```bash
cd apps/backend
./gradlew bootRun
```

### Frontend (React + TypeScript)
```bash
cd apps/frontend
npm run dev
```

## Tech Stack

- **Backend**: Spring Boot 3.5.9, Java 21, PostgreSQL 15+
- **Frontend**: React 18.2, TypeScript 5.3, Vite 5.0
- **K8s Client**: Fabric8 Kubernetes Java Client 6.x
- **Monitoring**: Prometheus + Grafana
- **Authentication**: OAuth2/OIDC (Keycloak)

## Coding Conventions

- **Java**: Google Java Style Guide
- **TypeScript**: Google TypeScript Style Guide (gts)
- **API**: RESTful, DTO-based communication
- **Error Handling**: RFC 7807 ProblemDetail
