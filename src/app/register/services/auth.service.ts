interface AuthResponse {
  access: string;
  refresh: string;
}

import { Injectable } from '@angular/core';
import { User } from '../../user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  

  loginAdmin(data: { phone_number: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/admins/admin-login/`, data).pipe(
      tap(response => {
        if (response.access && response.refresh) {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
        }
      }),
      catchError(this.handleError)
    );
  }
  createAdmin(data: { phone_number: string, email?: string, password: string, name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admins/create-admin/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/admins/users/normal/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/admins/users/normal/${userId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/api/admins/users/normal/${userId}/`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404) {
        errorMessage = error.error.error || 'Invalid phone number or password.';
      } else {
        errorMessage = `Server error (${error.status}): Please try again later.`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}