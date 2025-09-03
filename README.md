
# How to run the project locally 

`pnpm run dev`

# Mock User
Use the mock user credentials to log in: 

```
const MOCK_USER = {
  email: "admin@alma.com",
  password: "admin",
};
```


# System Design for Lead Management Frontend Application

## Overview

This system is a **Lead Management application** built using **Next.js**. It consists of:

1. A **Public Lead Form** for prospects to submit their information.
2. An **Internal Leads List UI** for internal staff to view and manage leads.
3. Backend API endpoints (mocked or implemented using Next.js API routes) to store, retrieve, and update lead information.

The system is designed to be **modular, type-safe (TypeScript), and responsive**, with **file upload**, **form validation**, and **state management** considerations.

---

## Architecture

### Frontend

- **Framework:** Next.js (React-based)
- **Pages/Components:**
  - `PublicLeadForm`: Collects prospect information (first name, last name, email, LinkedIn, visa interests, resume/CV, message).
  - `InternalLeadsList`: Displays leads, allows status updates (PENDING → REACHED_OUT), protected by mock authentication.
  - Reusable form components:
    - `FormInput`
    - `FormTextarea`
    - `FormCheckboxGroup`
    - `FormFileInput`
- **State Management:**
  - Local state using React `useState` for forms.

### Backend (Next.js API)

- **Endpoints:**
  - `GET /api/leads` – Retrieve all leads.
  - `POST /api/leads` – Submit a new lead.
  - `PATCH /api/leads/:id` – Update a lead’s status.
- **Data Storage:**
  - Local JSON file (`src/data/leads.json`) for persistence.

### Authentication

- **Internal UI:** Protected by a **mock authentication mechanism** (e.g., username/password prompt or a simple token check) to restrict access to internal staff.

### Validation

- **Client-side validation:** Ensures required fields are filled before submission.
- **Optional feedback:** Inline error messages for invalid input or missing fields.

---

## Data Model

```ts
interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume?: File | null;
  message: string;
  status: "PENDING" | "REACHED_OUT";
  createdAt: string;
}
