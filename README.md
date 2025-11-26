## 🎓 School Registry App (SvelteKit + TailwindCSS + TypeScript)

A small full-stack SvelteKit application developed as part of the Project Full Stack Developer Technical Assessment.


The app allows managing a simple school registry, including:

- Students

- Teachers

It features:

- Clean UI with TailwindCSS

- In-memory data storage (no database)

- REST-style API endpoints using SvelteKit +server.ts

- Fully typed TypeScript services and repositories

- Professional multi-layer architecture

- Modern SvelteKit file-based routing

- Server load functions and client actions

- Reusable UI components

- End-to-end functional pages


### 🚀 Live Features
✔ Students

- View student list

- Add new student (with validation)

- Real-time refresh after creation

✔ Teachers

- View teacher list

- Add new teacher (with validation)

- Real-time refresh

✔ Navigation

- Clean navbar

- Home → Students / Teachers


### 🏗 Architecture Overview

This project intentionally follows a realistic, scalable backend-frontend architecture — even though no real database is used — to demonstrate full-stack best practices.

Svelte UI (pages + components)
        ↓
+page.server.ts (server load)
        ↓
API Endpoints (+server.ts)
        ↓
Services (validation + business logic)
        ↓
Repositories (mock in-memory data)


### Why this architecture?

Although the test requires “mock in-memory services”, implementing the app with proper layers demonstrates:

- Scalable backend design

- Separation of concerns

- Clean TypeScript domain modeling

- Real-world full-stack thinking

- Project-style production coding


### 🧩 Tech Stack

| Layer           | Technology                       |
| --------------- | -------------------------------- |
| Framework       | **SvelteKit**                    |
| Styling         | **TailwindCSS** (+ Forms plugin) |
| Languages       | **TypeScript**, HTML, CSS        |
| Testing         | Vitest (unit + component)        |
| Package Manager | npm                              |
| Dev Tools       | ESLint, Prettier                 |
| Data Layer      | Mock in-memory repositories      |



### 📂 Project Structure

src/
 ├─ lib/
 │   ├─ components/
 │   │   ├─ forms/
 │   │   ├─ tables/
 │   │   └─ ui/
 │   ├─ repositories/      ← mock in-memory data
 │   ├─ services/          ← validation + business logic
 │   ├─ types/
 │   └─ utils/
 ├─ routes/
 │   ├─ +layout.svelte     ← navbar + global layout
 │   ├─ +page.svelte       ← home
 │   ├─ students/
 │   │   ├─ +page.svelte
 │   │   ├─ +page.server.ts
 │   │   └─ +server.ts     ← API: GET/POST students
 │   └─ teachers/
 │       ├─ +page.svelte
 │       ├─ +page.server.ts
 │       └─ +server.ts     ← API: GET/POST teachers


### 🛠 Setup Instructions

#### 1. Clone repository
git clone https://github.com/<your username>/Project-assessment.git
cd Project-assessment


#### 2. Install dependencies
npm install

#### 3. Start Dev Server
npm run dev

App will be available at:

👉 http://localhost:5173/


### 🧪 Testing (Vitest)

To run tests:
npm run test

Vitest is configured for:
- Unit testing (repositories + services)
- Component testing (forms + tables)

### 📦 Build for Production
npm run build
npm run preview

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

### 🗂 Mock In-Memory Database

All data is stored in simple arrays inside the repository layer:

src/lib/repositories/students.repository.ts
src/lib/repositories/teachers.repository.ts


“Data should be handled through mock in-memory services.”


### 🧠 Design Considerations

- Multi-layer architecture simulates a real backend
- Type-safe from UI → API → Services → Repo
- Easy to replace mock data with PostgreSQL later
- Clean use of fetch and SvelteKit actions
- Separation of UI and business concerns
- Reusable Tailwind input components


### 🎥 Demo Video (YouTube)

A full walkthrough of the solution including:

- Architecture explanation
- Code structure
- End-to-end demonstration
- Design decisions

👉 [YouTube link here]


### 👤 Author
Saeed Farkhondeh
Full Stack Developer
Email: saeedfa20201@gmail.com
LinkedIn: https://www.linkedin.com/in/saeed-farkhondeh-575924172/


### 🏁 Conclusion

This project demonstrates:

- Modern full-stack SvelteKit development
- Clean TypeScript domain modeling
- Solid backend architecture principles
- Realistic scalable structure
- Production-ready UI with Tailwind
- Professional engineering practices