import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {


  createForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.errorMessage = null;
      this.successMessage = null;
      this.isLoading = true;

      this.authService.createAdmin(this.createForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Admin created successfully!';
          this.createForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}