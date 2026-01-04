# Metropolitan Website

Full-stack application with React frontend and Spring Boot backend.

## Architecture

This project consists of two separate applications:

1. **Frontend** (React + Vite) - Located in `/frontend`
2. **Backend** (Spring Boot) - Located in `/metropolitan-website/backend`

## Quick Start

### Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Maven 3.6+** (for building Spring Boot)
- **Node.js 18+** (for React frontend)
- **PostgreSQL** database

### Environment Setup

Set the following environment variables:

```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/metropolitan
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
```

### Running the Application

#### Option 1: Run Both Services

```bash
# Terminal 1 - Start Spring Boot Backend (runs on port 5000)
cd metropolitan-website/backend
mvn spring-boot:run

# Terminal 2 - Start React Frontend (runs on port 3000)
cd frontend
npm install
npm run dev
```

#### Option 2: Use the Startup Script

```bash
# Make the script executable
chmod +x start-dev.sh

# Run both services
./start-dev.sh
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

The frontend automatically proxies all `/api` requests to the backend.

## Project Structure

```
metropolitan-web-2/
├── frontend/                    # React frontend application
│   ├── client/                 # React source code
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── pages/         # Page components
│   │   │   └── hooks/         # Custom React hooks
│   ├── shared/                # Shared TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
└── metropolitan-website/
    └── backend/               # Spring Boot backend
        ├── src/
        │   └── main/
        │       ├── java/com/metropolitan/backend/
        │       │   ├── model/          # JPA entities
        │       │   ├── repository/     # Spring Data repositories
        │       │   ├── service/        # Business logic
        │       │   ├── controller/     # REST controllers
        │       │   └── config/         # Configuration classes
        │       └── resources/
        │           └── application.properties
        ├── pom.xml
        └── README.md
```

## API Endpoints

### Case Studies
- `GET /api/case-studies?division={division}&page={page}&limit={limit}` - List case studies (paginated)
- `GET /api/case-studies/{id}` - Get single case study

### News
- `GET /api/news?page={page}&limit={limit}` - List news items (paginated)
- `GET /api/news/{id}` - Get single news item

### Inquiries
- `POST /api/inquiries` - Submit inquiry
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "subject": "string",
    "message": "string",
    "division": "string"
  }
  ```

### Careers
- `POST /api/careers/apply` - Submit job application
  ```json
  {
    "name": "string",
    "email": "string",
    "position": "string",
    "portfolioUrl": "string",
    "coverLetter": "string"
  }
  ```

### Testimonials
- `GET /api/testimonials?division={division}&page={page}&limit={limit}` - Get testimonials (paginated)

## Development

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run check
```

### Backend Development

```bash
cd metropolitan-website/backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Run tests
mvn test

# Build JAR for production
mvn clean package
```

## Database

The Spring Boot backend uses PostgreSQL with JPA/Hibernate:
- Tables are automatically created on startup (DDL auto-update)
- Database is automatically seeded with sample data on first run
- Migrations are handled by Hibernate

### Divisions

The application supports 6 divisions:
1. Central AC
2. Elevators and Travelators
3. Fire Detection & Protection
4. Generator
5. Solar
6. ELV

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod validation

### Backend
- Spring Boot 3.2.1
- Spring Data JPA
- PostgreSQL
- Lombok
- Maven
- Java 17

## Production Deployment

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ directory with a web server
```

### Backend
```bash
cd metropolitan-website/backend
mvn clean package
java -jar target/backend-1.0.0.jar
```

Set production environment variables before running.

## Migration Notes

This project has been migrated from an Express.js backend to Spring Boot:
- ✅ All API endpoints maintained compatibility
- ✅ Pagination added to all list endpoints (including testimonials)
- ✅ Database schema preserved
- ✅ Frontend requires no changes (same API contract)

## Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running
- Check DATABASE_URL environment variable
- Verify Java 17+ is installed

### Frontend can't connect to API
- Ensure backend is running on port 5000
- Check Vite proxy configuration in `vite.config.ts`

### Database connection errors
- Verify PostgreSQL credentials
- Ensure database exists: `createdb metropolitan`
