
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Counsellor } from '../../counsellor';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {
  private apiUrl = 'http://localhost:8000/api/counsellors';

  constructor(private http: HttpClient) { }

  getCounsellors(): Observable<Counsellor[]> {
    return this.http.get<Counsellor[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCounsellor(id: number): Observable<Counsellor> {
    return this.http.get<Counsellor>(`${this.apiUrl}/${id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  addCounsellor(counsellorData: Partial<Counsellor>): Observable<Counsellor> {
    return this.http.post<Counsellor>(this.apiUrl, counsellorData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateCounsellor(id: number, counsellorData: Partial<Counsellor>): Observable<Counsellor> {
    return this.http.patch<Counsellor>(`${this.apiUrl}/${id}/`, counsellorData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCounsellor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`, {
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
        errorMessage = error.error.error || 'Invalid request.';
      } else {
        errorMessage = `Server error (${error.status}): Please try again later.`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}