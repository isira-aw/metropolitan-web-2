# Metropolitan Corporate Website

## Overview

This is a modern, responsive metropolitan corporate website built with a React frontend and Express backend. The site showcases a construction/engineering company with 7 divisions (Infrastructure, Energy, Healthcare, Education, Commercial, Residential, Industrial). It features a premium color theme (#144A92 blue and #CB0816 red), case studies/projects, news articles, career listings, and contact forms.

The architecture follows a clear separation: frontend-focused design with backend integration only where necessary (case studies, news, inquiries, job applications). Services and division data are hard-coded, while case studies serve dual purposes - appearing as "Case Studies" on global pages and "Projects" on division-specific pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Build Tool**: Vite with HMR support
- **Fonts**: Inter (body) and Poppins (display/headings)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Schema Validation**: Zod for runtime validation, drizzle-zod for schema generation

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks for API calls
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared between client and server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

### Key Design Decisions

1. **Shared Type Safety**: The `shared/` directory contains database schemas and API route definitions used by both frontend and backend, ensuring type consistency.

2. **Hard-coded vs Dynamic Data**: 
   - Services are fixed per division (no backend)
   - Case studies/projects are dynamic (fetched from database)
   - Division metadata is hard-coded in `DivisionPage.tsx`

3. **Component Architecture**: Uses shadcn/ui pattern with customizable primitives. Components are styled using Tailwind with CSS variables for theming.

4. **API Design**: Routes are defined declaratively in `shared/routes.ts` with Zod schemas for request/response validation.

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database operations with migration support (`drizzle-kit`)

### Key npm Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-zod`: Database ORM and schema validation
- `react-hook-form` / `@hookform/resolvers`: Form handling with Zod validation
- `wouter`: Lightweight client-side routing
- `date-fns`: Date formatting utilities
- `embla-carousel-react`: Carousel component for testimonials/brands
- `lucide-react`: Icon library

### Build & Development
- `vite`: Frontend build tool with React plugin
- `tsx`: TypeScript execution for server
- `esbuild`: Production server bundling

### Database Schema (4 tables)
- `case_studies`: Projects with title, description, image, division, client, location
- `news`: Articles with title, content, image, summary, date
- `inquiries`: Contact form submissions
- `job_applications`: Career application submissions