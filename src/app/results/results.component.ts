import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResumeScreenerService, Resume } from '../resume-screener.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit, OnDestroy {
  resumes: Resume[] = [];
  jobDescription: string | null = null;
  isLoading = false;
  errorMessage = '';
  private refreshSubscription?: Subscription;

  constructor(private resumeService: ResumeScreenerService) {}

  ngOnInit() {
    this.loadResumes();
    // Auto-refresh every 5 seconds
    this.refreshSubscription = interval(5000).subscribe(() => {
      this.loadResumes();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadResumes() {
    this.isLoading = true;
    this.errorMessage = '';

    this.resumeService.getResumes().subscribe({
      next: (response) => {
        this.resumes = response.resumes;
        this.jobDescription = response.jobDescription;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load resumes. Please try again.';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  }

  getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  }

  refreshResults() {
    this.loadResumes();
  }
}

