# Admin Panel Architecture Documentation

## Overview

This document outlines the complete architecture for the Metropolitan Admin Panel - a separate Next.js application for managing content and form submissions.

---

## 1. DATABASE SCHEMA

### New Entity: Admin User

```sql
CREATE TABLE admin_user (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hashed
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert restriction: Only 2 admins allowed (enforced in backend logic)
```

### Updated Entities (Adding Base64 Image Support)

**Case Study** - Already has `image` field (VARCHAR TEXT)
```sql
ALTER TABLE case_study
    ALTER COLUMN image TYPE TEXT;  -- Support large Base64 strings
```

**News** - Already has `image` field
```sql
ALTER TABLE news
    ALTER COLUMN image TYPE TEXT;  -- Support large Base64 strings
```

**Testimonial** - No image field needed

**Inquiry** - No changes needed (view-only)

**Job Application** - No changes needed (view-only)

### Indexes for Performance

```sql
-- Date range filtering indexes
CREATE INDEX idx_case_study_created_at ON case_study(created_at);
CREATE INDEX idx_news_date ON news(date);
CREATE INDEX idx_news_created_at ON news(created_at);
CREATE INDEX idx_testimonial_created_at ON testimonial(created_at);
CREATE INDEX idx_inquiry_created_at ON inquiry(created_at);
CREATE INDEX idx_job_application_created_at ON job_application(created_at);

-- Admin user lookup
CREATE INDEX idx_admin_user_email ON admin_user(email);
```

---

## 2. BACKEND ENTITY STRUCTURE

### AdminUser.java

```java
package com.metropolitan.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;  // BCrypt hashed

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
```

### Updated CaseStudy.java

```java
// Add @Column annotation to support large Base64 strings
@Column(columnDefinition = "TEXT")
private String image;  // Base64 encoded image
```

### Updated News.java

```java
// Add @Column annotation to support large Base64 strings
@Column(columnDefinition = "TEXT")
private String image;  // Base64 encoded image
```

---

## 3. BACKEND CONTROLLER STRUCTURE

### AuthController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    // POST /api/admin/auth/register
    // - Checks if admin count < 2
    // - Hashes password with BCrypt
    // - Creates admin user
    // - Returns JWT token

    // POST /api/admin/auth/login
    // - Validates email/password
    // - Updates last_login timestamp
    // - Returns JWT token + user info

    // GET /api/admin/auth/me
    // - Validates JWT token
    // - Returns current admin user info
}
```

### AdminCaseStudyController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/case-studies")
@CrossOrigin(origins = "*")
public class AdminCaseStudyController {

    // GET /api/admin/case-studies
    // - Supports date range filtering: ?fromDate=2024-01-01&toDate=2024-12-31
    // - Supports pagination: ?page=1&limit=20
    // - Supports division filter: ?division=CENTRAL_AC
    // - Requires JWT authentication

    // GET /api/admin/case-studies/{id}
    // - Returns single case study

    // POST /api/admin/case-studies
    // - Creates new case study
    // - Accepts Base64 image
    // - Validates all fields

    // PUT /api/admin/case-studies/{id}
    // - Updates existing case study
    // - Accepts Base64 image

    // DELETE /api/admin/case-studies/{id}
    // - Soft or hard delete
}
```

### AdminNewsController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/news")
@CrossOrigin(origins = "*")
public class AdminNewsController {

    // GET /api/admin/news?fromDate=...&toDate=...&page=1&limit=20
    // POST /api/admin/news
    // PUT /api/admin/news/{id}
    // DELETE /api/admin/news/{id}
}
```

### AdminTestimonialController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/testimonials")
@CrossOrigin(origins = "*")
public class AdminTestimonialController {

    // GET /api/admin/testimonials?fromDate=...&toDate=...&page=1&limit=20
    // POST /api/admin/testimonials
    // PUT /api/admin/testimonials/{id}
    // DELETE /api/admin/testimonials/{id}
}
```

### AdminInquiryController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/inquiries")
@CrossOrigin(origins = "*")
public class AdminInquiryController {

    // GET /api/admin/inquiries?fromDate=...&toDate=...&page=1&limit=20
    // - View only (no edit)

    // DELETE /api/admin/inquiries/{id}
    // - Delete inquiry
}
```

### AdminJobApplicationController.java

```java
package com.metropolitan.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/job-applications")
@CrossOrigin(origins = "*")
public class AdminJobApplicationController {

