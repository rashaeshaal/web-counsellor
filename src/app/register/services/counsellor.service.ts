import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Counsellor } from '../../counsellor';
import { Problem } from '../../problem';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {
  private apiUrl = 'https://counsellor-backend-13.onrender.com/api/admins/';
  private mediaUrl = 'https://counsellor-backend-13.onrender.com';

  constructor(private http: HttpClient) {}

  private getHeaders(includeContentType = true): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found. Redirecting to login.');
      // Optionally, redirect to login page or throw error
    }
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${token}`,
    };
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headers);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404) {
        errorMessage = error.error.error || `Request error: ${error.status}`;
      } else {
        errorMessage = `Server error (${error.status}): Please try again later.`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  getCounsellors(): Observable<Counsellor[]> {
    return this.http
      .get<Counsellor[]>(`${this.apiUrl}users/counsellors/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCounsellor(id: number): Observable<Counsellor> {
    return this.http
      .get<Counsellor>(`${this.apiUrl}users/counsellors/${id}/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateCounsellor(id: number, formData: FormData): Observable<Counsellor> {
    return this.http
      .patch<Counsellor>(`${this.apiUrl}users/counsellors/${id}/`, formData, {
        headers: this.getHeaders(false), // No Content-Type for FormData
      })
      .pipe(catchError(this.handleError));
  }

  deleteCounsellor(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}users/counsellors/${id}/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getBookingDetails(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}booking-payment-details/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCallDetails(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}call-request-details/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  initiatePayout(counsellorId: number, amount: number, notes: string): Observable<any> {
    const body = { counsellor_id: counsellorId, amount: amount * 100, notes };
    return this.http
      .post<any>(`${this.apiUrl}payout/`, body, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // getPaymentSettings(userId?: number): Observable<any> {
  //   const url = userId
  //     ? `${this.apiUrl}payment-settings/${userId}/`
  //     : `${this.apiUrl}payment-settings/`;
  //   return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  // }

updatePaymentSettings(userId: number, data: any): Observable<any> {
  return this.http
    .post<any>(
      `${this.apiUrl}payment-settings/`,
      { user_id: userId, session_fee: data.session_fee, session_duration: data.session_duration },
      { headers: this.getHeaders() }
    )
    .pipe(catchError(this.handleError));
}

createPaymentSettings(data: { user_id: number; session_fee: number; session_duration: number }): Observable<any> {
  return this.http
    .post<any>(
      `${this.apiUrl}payment-settings/`,
      { user_id: data.user_id, session_fee: data.session_fee, session_duration: data.session_duration },
      { headers: this.getHeaders() }
    )
    .pipe(catchError(this.handleError));
}
getPaymentSettings(userId?: number): Observable<any> {
  const url = userId
    ? `${this.apiUrl}payment-settings/${userId}/`
    : `${this.apiUrl}payment-settings/`;
  return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
}

// You might also want to add PUT method for updates
putPaymentSettings(userId: number, data: any): Observable<any> {
  return this.http
    .put<any>(
      `${this.apiUrl}payment-settings/${userId}/`,
      { session_fee: data.session_fee, session_duration: data.session_duration },
      { headers: this.getHeaders() }
    )
    .pipe(catchError(this.handleError));
}

  getProblems(): Observable<Problem[]> {
    return this.http
      .get<Problem[]>(`${this.apiUrl}problems/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getSelectedProblems(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}user-problems/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  addProblem(problem: Problem): Observable<Problem> {
    const formData = new FormData();
    formData.append('title', problem.title);
    if (problem.description) formData.append('description', problem.description);
    if (problem.image instanceof File) {
      formData.append('image', problem.image);
    } else if (problem.image) {
      console.warn('Image field is not a File object:', problem.image);
    }

    return this.http
      .post<Problem>(`${this.apiUrl}problems/`, formData, { headers: this.getHeaders(false) })
      .pipe(catchError(this.handleError));
  }

  updateProblem(problem: Problem): Observable<Problem> {
    const formData = new FormData();
    formData.append('title', problem.title);
    if (problem.description) formData.append('description', problem.description);
    if (problem.image instanceof File) {
      formData.append('image', problem.image);
    } else if (problem.image) {
      console.warn('Image field is not a File object:', problem.image);
    }

    return this.http
      .put<Problem>(`${this.apiUrl}problems/${problem.id}/`, formData, { headers: this.getHeaders(false) })
      .pipe(catchError(this.handleError));
  }

  deleteProblem(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}problems/${id}/`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  getImageUrl(imagePath: string | File | undefined | null): string {
    if (!imagePath || imagePath instanceof File || imagePath === '') {
      return ''; // Return empty string for invalid or File inputs
    }
    const url = imagePath.startsWith('http') ? imagePath : `${this.mediaUrl}${imagePath}`;
    if (!imagePath.startsWith('/media/')) {
      console.warn('Unexpected image path:', imagePath);
    }
    return url;
  }

  selectProblem(problemId: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}user-problems/`, { problem_id: problemId }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}