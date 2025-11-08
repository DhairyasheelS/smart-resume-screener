# Spring Boot Backend API Contract

This document describes the API contract that the Angular frontend expects from the Spring Boot backend.

## Base URL

Default: `http://localhost:8080/api`

Configure this in `src/environments/environment.ts` for development and `src/environments/environment.prod.ts` for production.

## CORS Configuration

The Spring Boot backend must enable CORS to allow requests from the Angular frontend:

```java
@CrossOrigin(origins = "http://localhost:4200")
```

Or configure globally:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

## API Endpoints

### 1. Upload Job Description

**Endpoint:** `POST /api/job-description`

**Request Body:**
```json
{
  "description": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job description saved successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Job description is required"
}
```

---

### 2. Upload Resume

**Endpoint:** `POST /api/upload-resume`

**Request:** 
- Content-Type: `multipart/form-data`
- Form field name: `resume` (File)

**Response:**
```json
{
  "success": true,
  "resume": {
    "name": "resume.pdf",
    "score": 85
  }
}
```

**Error Response (400):**
```json
{
  "error": "No file uploaded"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to process resume: [error message]"
}
```

---

### 3. Get All Resumes with Scores

**Endpoint:** `GET /api/resumes`

**Response:**
```json
{
  "resumes": [
    {
      "name": "resume1.pdf",
      "score": 85
    },
    {
      "name": "resume2.pdf",
      "score": 72
    }
  ],
  "jobDescription": "Software Engineer position requiring..."
}
```

**Note:** Resumes should be sorted by score (highest first).

**Response when no job description:**
```json
{
  "resumes": [
    {
      "name": "resume1.pdf",
      "score": 0
    }
  ],
  "jobDescription": null
}
```

---

### 4. Clear All Data

**Endpoint:** `POST /api/clear`

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "All data cleared"
}
```

---

## Data Models

### Resume Object
```typescript
{
  name: string;    // File name of the resume
  score: number;  // Match score (0-100)
}
```

### Resumes Response
```typescript
{
  resumes: Resume[];           // Array of resumes sorted by score (highest first)
  jobDescription: string | null; // Current job description or null
}
```

## Implementation Notes

1. **Resume Processing**: The backend should:
   - Extract text from uploaded PDF files
   - Analyze the resume content against the job description
   - Calculate a match score (0-100)
   - Store the resume data for retrieval

2. **Score Calculation**: The frontend expects scores between 0-100, where:
   - 80-100: Excellent Match
   - 60-79: Good Match
   - 40-59: Fair Match
   - 0-39: Poor Match

3. **Sorting**: When returning resumes via `GET /api/resumes`, they should be sorted by score in descending order (highest score first).

4. **File Handling**: The backend should handle PDF file uploads and extract text content for analysis.

5. **State Management**: The backend should maintain:
   - Current job description
   - List of uploaded resumes with their extracted text and scores
   - Ability to recalculate scores when job description changes

## Example Spring Boot Controller

```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ResumeScreenerController {
    
    @PostMapping("/job-description")
    public ResponseEntity<?> uploadJobDescription(@RequestBody Map<String, String> request) {
        // Implementation
        return ResponseEntity.ok(Map.of("success", true, "message", "Job description saved successfully"));
    }
    
    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestParam("resume") MultipartFile file) {
        // Implementation
        return ResponseEntity.ok(Map.of(
            "success", true,
            "resume", Map.of("name", file.getOriginalFilename(), "score", calculatedScore)
        ));
    }
    
    @GetMapping("/resumes")
    public ResponseEntity<?> getResumes() {
        // Implementation
        return ResponseEntity.ok(Map.of(
            "resumes", resumesList,
            "jobDescription", currentJobDescription
        ));
    }
    
    @PostMapping("/clear")
    public ResponseEntity<?> clearData() {
        // Implementation
        return ResponseEntity.ok(Map.of("success", true, "message", "All data cleared"));
    }
}
```

