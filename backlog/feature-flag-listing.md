# Feature: List Feature Flags

## Overview

We need a page that displays all existing feature flags in a table. Each flag should show its name, current status (enabled/disabled), and description. This allows users to view all feature flags at a glance.

## Architecture Diagram

```
+-------------------+         +---------------------+         +-------------------+
|    User (UI)      |         |  Frontend (Next.js) |         | Backend (Express) |
|-------------------|         |---------------------|         |-------------------|
|  View Feature     |<------->|  Table, API Call    |<------->|  Route, Controller|
|  Flags Table      |         |  (GET /feature-flags)|        |  Service, DAL     |
+-------------------+         +---------------------+         +-------------------+
                                                               |
                                                               v
                                                       +-------------------+
                                                       |   Database        |
                                                       |-------------------|
                                                       | FeatureFlag Table |
                                                       +-------------------+
```

### Details

- **Frontend (Next.js):**
  - Displays a table of all feature flags (name, status, description).
  - Fetches data from the backend API.
  - Uses shadcn/ui components for the table UI.
- **Backend (Express):**
  - **Routes:** Exposes a GET endpoint to fetch all feature flags.
  - **Controller:** Handles request, validation, and response formatting.
  - **Service:** Contains business logic for retrieving feature flags.
  - **Data Access Layer (Prisma):** Fetches feature flag records from the database using the Prisma client singleton.
- **Database:**
  - Stores feature flag records with name, description, and enabled/disabled state.

#### Data Flow

1. User navigates to the feature flags listing page in the UI.
2. Frontend sends a GET request to the backend API.
3. Backend processes the request through controller and service layers.
4. Service layer interacts with the Prisma data access layer to fetch all feature flags.
5. Backend returns the list of feature flags to the frontend.
6. Frontend displays the feature flags in a table.

#### Vertical Slice Implementation

- Each feature (like feature flag listing) is implemented as a vertical slice, including:
  - Frontend UI components and API calls
  - Backend route, controller, service, and validator
  - Database schema and access logic
- This ensures all layers are covered for the feature, from UI to database, with clear separation of concerns and maintainability.

---

## User Stories

### User Story: List All Feature Flags

**As** a product manager or developer
**I want** to see a table of all feature flags with their name, status, and description
**So that** I can quickly understand the current state of all feature flags

---

## Use Cases

### Use Case: View Feature Flags Table

- **Actor:** Product manager, Developer
- **Precondition:** User is authenticated and has permission to view feature flags
- **Main Flow:**
  1. User navigates to the feature flags management page
  2. System displays a table of all feature flags
  3. Each row shows the flag's name, current status (enabled/disabled), and description
- **Postcondition:** User can view all feature flags at a glance

---

## Acceptance Criteria

1. The system must display a table of all feature flags with the following columns:
   - Name
   - Status (enabled/disabled)
   - Description
2. The table must be styled using shadcn/ui components.
3. Data must be fetched from the backend API.
4. The backend must use Prisma types and follow the layered architecture.
5. The API endpoint must return all feature flags with the required fields.
6. The page must handle loading and error states gracefully.

---

## Notes

- This feature is foundational for feature flag management and will be extended with editing, searching, and filtering in future stories.