    // GET /api/admin/job-applications?fromDate=...&toDate=...&page=1&limit=20
    // - View only (no edit)

    // DELETE /api/admin/job-applications/{id}
    // - Delete application
}
```

---

## 4. API ENDPOINTS SUMMARY

### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/admin/auth/register` | No | Register new admin (max 2) |
| POST | `/api/admin/auth/login` | No | Login with email/password |
| GET | `/api/admin/auth/me` | Yes | Get current admin user |

### Case Studies Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/case-studies` | Yes | List all case studies (filtered/paginated) |
| GET | `/api/admin/case-studies/{id}` | Yes | Get single case study |
| POST | `/api/admin/case-studies` | Yes | Create new case study |
| PUT | `/api/admin/case-studies/{id}` | Yes | Update case study |
| DELETE | `/api/admin/case-studies/{id}` | Yes | Delete case study |

### News Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/news` | Yes | List all news (filtered/paginated) |
| GET | `/api/admin/news/{id}` | Yes | Get single news article |
| POST | `/api/admin/news` | Yes | Create new news article |
| PUT | `/api/admin/news/{id}` | Yes | Update news article |
| DELETE | `/api/admin/news/{id}` | Yes | Delete news article |

### Testimonials Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/testimonials` | Yes | List all testimonials (filtered/paginated) |
| GET | `/api/admin/testimonials/{id}` | Yes | Get single testimonial |
| POST | `/api/admin/testimonials` | Yes | Create new testimonial |
| PUT | `/api/admin/testimonials/{id}` | Yes | Update testimonial |
| DELETE | `/api/admin/testimonials/{id}` | Yes | Delete testimonial |

### Inquiry Endpoints (View/Delete Only)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/inquiries` | Yes | List all inquiries (filtered/paginated) |
| DELETE | `/api/admin/inquiries/{id}` | Yes | Delete inquiry |

### Job Application Endpoints (View/Delete Only)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/job-applications` | Yes | List all job applications (filtered/paginated) |
| DELETE | `/api/admin/job-applications/{id}` | Yes | Delete job application |

### Query Parameters (All List Endpoints)

- `fromDate` (optional): ISO date string (e.g., "2024-01-01")
- `toDate` (optional): ISO date string (e.g., "2024-12-31")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `division` (optional): For case studies/testimonials

---

## 5. ADMIN PANEL PAGE STRUCTURE

### Directory Structure

