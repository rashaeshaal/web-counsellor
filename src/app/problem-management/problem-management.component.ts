import { Component, OnInit } from '@angular/core';
import { Problem } from '../problem';
import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-problem-management',
  templateUrl: './problem-management.component.html',
  styleUrls: ['./problem-management.component.css']
})
export class ProblemManagementComponent implements OnInit {
  problems: Problem[] = [];
  selectedProblem: Problem | null = null;
  newProblem: Problem = { title: '', description: '', image: '' };
  newProblemImagePreview: string | null = null;
  selectedProblemImagePreview: string | null = null;

  constructor(private problemService: CounsellorService) {}

  ngOnInit(): void {
    this.getProblems();
  }

  getProblems(): void {
    this.problemService.getProblems().subscribe({
      next: (problems) => {
        console.log('Fetched problems:', problems); // Debug response
        this.problems = problems;
      },
      error: (err) => alert(`Error fetching problems: ${err.message}`),
    });
  }

  addProblems(): void {
    this.problemService.addProblem(this.newProblem).subscribe({
      next: (problem) => {
        this.problems.push(problem);
        this.newProblem = { title: '', description: '', image: '' };
        this.newProblemImagePreview = null;
      },
      error: (err) => alert(`Error adding problem: ${err.message}`),
    });
  }

  editProblem(problem: Problem): void {
    this.selectedProblem = { ...problem };
    this.selectedProblemImagePreview = problem.image ? this.problemService.getImageUrl(problem.image) : null;
  }

  updateProblem(): void {
    if (this.selectedProblem) {
      this.problemService.updateProblem(this.selectedProblem).subscribe({
        next: (updatedProblem) => {
          const index = this.problems.findIndex((p) => p.id === updatedProblem.id);
          if (index !== -1) {
            this.problems[index] = updatedProblem;
          }
          this.selectedProblem = null;
          this.selectedProblemImagePreview = null;
        },
        error: (err) => alert(`Error updating problem: ${err.message}`),
      });
    }
  }

  deleteProblem(id?: number): void {
    if (id) {
      this.problemService.deleteProblem(id).subscribe({
        next: () => {
          this.problems = this.problems.filter((p) => p.id !== id);
          if (this.selectedProblem && this.selectedProblem.id === id) {
            this.selectedProblem = null;
            this.selectedProblemImagePreview = null;
          }
        },
        error: (err) => alert(`Error deleting problem: ${err.message}`),
      });
    }
  }

  cancelEdit(): void {
    this.selectedProblem = null;
    this.selectedProblemImagePreview = null;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      this.newProblem.image = file; // Store File object
      this.newProblemImagePreview = URL.createObjectURL(file); // Use object URL for preview
    }
  }

  onEditImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.selectedProblem) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      this.selectedProblem.image = file; // Store File object
      this.selectedProblemImagePreview = URL.createObjectURL(file); // Use object URL for preview
    }
  }

  clearEditImage(): void {
    if (this.selectedProblem) {
      this.selectedProblem.image = '';
      this.selectedProblemImagePreview = null;
    }
  }

  onImageError(event: Event): void {
    console.error('Failed to load image:', (event.target as HTMLImageElement).src);
    // Optionally, set a fallback image
    // (event.target as HTMLImageElement).src = '/assets/fallback-image.jpg';
  }
}