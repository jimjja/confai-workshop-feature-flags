# ConfAI Workshop Monorepo

## Overview

This monorepo contains the full-stack implementation of a feature flag management system, including:
- **Backend**: TypeScript/Express API for feature flag management, history, and notes.
- **Frontend**: Next.js UI for creating, editing, and viewing feature flags.

---

## Monorepo Structure

```
confai-workshop/
├── apps/
│   ├── backend/    # Express/TypeScript API
│   └── frontend/   # Next.js UI
├── backlog/        # Feature specs, user stories, and design docs
├── .gitignore      # Git ignore rules
├── package.json    # Root scripts and dependencies
├── README.md       # This file
└── ...
```

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- PostgreSQL (or Docker for DB)
- (Optional) Docker & Docker Compose for orchestration

---

## Setup (All Apps)

1. **Install dependencies (root and all apps):**
   ```bash
   npm install
   cd apps/backend && npm install
   cd ../frontend && npm install
   cd ../..
   ```

2. **Environment variables:**
   - Copy `.env.example` to `.env` in each app and fill in required values.
   - Backend: `DATABASE_URL`, `PORT`
   - Frontend: `NEXT_PUBLIC_API_URL`

3. **Database setup:**
   - From `apps/backend`:
     ```bash
     npm run prisma:migrate
     ```

---

## Running the Apps

### **Development (separate terminals):**
- **Backend:**
  ```bash
  cd apps/backend
  npm run dev
  ```
- **Frontend:**
  ```bash
  cd apps/frontend
  npm run dev
  ```
- Visit [http://localhost:3000](http://localhost:3000)

### **With Docker Compose (if configured):**
```bash
# From the root
# docker-compose up --build
```

---

## Common Scripts (from root)
- `npm run lint`      # Lint all apps
- `npm run format`    # Format all apps
- `npm test`          # Run all tests (if configured)

---

## Documentation
- [Backend README](./apps/backend/README.md)
- [Frontend README](./apps/frontend/README.md)

---

## Contribution & Workflow
- Follow the dev workflow in the backlog and code review rules.
- All code must be TypeScript, strictly typed, and tested.
- See app-specific READMEs for more details.

---