```
admin-panel/                          # Next.js App Router
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Redirect to /login or /dashboard
│   ├── login/
│   │   └── page.tsx                  # Login page
│   ├── register/
│   │   └── page.tsx                  # Register page (restricted)
│   └── dashboard/
│       ├── layout.tsx                # Dashboard layout (with sidebar)
│       ├── page.tsx                  # Dashboard home (stats overview)
│       ├── case-studies/
│       │   ├── page.tsx              # List case studies (with filters)
│       │   ├── new/
│       │   │   └── page.tsx          # Create new case study
│       │   └── [id]/
│       │       ├── page.tsx          # View case study
│       │       └── edit/
│       │           └── page.tsx      # Edit case study
│       ├── news/
│       │   ├── page.tsx              # List news (with filters)
│       │   ├── new/
│       │   │   └── page.tsx          # Create new news article
│       │   └── [id]/
│       │       ├── page.tsx          # View news article
│       │       └── edit/
│       │           └── page.tsx      # Edit news article
│       ├── testimonials/
│       │   ├── page.tsx              # List testimonials (with filters)
│       │   ├── new/
│       │   │   └── page.tsx          # Create new testimonial
│       │   └── [id]/
│       │       ├── page.tsx          # View testimonial
│       │       └── edit/
│       │           └── page.tsx      # Edit testimonial
│       ├── inquiries/
│       │   ├── page.tsx              # List inquiries (with filters, delete only)
│       │   └── [id]/
│       │       └── page.tsx          # View inquiry details
│       └── job-applications/
│           ├── page.tsx              # List job applications (with filters, delete only)
│           └── [id]/
│               └── page.tsx          # View job application details
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx             # Email/password form
│   │   ├── RegisterForm.tsx          # Registration with validation
│   │   └── ProtectedRoute.tsx        # Auth wrapper
│   ├── layout/
│   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   ├── Header.tsx                # Header with user info
│   │   └── DashboardLayout.tsx       # Dashboard wrapper
│   ├── filters/
│   │   └── DateRangeFilter.tsx       # From/To date picker
│   ├── shared/
│   │   ├── DataTable.tsx             # Reusable table component
│   │   ├── Pagination.tsx            # Pagination controls
│   │   ├── DeleteButton.tsx          # Confirmation dialog
│   │   ├── ImageUpload.tsx           # Base64 image upload
│   │   └── ImagePreview.tsx          # Base64 image display
│   └── forms/
│       ├── CaseStudyForm.tsx         # Case study create/edit
│       ├── NewsForm.tsx              # News create/edit
│       └── TestimonialForm.tsx       # Testimonial create/edit
├── lib/
│   ├── api/
│   │   ├── auth.ts                   # Auth API calls
│   │   ├── case-studies.ts           # Case study CRUD
│   │   ├── news.ts                   # News CRUD
│   │   ├── testimonials.ts           # Testimonial CRUD
│   │   ├── inquiries.ts              # Inquiry view/delete
│   │   └── job-applications.ts       # Job application view/delete
│   ├── hooks/
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useCaseStudies.ts         # Case study queries
│   │   └── useImageUpload.ts         # Base64 conversion
│   └── utils/
│       ├── imageToBase64.ts          # File to Base64 converter
│       ├── formatDate.ts             # Date formatting
│       └── api-client.ts             # Axios instance with JWT
├── types/
│   ├── auth.ts                       # Admin user types
│   ├── case-study.ts                 # Case study types
│   ├── news.ts                       # News types
│   ├── testimonial.ts                # Testimonial types
│   ├── inquiry.ts                    # Inquiry types
│   └── job-application.ts            # Job application types
├── middleware.ts                     # Protected route middleware
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind CSS config
└── package.json                      # Dependencies
```

---

## 6. EXAMPLE CRUD FLOW: CASE STUDY

### Backend Flow

#### 1. Create Case Study

**Request:**
```http
POST /api/admin/case-studies
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "New Project Name",
  "description": "Detailed project description...",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
  "division": "CENTRAL_AC",
  "client": "Client Name",
  "location": "Dubai, UAE",
  "completionDate": "2024-12-01"
}
```

**Backend Service Logic:**
```java
@Service
public class CaseStudyService {
    public CaseStudy createCaseStudy(CaseStudyDTO dto) {
        // 1. Validate Base64 image size (max 10MB recommended)
        validateImageSize(dto.getImage());

        // 2. Create entity
        CaseStudy caseStudy = new CaseStudy();
        caseStudy.setTitle(dto.getTitle());
        caseStudy.setDescription(dto.getDescription());
        caseStudy.setImage(dto.getImage());  // Store Base64 as-is
        caseStudy.setDivision(dto.getDivision());
        caseStudy.setClient(dto.getClient());
        caseStudy.setLocation(dto.getLocation());
        caseStudy.setCompletionDate(dto.getCompletionDate());

        // 3. Save to database
        return caseStudyRepository.save(caseStudy);
    }
}
```

**Response:**
```json
{
  "id": 19,
  "title": "New Project Name",
  "description": "Detailed project description...",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
  "division": "CENTRAL_AC",
  "client": "Client Name",
  "location": "Dubai, UAE",
  "completionDate": "2024-12-01",
  "createdAt": "2024-01-15T10:30:00"
}
```

#### 2. Read Case Studies (with filters)

**Request:**
```http
GET /api/admin/case-studies?division=CENTRAL_AC&fromDate=2024-01-01&toDate=2024-12-31&page=1&limit=10
Authorization: Bearer <JWT_TOKEN>
```

**Backend Repository Query:**
```java
@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {

    @Query("SELECT c FROM CaseStudy c WHERE " +
           "(:division IS NULL OR c.division = :division) AND " +
           "(:fromDate IS NULL OR c.createdAt >= :fromDate) AND " +
           "(:toDate IS NULL OR c.createdAt <= :toDate) " +
           "ORDER BY c.createdAt DESC")
    Page<CaseStudy> findWithFilters(
        @Param("division") Division division,
        @Param("fromDate") LocalDateTime fromDate,
        @Param("toDate") LocalDateTime toDate,
        Pageable pageable
    );
}
```

