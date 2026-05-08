# Product Management Mini App
A simple and clean product management application built for a small online shop. This project features a robust layered-architecture backend using Go and PostgreSQL, paired with a modern, responsive React frontend.

## Tech Stack
**Backend:**
- Go (Golang)
- PostgreSQL (Containerized via Docker)

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS

## Prerequisites
Before running the application, ensure you have the following installed:
1. **Docker Dekstop** (Must be installed and **RUNNING** in the background)
2. **Go** (v1.20 or higher)
3. **Node.js** (v24 LTS recommended)

## Environment Variables Setup
You need to set up the `.env` file for the backend. Navigate to the `backend/` directory and create a `.env` file with the following configuration:
```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=supersecretpassword
DB_NAME=product_db
DB_PORT=5433
PORT=8080
```
(Note: PostgreSQL is mapped to port 5433 to avoid conflicts with any local Windows PostgreSQL installations).

## How to Run the Project
Follow these steps precisely to get the full-stack application running.

1. Start the Database (Docker)
Ensure Docker Desktop is open and running. Then, spin up the PostgreSQL database container.
```bash
cd backend
docker-compose up -d
```

2. Run the Backend Server
Once the database is up, run the Go server. Ensure you are inside the `backend/` folder before running the commands.
```bash
go run main.go
```
The backend will run on `http://localhost:8080`

3. Run the Frontend Application
Open a new terminal tab/window, navigate to the inner frontend directory, install dependencies, and start the Vite server.
```bash
cd frontend/frontend
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`