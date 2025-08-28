import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-booking-payment-details',
  templateUrl: './booking-payment-details.component.html',
  styleUrls: ['./booking-payment-details.component.css']
})
export class BookingPaymentDetailsComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    private bookingService: CounsellorService
  ) { }

  ngOnInit(): void {
    this.bookingService.getBookingDetails().subscribe({
      next: (response: any) => {
        this.bookings = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching booking details:', error);
      }
    });
  }
}