# Mock API Server for Development

## Overview

This mock API server was created to resolve API proxy errors during development when the Spring Boot backend is unavailable or cannot connect due to network restrictions.

## Problem Solved

**Error:** `ECONNREFUSED` when accessing `/api/case-studies` and `/api/testimonials` endpoints
- The Vite dev server proxies `/api/*` requests to `http://localhost:5000`
- The Spring Boot backend requires Maven dependencies which may not be available in restricted network environments
- Testimonials were not displaying on the home page and division pages

## Solution

A lightweight Node.js/Express mock API server that:
1. Runs on port 5000 (same as the Spring Boot backend)
2. Provides mock data for case studies and testimonials
3. Supports all query parameters (division, page, limit)
4. Returns data in the exact schema expected by the frontend

## Usage

### Start the Mock API Server

```bash
npm run mock-api
```

Or directly:

```bash
node mock-api-server.js
```

The server will start on `http://localhost:5000` and display available endpoints.

### Available Endpoints

- **GET /api/testimonials**
  - Query params: `division` (optional), `page` (optional), `limit` (optional)
  - Returns: Array of testimonials or paginated response

- **GET /api/case-studies**
  - Query params: `division` (optional), `page` (default: 1), `limit` (default: 10)
  - Returns: Paginated response with case studies

- **GET /api/case-studies/:id**
  - Returns: Single case study by ID

### Example Requests

```bash
# Get all testimonials for Solar division
curl http://localhost:5000/api/testimonials?division=Solar

# Get case studies for Fire Detection & Protection (limited to 3)
curl "http://localhost:5000/api/case-studies?division=Fire+Detection+%26+Protection&limit=3"

# Get specific case study
curl http://localhost:5000/api/case-studies/1
```

## Mock Data

The server includes:
- **10 testimonials** across all divisions (Solar, Fire Detection & Protection, Generator, Elevators, ELV, Central AC)
- **9 case studies** across all divisions

### Testimonial Schema
```typescript
{
  id: number,
  content: string,
  author: string,
  role: string,
  division: string,
  createdAt: string
}
```

### Case Study Schema
```typescript
{
  id: number,
  title: string,
  division: string,
  client: string,
  description: string,
  image: string,
  completionDate: string,
  challenges: string,
  solution: string,
  results: string
}
```

## Frontend Changes

### Home Page
- Added testimonials fetching using `useQuery`
- Added testimonials section displaying up to 6 testimonials
- Section appears between "Featured Projects" and "Inquiry" sections

### Division Pages
- All division pages already fetch testimonials by division
- No changes required - they will work automatically with the mock API

## Development Workflow

1. Start the mock API server: `npm run mock-api`
2. Start the Vite frontend: `cd frontend && npm run dev`
3. The frontend will proxy `/api/*` requests to the mock server
4. All testimonials and case studies will load correctly

## Switching to Real Backend

When the Spring Boot backend is available:
1. Stop the mock API server (Ctrl+C)
2. Start the Spring Boot backend: `cd metropolitan-website/backend && mvn spring-boot:run`
3. The frontend will automatically connect to the real backend on port 5000
4. Ensure the PostgreSQL database is running and populated with data

## Notes

- CORS is enabled for all origins
- The mock server uses the exact same port (5000) as the Spring Boot backend
- Data is sorted by `createdAt` in descending order (most recent first)
- Division filtering is case-sensitive and must match exactly
