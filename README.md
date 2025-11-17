# Wedding Gift List (WGL) App

### 🪪 Project Overview
Wedding Gift List (WGL) is a full-stack web application designed to help couples create, manage, and share their wedding gift lists, while allowing guests to view lists, request access, and mark gifts as presented. It features secure authentication, personalized owner and guest dashboards, password recovery via email, and full CRUD flows for weddings, gifts, and guest requests.

Built with a Next.js + TypeScript frontend and an Express + TypeScript backend following a feature-first architecture, the app integrates RESTful endpoints, centralized error handling, and persistent client-side state via Zustand. Owners can manage multiple weddings, approve or deny guest access, and track who gifted each item — all through a clean, responsive interface.

This repository was built as a self-directed learning project to experiment with modern web technologies and software architecture. It was not created following a course or guided tutorial — the implementation reflects decisions made to explore trade-offs and consolidate practical knowledge.

---

### 🚀 Getting Started (monorepo)
These instructions assume a Windows development environment but include cross-platform commands. Adjust for your shell (PowerShell, CMD, Git Bash).

1. Clone repository
```bash
git clone https://github.com/Tute24/wgl-app
cd <repo-root>
```

2. Copy and configure environment files
- Frontend
```bash
# Unix / Git Bash
cp frontend/.env.example frontend/.env

# PowerShell
Copy-Item frontend/.env.example frontend/.env
```
- Backend
```bash
# Unix / Git Bash
cp backend/.env.example backend/.env

# PowerShell
Copy-Item backend/.env.example backend/.env
```
Edit both .env files (set NEXT_PUBLIC_API_URL in frontend; DATABASE_URL, SECRET_KEY, SENDER_EMAIL, APP_PASSWORD, etc. in backend).

3. Install dependencies
```bash
# From repo root
cd frontend && npm install
cd ../backend && npm install
```

4. Run development servers
```bash
# Frontend
cd frontend
npm run dev

# Backend (nodemon)
cd ../backend
npm run start
```

5. Build for production (optional)
```bash
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
npm run build
```

Notes:
- Node.js v18+ recommended.
- Frontend expects NEXT_PUBLIC_API_URL to point to the backend API.
- Backend expects a reachable PostgreSQL instance configured via DATABASE_URL.

---

## Frontend

### ⚙️ Tech Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Zustand (state management)
- Axios (HTTP client)
- React Hook Form + Zod (forms & validation)
- Vitest + React Testing Library (unit tests)
- Radix UI, react-icons, lucide (UI primitives)
- Utilities: clsx, tailwind-merge, react-spinners

(Dependencies and scripts are defined in frontend/package.json)

### 📁 Folder Structure (focus: src/app/)
- src/app/
  - globals.css — global styles & Tailwind imports
  - layout.tsx — root layout and global providers
  - portal/ — authenticated area (dashboard, createList, giftList, giftsTable, requests-history, error pages)
  - registerPage/, reset-password/, forgot-password/ — auth pages
  - (components)/ — shared UI components and modals
  - (hooks)/ — route/component-specific hooks (useGetWeddings, useGetGifts, etc.)
  - (auxiliary-functions)/ — helpers and error handlers
- src/common/axios-api/ — AxiosApi wrapper
- src/stores/ — Zustand providers (auth, general, weddings, gifts)

### 🧩 Features
- Register / login / logout flows
- Password reset and forgot-password flow
- Owner dashboard to manage weddings and gift lists
- Guest flows: request access, view lists, mark gifts as presented
- Create/edit gifts with quantities and statuses
- Gifts table (the user can see all the presents gifted from each wedding they have created, and which user gifted the present) and request history management
- Centralized API integration and error handling
- Client-side state via Zustand

### 🧪 Testing
- Vitest + React Testing Library configured
- Run tests:
```bash
cd frontend
npm run test
```
See frontend/vitest.config.ts and frontend/vitest.setup.ts for details.

### 🛠️ Dev notes
- Axios wrapper: frontend/src/common/axios-api/axios-api.ts
- Error handling helpers live under src/app/(auxiliary-functions)
- Global providers are wired in src/app/layout.tsx
- Tailwind config: frontend/tailwind.config.ts

---

## Backend (Feature‑first)

### ⚙️ Tech Stack
- Node.js + TypeScript (strict)
- Express
- Prisma (PostgreSQL)
- JWT for auth
- Bcrypt for password hashing
- Nodemailer for email delivery
- Day.js for dates
- Dev tooling: ts-node, nodemon, ESLint, Prettier
- Docker

(See backend/package.json)

### 📁 Folder Structure (feature‑first focus)
- app.ts — application entry and router mounts
- prisma/ — schema.prisma and migrations
- features/ — modular feature folders (auth, users, gifts, requests, weddings)
  - each feature typically contains: *.routes.ts, *.controller.ts, *.service.ts
- middleware/ — auth and reset-password middlewares
- classes/ — AppError
- utils/ — controller error handler
- transporter/ — nodemailer transporter
- types/ — shared TypeScript types
- Dockerfile - file with instructions to build the API's docker image in production
- Dockerfile.dev - file with instructions to build the API's docker image locally
- docker-compose - File that orchestrates the enviroment locally, using Dockerfile.dev to run the API's and postgres image to run the DB's container simultaneously in the host's PC

Purpose:
- routes: endpoint wiring and middleware
- controllers: handle requests and responses
- services: business logic and DB access (Prisma), throw AppError for predictable failures
- Dockerfiles: defines how to create the API's reproducible and immutable image, to avoid problems while the app's in development/production mode
- docker-compose.yml: orchestrates the local development environment by running both the API container (with hot reload) and the PostgreSQL database simultaneously, ensuring consistent setup on any machine 

### 🧩 Features
- User registration and authentication (JWT)
- Password recovery via email and secure reset flow
- Weddings: create, list (owner & guest), delete
- Gifts: CRUD, mark presented, list gifted products
- Requests: create/accept/deny and history
- Centralized AppError model and controller handler

### 🧪 Testing
- No automated tests configured yet for the backend, but I'll implement them soon.

### 🛠️ Dev notes
- Prisma client is instantiated in app.ts and used by services
- Services throw AppError; controllers use controller-error-handler to normalize responses
- Configure email via transporter/nodemailer-transporter.ts with SENDER_EMAIL and APP_PASSWORD
- TypeScript strict mode and linting configured in backend/tsconfig.json and backend/.eslintrc.js
