# Workshop 4 – Full-Stack Hello World

This folder contains **Workshop 4** for the course ACCTMIS 4630, Buisness Systems Application Development.

The goal of this workshop was to build a basic full-stack application
using a vertical slice approach with React and .NET.

## What I Built
- A .NET Web API with endpoints:
  - `GET /api/hello`
  - `GET /api/hello/personalized?name=...`
- A React frontend, calling on data from the API and displaying it in the UI

## Architecture
- Backend: .NET Core Web API (localhost:5000)
- Frontend: React + TypeScript (localhost:5173)
- Communication via HTTP + JSON
- CORS configured to allow frontend requests

## Result
The application demonstrates data flowing from frontend
to backend, and eventually back to the Local UI.
