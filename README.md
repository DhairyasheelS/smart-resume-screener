# Smart Resume Screener - Frontend

An Angular frontend application for a smart resume screening tool that evaluates resumes and ranks candidates based on job description fit. This frontend connects to a Spring Boot backend for resume analysis and processing.

## Features

- 📋 **Job Description Input**: Enter or paste job descriptions with requirements, skills, and experience needed
- 📄 **Resume Upload**: Drag-and-drop or browse to upload multiple PDF resumes
- 📊 **Ranked Results**: View candidates ranked by match score with visual indicators
- 🎨 **Modern UI**: Beautiful, responsive interface designed for recruiters
- 🔄 **Real-time Updates**: Auto-refreshing results display

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Spring Boot backend running (see Backend Configuration)

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Configuration

Update the Spring Boot backend URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api' // Your Spring Boot backend URL
};
```

For production, update `src/environments/environment.prod.ts` with your production backend URL.

### Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Production Build

```bash
npm run build
```

## Backend API Requirements

This frontend expects a Spring Boot backend with the following REST endpoints:

### Endpoints

- `POST /api/job-description`
  - Request Body: `{ "description": "string" }`
  - Response: `{ "success": true, "message": "..." }`

- `POST /api/upload-resume`
  - Request: Multipart form data with `resume` file
  - Response: `{ "success": true, "resume": { "name": "string", "score": number } }`

- `GET /api/resumes`
  - Response: `{ "resumes": [{ "name": "string", "score": number }], "jobDescription": "string | null" }`

- `POST /api/clear`
  - Request Body: `{}`
  - Response: `{ "success": true, "message": "..." }`

### CORS Configuration

Ensure your Spring Boot backend has CORS enabled to allow requests from the Angular frontend:

```java
@CrossOrigin(origins = "http://localhost:4200")
```

## How It Works

1. **Enter Job Description**: Start by entering or pasting the job description in the first section
2. **Upload Resumes**: Upload one or more PDF resumes using drag-and-drop or file browser
3. **View Rankings**: The Spring Boot backend processes resumes and calculates match scores
4. **Review Results**: Each candidate shows a match percentage, score label (Excellent/Good/Fair/Poor), and visual progress bar

## Technology Stack

- **Frontend Framework**: Angular 20
- **HTTP Client**: Angular HttpClient
- **Styling**: Modern CSS with gradients and animations
- **State Management**: RxJS Observables

## Project Structure

```
src/
├── app/
│   ├── job-description/     # Job description input component
│   ├── resume-upload/        # Resume upload component with drag-and-drop
│   ├── results/             # Results display component
│   └── resume-screener.service.ts  # Service for API calls
├── environments/
│   ├── environment.ts        # Development environment config
│   └── environment.prod.ts  # Production environment config
└── styles.css               # Global styles
```

## License

This project is open source and available for use.
