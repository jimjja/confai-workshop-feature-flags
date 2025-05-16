# Frontend Feature Flag UI

This is the frontend (Next.js) app for the Feature Flag system.

## Setup

1. **Install dependencies:**
   ```bash
   cd apps/frontend
   npm install
   ```

2. **Environment variables:**
   - Copy `.env.example` to `.env` and fill in required values.
   - Example:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8080/api
     ```
   - The backend API must be running and accessible at the URL above.

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Build the production app:

```bash
npm run build
```

## Start

Run the production build:

```bash
npm start
```

## Linting & Formatting

Check code style:
```bash
npm run lint
```
Format code:
```bash
npm run format
```

## Testing

Run frontend unit tests:
```bash
npm test
```

## Feature Flag UI Overview
- Supports Boolean, Percentage, and Multivariate flags.
- UI adapts to flag type during creation and editing.
- Change history and notes are viewable per flag.
- Requires the backend API to be running.

See the main project README for monorepo and Docker Compose instructions.
