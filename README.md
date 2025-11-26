## 🎓 School Registry App (SvelteKit + TailwindCSS + TypeScript)

A clean, modern full-stack SvelteKit application built for the
Full Stack Developer Technical Assessment.
Assessment reference:


### This project demonstrates:
- Scalable front-end architecture
- Type-safe CRUD modules
- In-memory mock backend (required by assessment)
- Reusable UI components
- Professional engineering practices
- Modern SvelteKit patterns


### The app allows managing a simple school registry, including:
- Students
- Teachers


### It features:

- Clean UI with TailwindCSS
- In-memory data storage (no database)
- REST-style API endpoints using SvelteKit +server.ts
- Fully typed TypeScript services and repositories
- Professional multi-layer architecture
- Modern SvelteKit file-based routing
- Server load functions and client actions
- Reusable UI components
- End-to-end functional pages

<br />

### 🚀 Live Features

👩‍🎓 Students
- View student list
- Add new student (dialog form)
- Validation & type safety
- Real-time refresh after creation

👨‍🏫 Teachers
- View teacher list
- Add new teacher (with validation)
- Same reusable CRUD UI
- Real-time refresh

✔ Navigation
- Clean navbar
- Home → Students / Teachers

<br />

###  🏗 Architecture Overview

This project intentionally follows a realistic, scalable backend-frontend architecture — even though no real database is used — to demonstrate full-stack best practices.

        Svelte UI (pages + components)
                ↓
        SvelteKit Server Load Functions (+page.server.ts)
                ↓
        API Endpoints (+server.ts)
                ↓
        Services (validation + business logic)
                ↓
        Repositories (mock in-memory data)


### Why this architecture?

Although the test requires “mock in-memory services”, implementing the app with proper layers demonstrates:

- It clearly separates UI, business logic, and data
- Scalable backend design
- Separation of concerns
- Clean TypeScript domain modeling
- It keeps the project maintainable and scalable
- Project-style production coding

<br />

### 🧩 Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | **SvelteKit**                                 |
| Styling    | **TailwindCSS** + shadcn-svelte               |
| Language   | **TypeScript**                                |
| Testing    | **Vitest**                                    |
| Dev Tools  | ESLint, Prettier                              |
| Data Layer | In-memory repositories (assessment-compliant) |
| Build      | Vite                                          |
| Deployment | Dockerfile (multi-stage)                      |
| CI/CD      | GitHub Actions                                |

<br />

### 📂 Project Structure

        src/
         ├─ lib/
         │   ├─ components/
         │   │   ├─ crud/          # Reusable CRUD system
         │   │   └─ ui/            # shadcn-svelte wrapped components
         │   ├─ repositories/      # In-memory mock storage
         │   ├─ services/          # Business logic + validation
         │   ├─ types/             # Domain types
         ├─ routes/
         │   ├─ +layout.svelte     # Navbar + global layout
         │   ├─ +page.svelte       # Home
         │   ├─ students/
         │   │   ├─ +page.svelte   # CRUD config for Students
         │   │   ├─ +page.server.ts
         │   │   └─ +server.ts     # API handlers (mock)
         │   └─ teachers/
         │       ├─ +page.svelte
         │       ├─ +page.server.ts
         │       └─ +server.ts     # API handlers (mock)


<br />

### 🛠 Setup Instructions

#### 1. Clone repository
- git clone https://github.com/SaeedPro2020/tinental-assessment.git
- cd Project-assessment


#### 2. Install dependencies
npm install

#### 3. Start Dev Server
- npm run dev

App will be available at:

👉 http://localhost:5173/

<br />

### 🐳 Docker Support

This project includes a production-ready Dockerfile:

docker build -t school-registry .
docker run -p 3000:3000 school-registry

<br />

### 🔄 CI/CD (GitHub Actions)

Pipeline includes:
- Install & cache dependencies
- Lint
- Test
- Build
- (Optional) Docker build

### 🧪 Testing (Vitest)

Tests cover:

- Repository in-memory behavior
- Service logic
- Component rendering (CrudForm, CrudTable)

Run tests:
- npm run test

<br />

### 📦 Build for Production
- npm run build
- npm run preview

<br />

### 🧱 Data Model
Student

        interface Student {
          id: string;
          firstName: string;
          lastName: string;
          age: number;
          class: string;
        }
        
Teacher

        interface Teacher {
          id: string;
          firstName: string;
          lastName: string;
          subject: string;
        }

<br />

