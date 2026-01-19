# WGL App API

A comprehensive backend service for a wedding gift registry application built with TypeScript, Express.js, and PostgreSQL. This API provides complete functionality for managing weddings, gifts, guest contributions, and guest requests.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Architecture & SOLID Principles](#architecture--solid-principles)
- [API Documentation](#api-documentation)
- [Database](#database)

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration with email validation
- Secure login with JWT token generation
- Password reset functionality with token-based verification
- Email notifications using Nodemailer
- bcryptjs password hashing for enhanced security

### 💍 Wedding Management
- Create and manage multiple weddings
- Set wedding title, date, and shipping address
- Associate guests with weddings
- Track wedding-specific gifts and contributions
- Owner-based access control

### 🎁 Gift Registry System
- Create gift lists for weddings
- Store product name and shopping links
- Track gift quantity
- Monitor gift contributions from guests
- Update and delete gift entries

### 👥 Guest Management
- Register guests for weddings
- Send guest requests with customizable statuses
- Track guest attendance and confirmations
- Accept or deny guest requests
- Store guest contact information

### 💝 Gift Contributions
- Track individual guest contributions to gifts
- Record contribution amounts
- Associate contributions with specific gifts and contributors
- Generate contribution reports

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT + bcryptjs |
| **Validation** | Zod |
| **Testing** | Vitest |
| **Email** | Nodemailer |
| **API Documentation** | Swagger UI |
| **Container** | Docker & Docker Compose |

---

## 📁 Project Structure

```
src/
├── app.ts                          # Express application setup
├── controllers/                    # Request handlers (entry points)
│   ├── auth/                      # Authentication endpoints
│   ├── gifts/                     # Gift registry endpoints
│   ├── guest-requests/            # Guest request endpoints
│   └── weddings/                  # Wedding management endpoints
├── services/                       # Business logic & use cases
│   ├── auth/
│   ├── gifts/
│   ├── guest-requests/
│   └── weddings/
├── repositories/                   # Data access abstraction
│   ├── auth-repository.ts         # Interface definition
│   ├── gifts-repository.ts
│   ├── guest-requests-repository.ts
│   ├── weddings-repository.ts
│   ├── prisma/                    # Prisma implementations
│   └── in-memory/                 # In-memory implementations (for testing)
├── dtos/                          # Data Transfer Objects
│   ├── auth/
│   ├── gifts/
│   ├── guest-requests/
│   └── weddings/
├── types/                         # TypeScript type definitions
├── middlewares/                   # Express middleware
│   ├── auth-middleware.ts        # JWT verification
│   └── error-handler.ts          # Global error handling
├── routes/                        # Route definitions
├── docs/                          # Swagger documentation
├── zod-schemas/                   # Zod validation schemas
├── utils/                         # Utility functions
├── lib/                           # Third-party integrations
├── policies/                      # Authorization policies
└── env/                           # Environment configuration
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** 20.x or higher
- **Docker** and **Docker Compose** (for containerized setup)
- **npm** 10.x or higher

### Local Setup (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tute24/wgl-app
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration (see Environment Variables section)
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

---

### Environment Variables Explanation

| Variable | Description
|----------|------------
| `DATABASE_URL` | PostgreSQL connection string (internal Docker network)
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations)
| `NODE_ENV` | Application environment
| `SECRET_KEY` | JWT signing secret key (use strong random string)
| `NODEMAILER_EMAIL` | Gmail address for sending emails
| `NODEMAILER_APP_PASSWORD` | Gmail app-specific password (16 characters) | Obtain from Google Account settings
| `FRONTEND_URL` | Frontend application URL

### 📝 Important Notes on Database URLs

When running with **Docker Compose**:
- Use `db:5432` as the hostname (internal Docker network)
- Use `5432` as the port (internal container port)
- The port `5433` in docker-compose.yml is for **external access from your host machine**

**Example:**
```env
# For Docker Compose (container-to-container communication)
DATABASE_URL=postgresql://${postgres_user}:${postgres_password}@db:5432/${postgres_db}

# For local development (direct PostgreSQL connection)
DATABASE_URL=postgresql://${postgres_user}:${postgres_password}@localhost:5433/${postgres_db}
```

---

## 🐳 Running with Docker Compose

Docker Compose provides the easiest way to run the application with all its dependencies.

### Prerequisites
- Docker and Docker Compose installed
- `.env` file properly configured in the `api/` directory
- PostgreSQL variables correctly configured on docker.compose.yml

### Start the Application

```bash
# From the api/ directory
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f api
```

### Services

The `docker-compose.yml` starts two services:

1. **PostgreSQL Database** (`db`)
   - Image: `postgres:15`
   - Internal Port: `5432`
   - External Port: `5433` (host access)
   - Volume: `db_volume` (persistent data storage)

2. **API Server** (`api`)
   - Built from `Dockerfile.dev`
   - Port: `3333`
   - Runs `npm run start:dev` with hot reload

### Accessing the Application

- **API Server**: `http://localhost:3333`
- **Swagger Documentation**: `http://localhost:3333/wgl-app-api-swagger`
- **PostgreSQL** (from host): `localhost:5433`

---

## 🏃 Running the API Locally (Without Docker)

### Start Development Server

```bash
npm run start:dev
```

The server will start on port `3333` and automatically reload on file changes.

---

## 🧪 Testing

This project uses **Vitest** for unit testing with **in-memory repositories** for fast, isolated test execution.

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/services/auth/__tests__/create-user.test.ts
```

### Testing Strategy

#### In-Memory Repositories
The project implements the **Repository Pattern** with in-memory implementations for testing:

- **Purpose**: Isolate services from database dependencies
- **Location**: `src/repositories/in-memory/`
- **Benefits**:
  - No database setup required for tests
  - Tests run in milliseconds
  - Easy to predict and verify behavior
  - Deterministic test execution

### Test Coverage Areas

- ✅ Authentication (user creation, login, password reset)
- ✅ Wedding management (CRUD operations)
- ✅ Gift registry (creating and managing gifts)
- ✅ Guest management (invitations and confirmations)
- ✅ Error handling and validation

---

## 🏗 Architecture & SOLID Principles

This API strictly follows **SOLID principles** for maintainability, testability, and scalability.

### 1. **Single Responsibility Principle (SRP)**

Each class has a single, well-defined responsibility:

- **Controllers**: Handle HTTP requests/responses only
- **Services**: Encapsulate business logic
- **Repositories**: Manage data access
- **Middlewares**: Handle specific cross-cutting concerns

### 2. **Dependency Inversion Principle (DIP)**

Services depend on **abstractions** (interfaces), not concrete implementations:

- **Repositories** are defined as interfaces
- **Services** receive repository implementations via constructor
- Easy to swap implementations (Prisma → MongoDB, etc.)

**Architecture:**
```
Controller → Service → Repository Interface
                         ↓
                    ┌─────────────────┐
                    ├─ Prisma Impl    │ (Production)
                    ├─ In-Memory Impl │ (Testing)
                    └─────────────────┘
```

### 3. **Open/Closed Principle (OCP)**

Classes are open for extension, closed for modification:

- New repository implementations don't require changing services
- New services don't require changing controllers
- New features can be added without modifying existing code

### 4. **Liskov Substitution Principle (LSP)**

All repository implementations are interchangeable:

```typescript
// Both implementations satisfy the contract
const prismaRepo: AuthRepository = new PrismaAuthRepository();
const memoryRepo: AuthRepository = new InMemoryAuthRepository();

// Can use either without changing service behavior
const service = new CreateUserService(prismaRepo); // or memoryRepo
```

### 5. **Interface Segregation Principle (ISP)**

Repositories define focused, cohesive interfaces

### Dependency Flow

```
┌─────────────────────────────────────────────┐
│         Request → Express Router            │
└────────────────────┬────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│  Controller (HTTP Handler)                  │
│  - Parse request                            │
│  - Validate input with Zod schema           │
│  - Instantiate service                      │
└────────────────────┬────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│  Service (Business Logic)                   │
│  - Implement use cases                      │
│  - Apply business rules                     │
│  - Call repository methods                  │
│  - Return DTOs                              │
└────────────────────┬────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│  Repository (Data Access Abstraction)       │
│  - Interface defines contract               │
│  - Implementation: Prisma or In-Memory      │
└────────────────────┬────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│  Data Layer                                 │
│  - PostgreSQL (Production)                  │
│  - In-Memory Arrays (Testing)               │
└─────────────────────────────────────────────┘
```

### Benefits of This Architecture

| Benefit | How It's Achieved |
|---------|-------------------|
| **Testability** | Services receive mock repositories; no DB needed |
| **Maintainability** | Clear separation of concerns |
| **Flexibility** | Swap implementations without touching services |
| **Scalability** | Add features without modifying existing code |
| **Reusability** | Services work with any repository implementation |

---

## 📚 API Documentation

Comprehensive API documentation is available via **Swagger UI**.

### Accessing Swagger Documentation

Once the application is running:

```
http://localhost:3333/wgl-app-api-swagger
```

### Swagger Features

- 📖 Interactive API documentation
- 🧪 Try-it-out functionality for all endpoints
- 🔐 JWT authentication support
- 📝 Request/response schema visualization
- 💾 Example data and responses

### API Endpoints Overview

#### Authentication (`/auth`)
- `POST /auth/create-user` - Register new user
- `POST /auth/sign-in` - Login and get JWT token
- `POST /auth/sign-out` - Logout
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

#### Weddings (`/weddings`)
- `GET /weddings` - List user's weddings (owned and invited to)
- `POST /weddings` - Create new wedding
- `DELETE /weddings/:weddingId` - Delete wedding
- `GET /weddings/:weddingId/gifts` - List gifts for a wedding
- `POST /weddings/:weddingId/gifts` - Create new gifts for a wedding
- `POST /weddings/:weddingId/gifts/:giftId/contributions` - Register gift contribution
- `GET /weddings/:weddingId/gifts/contributions` - Get gift contributions from a wedding
- `POST /weddings/:weddingId/guest-request` - Create guest request for a wedding

#### Gifts (`/gifts`)
- `PATCH /gifts:giftId` - Update gift data
- `DELETE /gifts/:giftId` - Delete gift

#### Guest Requests (`/guest-requests`)
- `GET /guest-requests` - List guest requests history from the requesting user's owned weddings
- `PATCH /guest-requests/:guestRequestId/accept` - Accept guest request
- `PATCH /guest-requests/:guestRequestId/deny` - Deny guest request
- `GET /guest-requests/pending/count` - Count pending requests from the requesting user's owned weddings

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained from the sign-in or create-user endpoint and remain valid for an hour.

---

## 🗄 Database

### Database Schema

The application uses PostgreSQL with Prisma ORM. The db schema can be seen at prisma/schema.prisma file

### Database Relationships

```
User (1) ──────────────── (Many) Wedding
  │                           │
  ├─ owns weddings            ├─ has many gifts
  ├─ contributes to gifts     ├─ has many guests
  └─ makes guest requests     └─ has many guest requests
```
---

## Deploy

The app's backend is already in production, with the database being deployed on Supabase and the API at Render. It's possible to checkout the in-production swagger documentation here: [API's Swagger](https://wgl-app.onrender.com/wgl-app-api-swagger/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details (on the project's root).

---

## 🙏 Acknowledgments

Built with modern best practices in mind:
- Clean Architecture principles
- SOLID design patterns
- Unit tests covering the bussiness rules from the services
- Type-safe TypeScript throughout
- Comprehensive error handling
