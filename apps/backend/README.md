# Backend Feature Flag System

## Setup

1. **Install dependencies:**
   ```bash
   cd apps/backend
   npm install
   ```

2. **Environment variables:**
   - Copy `.env.example` to `.env` and fill in required values (e.g., database connection string).
   - Example:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/confai
     PORT=8080
     ```

3. **Database setup:**
   - Run migrations to set up the schema:
     ```bash
     npm run prisma:migrate
     ```
## Development

Start the server in development mode with hot-reloading:

```bash
npm run dev
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## Start

Run the compiled server:

```bash
npm start
```

## Linting

Check code style with ESLint:

```bash
npm run lint
```

## Formatting

Format code with Prettier:

```bash
npm run format
```

## Testing

Run backend unit tests:

```bash
npm test
```

