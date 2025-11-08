import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.post(`${this.apiUrl}/job-description`, { description });
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post(`${this.apiUrl}/upload-resume`, formData);
  }

  getResumes(): Observable<ResumesResponse> {
    return this.http.get<ResumesResponse>(`${this.apiUrl}/resumes`);
  }

  clearData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/clear`, {});
  }
}