**Response:**
```json
{
  "data": [
    {
      "id": 19,
      "title": "New Project Name",
      "description": "Detailed project description...",
      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
      "division": "CENTRAL_AC",
      "client": "Client Name",
      "location": "Dubai, UAE",
      "completionDate": "2024-12-01",
      "createdAt": "2024-01-15T10:30:00"
    }
    // ... more case studies
  ],
  "total": 5,
  "page": 1,
  "totalPages": 1
}
```

#### 3. Update Case Study

**Request:**
```http
PUT /api/admin/case-studies/19
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated Project Name",
  "description": "Updated description...",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
  "division": "CENTRAL_AC",
  "client": "Updated Client Name",
  "location": "Abu Dhabi, UAE",
  "completionDate": "2024-12-15"
}
```

**Response:**
```json
{
  "id": 19,
  "title": "Updated Project Name",
  "description": "Updated description...",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...",
  "division": "CENTRAL_AC",
  "client": "Updated Client Name",
  "location": "Abu Dhabi, UAE",
  "completionDate": "2024-12-15",
  "createdAt": "2024-01-15T10:30:00"
}
```

#### 4. Delete Case Study

**Request:**
```http
DELETE /api/admin/case-studies/19
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "message": "Case study deleted successfully",
  "id": 19
}
```

### Frontend Flow

#### 1. Create Case Study (Admin Panel)

**Page:** `/admin-panel/app/dashboard/case-studies/new/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createCaseStudy } from '@/lib/api/case-studies';
import CaseStudyForm from '@/components/forms/CaseStudyForm';

export default function NewCaseStudyPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createCaseStudy,
    onSuccess: () => {
      router.push('/dashboard/case-studies');
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Case Study</h1>
      <CaseStudyForm
        onSubmit={mutation.mutate}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
```

**Component:** `CaseStudyForm.tsx`

```tsx
'use client';

import { useState } from 'react';
import ImageUpload from '@/components/shared/ImageUpload';

interface CaseStudyFormProps {
  initialData?: CaseStudy;
  onSubmit: (data: CaseStudyFormData) => void;
  isLoading: boolean;
}

export default function CaseStudyForm({ initialData, onSubmit, isLoading }: CaseStudyFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    division: initialData?.division || 'CENTRAL_AC',
    client: initialData?.client || '',
    location: initialData?.location || '',
    completionDate: initialData?.completionDate || '',
  });

  const handleImageUpload = (base64: string) => {
    setFormData({ ...formData, image: base64 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={6}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <ImageUpload
          value={formData.image}
          onChange={handleImageUpload}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Division</label>
        <select
          value={formData.division}
          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="CENTRAL_AC">Central AC</option>
          <option value="ELEVATORS">Elevators</option>
          <option value="FIRE_PROTECTION">Fire Protection</option>
          <option value="GENERATOR">Generator</option>
          <option value="SOLAR">Solar</option>
          <option value="ELV">ELV</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Client</label>
        <input
          type="text"
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Completion Date</label>
        <input
          type="date"
          value={formData.completionDate}
          onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Case Study'}
      </button>
    </form>
  );
}
```

**Component:** `ImageUpload.tsx`

```tsx
'use client';

import { useRef } from 'react';
import { imageToBase64 } from '@/lib/utils/imageToBase64';

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Convert to Base64
    const base64 = await imageToBase64(file);
    onChange(base64);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200"
      >
        Upload Image
      </button>

      {value && (
        <div className="mt-4">
          <img
            src={value}
            alt="Preview"
            className="max-w-md rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}
```

#### 2. List Case Studies with Filters

