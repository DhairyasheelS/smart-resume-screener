import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.css'],
  standalone: false
})
export class ScreenerComponent {
  @ViewChild(ResultsComponent) resultsComponent?: ResultsComponent;

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  onDescriptionSubmitted() {
    // Refresh results when job description is submitted
    setTimeout(() => {
      this.resultsComponent?.loadResumes();
    }, 500);
  }

  onResumeUploaded() {
    // Refresh results when resume is uploaded
    setTimeout(() => {
      this.resultsComponent?.loadResumes();
    }, 500);
  }
}

