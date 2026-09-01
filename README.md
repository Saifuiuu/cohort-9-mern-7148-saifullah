# cohort-9-mern-7148-saifullah
Cohort 9 — MERN (NodeJS+ReactJS) assignment for Saifullah Mumtaz

# NoteNest 📝

A full-stack notes app built with the MERN stack. You can sign up, log in, and create, edit, delete, and search your notes — all with a proper rich text editor.

## What's inside

- **Backend:** Node.js + Express + MongoDB
- **Frontend:** React + Vite + Tailwind CSS
- **Auth:** JWT stored in httpOnly cookies (safer than localStorage)
- **Rich text editor:** React Quill
- **Testing:** Mocha + Chai for backend, Jest + React Testing Library for frontend
- **Code quality:** SonarQube for static analysis and code coverage
- **Logging:** Pino logger for backend events and errors

## Features

- Sign up, log in, log out
- Create, edit, delete notes with a rich text editor
- Search through your notes
- Each user only sees their own notes
- Profile popup showing your name and email
- Toast notifications for success/error messages
- Protected routes (you can't access the dashboard without logging in)

## Project structure
cohort-9-mern-7148-saifullah/
├── backend/
│   ├── config/ → database connection
│   ├── controllers/ → auth and notes logic
│   ├── middlewares/ → auth check, error handling
│   ├── models/ → User and Note schemas
│   ├── routes/ → API routes
│   ├── tests/ → Mocha/Chai tests
│   └── utils/ → logger setup
├── frontend/
│   └── src/
│       ├── components/ → Navbar, ProtectedRoute
│       ├── context/ → AuthContext (login state)
│       ├── pages/ → Signup, Login, Dashboard, NoteEditor
│       └── services/ → axios setup
└── sonar-project.properties

## Running it locally

### Backend

```bash
cd backend
npm install
npm run dev

You'll need a .env file with:

PORT=8000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development


### Frontend

```bash
cd frontend
npm install
npm run dev
The app runs on http://localhost:5173 and talks to the backend on http://localhost:8000.

Running tests
Backend:

Bash
cd backend
npm run test
Frontend:

Bash
cd frontend
npm run test
With coverage (for SonarQube):

Backend:

Bash
cd backend
npm run test:coverage
Frontend:

Bash
cd frontend
npm run test:coverage
SonarQube Analysis
If you have SonarQube running locally (via Docker), you can scan the project from the root folder. You'll need your own SonarQube token — generate one from your SonarQube account settings.

Running the Scan
Via Environment Variable

Bash
# Windows PowerShell
$env:SONAR_TOKEN="your_token_here"
npx @sonar/scan

# Linux / Mac / Git Bash
export SONAR_TOKEN="your_token_here"
npx @sonar/scan
Security Note: Never commit your token to sonar-project.properties.

Make sure coverage reports exist in backend/coverage and frontend/coverage before scanning.

Current Results
Security: A

Reliability: A

Maintainability: A

Coverage: 80%+

API Endpoints
Auth

POST /api/auth/signup — create account

POST /api/auth/login — log in

POST /api/auth/logout — log out

GET /api/auth/profile — get logged-in user info

Notes (all require login)

GET /api/note — get all your notes (supports ?search=)

GET /api/note/:id — get one note

POST /api/note — create a note

PUT /api/note/:id — update a note

DELETE /api/note/:id — delete a note