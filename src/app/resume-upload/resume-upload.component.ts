import { Component, EventEmitter, Output } from '@angular/core';
import { ResumeScreenerService } from '../resume-screener.service';

@Component({
  selector: 'app-resume-upload',
  standalone: false,
  templateUrl: './resume-upload.component.html',
  styleUrl: './resume-upload.component.css'
})
export class ResumeUploadComponent {
  isDragging = false;
  isUploading = false;
  uploadProgress: { [key: string]: boolean } = {};
  uploadedFiles: string[] = [];
  errorMessage = '';
  successMessage = '';

  @Output() resumeUploaded = new EventEmitter<void>();

  constructor(private resumeService: ResumeScreenerService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(Array.from(input.files));
    }
  }

  handleFiles(files: File[]) {
    const pdfFiles = files.filter(file => file.type === 'application/pdf' || file.name.endsWith('.pdf'));
    
    if (pdfFiles.length === 0) {
      this.errorMessage = 'Please upload PDF files only';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    if (pdfFiles.length !== files.length) {
      this.errorMessage = 'Some files were skipped. Only PDF files are supported.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }

    pdfFiles.forEach(file => {
      this.uploadFile(file);
    });
  }

  uploadFile(file: File) {
    this.uploadProgress[file.name] = true;
    this.isUploading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.resumeService.uploadResume(file).subscribe({
      next: (response: any) => {
        this.uploadProgress[file.name] = false;
        this.uploadedFiles.push(file.name);
        this.successMessage = `${file.name} uploaded successfully!`;
        this.resumeUploaded.emit();
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        
        // Check if all uploads are complete
        if (Object.values(this.uploadProgress).every(v => !v)) {
          this.isUploading = false;
        }
      },
      error: (error) => {
        this.uploadProgress[file.name] = false;
        this.errorMessage = `Failed to upload ${file.name}. Please try again.`;
        this.isUploading = false;
        console.error('Error:', error);
        
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  triggerFileInput() {
    const input = document.getElementById('file-input') as HTMLInputElement;
    input?.click();
  }
}

