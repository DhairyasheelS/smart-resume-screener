import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Resume {
  name: string;
  score: number;
}

export interface ResumesResponse {
  resumes: Resume[];
  jobDescription: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeScreenerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadJobDescription(description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-jd`, { description });
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post(`${this.apiUrl}/upload-resume`, formData);
  }

  getResumes(): Observable<ResumesResponse> {
    // Get both candidates and latest job description
    const candidates$ = this.http.get<any>(`${this.apiUrl}/get-candidates`);
    const jobDescription$ = this.http.get<any>(`${this.apiUrl}/get-latest-jd`).pipe(
      catchError(() => {
        // Return null if no JD exists
        return of({ status: 'success', data: null });
      })
    );

    return forkJoin([candidates$, jobDescription$]).pipe(
      map(([candidatesResponse, jdResponse]) => {
        // Transform Flask response to frontend format
        const resumes: Resume[] = (candidatesResponse.data || []).map((candidate: any) => ({
          name: candidate.filename,
          score: candidate.score
        }));

        const jobDescription = jdResponse.data?.description || null;

        return {
          resumes,
          jobDescription
        };
      })
    );
  }

  clearData(): Observable<any> {
    // Flask backend doesn't have a clear endpoint, but we can return a success response
    // If you need this functionality, you'll need to add it to the backend
    return new Observable(observer => {
      observer.next({ status: 'success', message: 'Clear functionality not implemented in backend' });
      observer.complete();
    });
  }
}

