import { Component, EventEmitter, Output } from '@angular/core';
import { ResumeScreenerService } from '../resume-screener.service';

@Component({
  selector: 'app-job-description',
  standalone: false,
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent {
  jobDescription = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  @Output() descriptionSubmitted = new EventEmitter<void>();

  constructor(private resumeService: ResumeScreenerService) {}

  onSubmit() {
    if (!this.jobDescription.trim()) {
      this.errorMessage = 'Please enter a job description';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.resumeService.uploadJobDescription(this.jobDescription).subscribe({
      next: () => {
        this.successMessage = 'Job description saved successfully!';
        this.isSubmitting = false;
        this.descriptionSubmitted.emit();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to save job description. Please try again.';
        this.isSubmitting = false;
        console.error('Error:', error);
      }
    });
  }
}