### 🗂 Mock In-Memory Database

All data is stored in simple arrays inside the repository layer:

- src/lib/repositories/students.repository.ts
- src/lib/repositories/teachers.repository.ts


“Data should be handled through mock in-memory services.”

<br />

### 🧠 Design Considerations

- Multi-layer architecture simulates a real backend
- Type-safe from UI → API → Services → Repo
- Easy to replace mock data with PostgreSQL later
- Clean use of fetch and SvelteKit actions
- Separation of UI and business concerns
- Reusable Tailwind input components

<br />

### 👤 Author
- Saeed Farkhondeh
- Full Stack Developer
- Email: saeedfa20201@gmail.com
- LinkedIn: https://www.linkedin.com/in/saeed-farkhondeh-575924172/

<br />

### ⏳ If I Had More Time (Future Roadmap)

- Add edit/delete support to CRUD components
- Add input validation schemas (Zod)
- Add unit tests for CRUD components
- Add optimistic UI updates
- Add dark/light theme toggle
- Add sorting/filtering on data table
- Add persistence layer (PostgreSQL) behind the repository
- Add authentication (Lucia)

<br />

### 🏁 Conclusion

This project demonstrates:

- Modern full-stack SvelteKit development
- Clean TypeScript domain modeling
- Solid backend architecture principles
- Realistic scalable structure
- Production-ready UI with Tailwind
- Modern UI with reusable components

<br />

### Architecture Diagram

                          ┌────────────────────--───────────┐
                          │          Browser UI             │
                          │  (Svelte Components + Tailwind) │
                          └──────────────┬──────────────────┘
                                         │
                                         ▼
                         ┌─────────────────────────────────────┐
                         │          Pages Layer                │
                         │ ─────────────────────────────────── │
                         │  /students/+page.svelte             │
                         │  /teachers/+page.svelte             │
                         │                                     │
                         │  • Defines column config            │
                         │  • Defines form field config        │
                         │  • Calls `onCreate()` actions       │
                         │  • Passes data to CrudPage          │
                         └──────────────────┬──────────────────┘
                                            │
                                            ▼
                         ┌─────────────────────────────────────┐
                         │         CRUD Component Layer        │
                         │ ─────────────────────────────────── │
                         │  CrudPage.svelte                    │
                         │  CrudTable.svelte                   │
                         │  CrudForm.svelte                    │
                         │                                     │
                         │  • Renders generic CRUD UI          │
                         │  • Reusable across entities         │
                         │  • Uses shadcn-svelte components    │
                         └──────────────────┬──────────────────┘
                                            │
                                            ▼
                         ┌─────────────────────────────────────┐
                         │      SvelteKit Server Load Layer    │
                         │ ─────────────────────────────────── │
                         │  /students/+page.server.ts          │
                         │  /teachers/+page.server.ts          │
                         │                                     │
                         │  • Fetches data via internal API    │
                         │  • Injects data into the page       │
                         │  • Handles invalidation             │
                         └──────────────────┬──────────────────┘
                                            │
                                            ▼
                         ┌─────────────────────────────────────┐
                         │       API Endpoint Layer            │
                         │ ─────────────────────────────────── │
                         │  /students/+server.ts               │
                         │  /teachers/+server.ts               │
                         │                                     │
                         │  • GET students/teachers            │
                         │  • POST new entries                 │
                         │  • Calls service layer              │
                         └──────────────────┬──────────────────┘
                                            │
                                            ▼
                          ┌───────────────────-───────────────┐
                          │          Service Layer            │
                          │ ───────────────────────────────── │
                          │  students.service.ts              │
                          │  teachers.service.ts              │
                          │                                   │
                          │  • Business logic                 │
                          │  • Validation                     │
                          │  • Delegates to repository        │
                          └──────────────────┬────────────────┘
                                             │
                                             ▼
                          ┌─────────────────────-─────────────┐
                          │        Repository Layer           │
                          │ ───────────────────────────────── │
                          │  students.repository.ts           │
                          │  teachers.repository.ts           │
                          │                                   │
                          │  • In-memory collections          │
                          │  • CRUD operations                │
                          │  • No database                    │
                          └──────────────────┬────────────────┘
                                             │
                                             ▼
                          ┌──────────────────────────────────┐
                          │           Mock Data              │
                          │ ─────────────────────────────────│
                          │  • Arrays held in memory         │
                          │  • Lost on restart               │
                          │  • Fully assessment-compliant    │
                          └──────────────────────────────────┘
