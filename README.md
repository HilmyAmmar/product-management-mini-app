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

## How to Run the Project
Ensure **Docker Desktop** is open and running in the background. Then, open your terminal in the **root directory** of the project and run:
```bash
docker-compose up --build
```
This single command will automatically:
1. Spin up the **PostgreSQL** database.
2. Build and start the Go Backend server (accessible at `http://localhost:8080`).
3. Build and start the React Frontend application (accessible at `http://localhost:5173`).
To stop the application, simply press `Ctrl + C` in the terminal, or run:
```bash
docker-compose down
```