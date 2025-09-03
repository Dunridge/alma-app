
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

## 1. Requirements

### Functional Requirements

* **Public Lead Form**: Allow prospects to submit their personal details, LinkedIn, visa interests, resumes, and messages.
* **Internal Dashboard**: Provide staff a way to view all leads and update their status (`Pending → Reached Out`).
* **Authentication**: Secure internal dashboard access via mock login.
* **File Upload**: Accept and store resumes in the system.

### Non-Functional Requirements

* **Type Safety**: Use TypeScript across frontend and backend.
* **Persistence**: Store leads persistently between sessions.
* **Simplicity**: Minimize dependencies; keep system lightweight.
* **Extensibility**: Allow future migration to database or cloud storage.

---

## 2. Architecture

```
A1 -->|Submit Lead Form| B[Next.js Frontend]
A2 -->|Login + Manage Leads| B

B --> C[API Routes]
C --> D[(leads.json)]
C --> E[/public/uploads]
```

* **Frontend**: Next.js (React + TypeScript)
* **Backend**: Next.js API routes
* **Storage**: JSON file for structured data (`leads.json`) + file system for resumes (`/public/uploads`)
* **Authentication**: Mock credentials stored in-memory

---

## 3. Design

### Frontend Components

* `ImmigrationAssessmentForm`: Collects and submits user data via `POST /api/leads`.
* `LeadsTable`: Lists all leads from `GET /api/leads`; allows status updates via `PATCH /api/leads/:id`.
* **Reusable UI Elements**: `FormInput`, `FormTextarea`, `FormCheckboxGroup`, `FormFileInput`.

### Backend API Endpoints

| Method  | Route            | Description                                      |
| ------- | ---------------- | ------------------------------------------------ |
| `GET`   | `/api/leads`     | Retrieve all leads                               |
| `POST`  | `/api/leads`     | Submit new lead (form-data + file)               |
| `PATCH` | `/api/leads/:id` | Update lead status (e.g., Pending → Reached Out) |
| `POST`  | `/api/login`     | Authenticate internal staff (mock login)         |

### Data Model

```ts
type Status = "Pending" | "Reached Out";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: string | null; // path to file 
  message: string;
  status: Status;
  createdAt: string;
}
```

### File Storage Flow

1. User uploads a resume.
2. File stored in `/public/uploads/<timestamp>-filename.pdf`.
3. File path stored in `leads.json` under `resume`.
4. Staff can download the resume from internal dashboard.

---

## 4. Implementation

* **Frontend**:

  * Built with Next.js and React.
  * State handled with `useState` and `useMemo`.
  * Client-side validation to enforce required fields.

* **Backend**:

  * File-based persistence with `fs/promises`.
  * JSON serialization for leads storage.
  * Basic error handling for missing fields and file I/O failures.

* **Authentication**:

  * Mock user:

    ```ts
    const MOCK_USER = {
      email: "admin@alma.com",
      password: "admin",
    };
    ```
  * Returns `200` on success, `401` on invalid credentials.

---

## 5. Operations

* **Deployment**:

  * Can run locally with `pnpm run dev`.
  * Deployable to **Vercel**, since it’s a Next.js app with file-based API routes.

* **Monitoring**:

  * Basic error logging in API routes.
  * No external observability yet.

* **Future Improvements**:

  * Replace JSON storage with **Postgres + Prisma**.
  * Store resumes in **AWS S3 / GCS**.
  * Replace mock login with **NextAuth / JWT authentication**.
  * Add filtering, search, and analytics in leads dashboard.
  * Add **email notifications** on new submissions.