**Page:** `/admin-panel/app/dashboard/case-studies/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCaseStudies } from '@/lib/api/case-studies';
import DateRangeFilter from '@/components/filters/DateRangeFilter';
import DataTable from '@/components/shared/DataTable';
import Pagination from '@/components/shared/Pagination';

export default function CaseStudiesPage() {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    division: '',
    page: 1,
    limit: 20,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['case-studies', filters],
    queryFn: () => getCaseStudies(filters),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <a
          href="/dashboard/case-studies/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Create New
        </a>
      </div>

      <DateRangeFilter
        fromDate={filters.fromDate}
        toDate={filters.toDate}
        onChange={(from, to) => setFilters({ ...filters, fromDate: from, toDate: to })}
      />

      <DataTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'division', label: 'Division' },
          { key: 'client', label: 'Client' },
          { key: 'location', label: 'Location' },
          { key: 'completionDate', label: 'Completion Date' },
        ]}
        data={data?.data || []}
        isLoading={isLoading}
        actions={(row) => (
          <>
            <a href={`/dashboard/case-studies/${row.id}/edit`}>Edit</a>
            <button onClick={() => handleDelete(row.id)}>Delete</button>
          </>
        )}
      />

      <Pagination
        currentPage={filters.page}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />
    </div>
  );
}
```

---

## 7. SECURITY IMPLEMENTATION

### JWT Token Structure

```java
// JwtService.java
public String generateToken(AdminUser user) {
    return Jwts.builder()
        .setSubject(user.getEmail())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hours
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        .compact();
}
```

### Spring Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/api/admin/auth/**").permitAll()
                .requestMatchers("/api/admin/**").authenticated()
                .anyRequest().permitAll()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

### Admin Registration Restriction

```java
@Service
public class AuthService {

    public AdminUser register(RegisterDTO dto) {
        // Check if already 2 admins exist
        long adminCount = adminUserRepository.count();
        if (adminCount >= 2) {
            throw new AdminLimitExceededException("Maximum 2 admin users allowed");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        // Create admin
        AdminUser admin = new AdminUser();
        admin.setEmail(dto.getEmail());
        admin.setPassword(hashedPassword);
        admin.setName(dto.getName());

        return adminUserRepository.save(admin);
    }
}
```

---

## 8. TECHNOLOGY STACK

### Backend
- **Framework:** Spring Boot 3.2.1
- **Language:** Java 17
- **Security:** Spring Security + JWT
- **ORM:** Spring Data JPA (Hibernate)
- **Database:** PostgreSQL
- **Password Hashing:** BCrypt
- **Build Tool:** Maven

### Frontend (Admin Panel)
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **UI Components:** shadcn/ui (Radix UI primitives)

### Deployment
- **Backend:** Port 5000 (or environment variable)
- **Admin Panel:** Port 3001 (separate from public website)
- **Database:** PostgreSQL (local or cloud)

---

## 9. NEXT STEPS

### Phase 1: Backend Implementation
1. ✅ Create `AdminUser` entity and repository
2. ✅ Implement JWT authentication service
3. ✅ Create auth controller (login, register)
4. ✅ Add Spring Security configuration
5. ✅ Implement admin CRUD controllers for all entities
6. ✅ Add date range filtering to repositories
7. ✅ Test all endpoints with Postman/Thunder Client

### Phase 2: Frontend Implementation
1. ✅ Set up Next.js project with TypeScript
2. ✅ Install dependencies (Tailwind, React Query, shadcn/ui)
3. ✅ Create authentication pages (login, register)
4. ✅ Implement JWT token storage and axios interceptor
5. ✅ Build dashboard layout with sidebar
6. ✅ Create reusable components (DataTable, DateRangeFilter, ImageUpload)
7. ✅ Implement CRUD pages for Case Studies
8. ✅ Implement CRUD pages for News
9. ✅ Implement CRUD pages for Testimonials
10. ✅ Implement view/delete pages for Inquiries
11. ✅ Implement view/delete pages for Job Applications

### Phase 3: Testing & Documentation
1. ✅ Test complete CRUD flows
2. ✅ Test authentication and authorization
3. ✅ Test date range filtering
4. ✅ Test image upload (Base64 conversion)
5. ✅ Create README with setup instructions
6. ✅ Document environment variables

---

## 10. ENVIRONMENT VARIABLES

### Backend (.env or application.properties)

```properties
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/metropolitan
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=5000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Summary

This architecture provides:
- ✅ Simple email/password authentication for 2 admins
- ✅ Complete CRUD operations for content (Case Studies, News, Testimonials)
- ✅ View and delete for form submissions (Inquiries, Job Applications)
- ✅ Date range filtering on all entities
- ✅ Base64 image storage (no external services)
- ✅ Clean, production-ready code structure
- ✅ Type-safe frontend with TypeScript
- ✅ RESTful API design
- ✅ Secure JWT-based authentication

Ready for implementation! 🚀
