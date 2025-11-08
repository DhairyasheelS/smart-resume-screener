import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  @ViewChild(ResultsComponent) resultsComponent?: ResultsComponent;

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
