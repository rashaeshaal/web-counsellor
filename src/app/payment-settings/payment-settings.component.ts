import { Component, OnInit } from '@angular/core';
import { Counsellor } from '../counsellor';
import { CounsellorService } from '../register/services/counsellor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.css'],
  
})
export class PaymentSettingsComponent implements OnInit {
  counsellors: Counsellor[] = [];
  selectedUserId: number | null = null;
  sessionFee: number | null = null;
  sessionDuration: number | null = null;
  message: string = '';
  isError: boolean = false;

  constructor(private counsellorService: CounsellorService) {}

  ngOnInit(): void {
    this.counsellorService.getCounsellors().subscribe({
      next: (response) => {
        this.counsellors = response.filter(c => c);
        console.log('Counsellors:', this.counsellors);
      },
      error: (error) => {
        this.message = 'Error fetching counsellors: ' + error.message;
        this.isError = true;
      }
    });
  }

  // loadPaymentSettings(): void {
  //   if (!this.selectedUserId) {
  //     this.message = 'Please select a counsellor';
  //     this.isError = true;
  //     return;
  //   }

  //   this.counsellorService.getPaymentSettings(this.selectedUserId).subscribe({
  //     next: (response) => {
  //       this.sessionFee = Number(response.data.session_fee);
  //       this.sessionDuration = response.data.session_duration;
  //       this.message = '';
  //       this.isError = false;
  //     },
  //     error: (error) => {
  //       if (error.status === 404) {
  //         this.sessionFee = null;
  //         this.sessionDuration = null;
  //         this.message = 'No payment settings found. You can create new settings.';
  //         this.isError = true;
  //       } else {
  //         this.message = 'Error fetching payment settings: ' + error.message;
  //         this.isError = true;
  //       }
  //     }
  //   });
  // }
savePaymentSettings(): void {
  if (!this.selectedUserId || this.sessionFee == null || this.sessionDuration == null) {
    this.message = 'Please select a counsellor and provide session fee and duration';
    this.isError = true;
    return;
  }

  const data = {
    session_fee: this.sessionFee,
    session_duration: this.sessionDuration
  };

  this.counsellorService.updatePaymentSettings(this.selectedUserId, data).subscribe({
    next: (response) => {
      this.message = `Payment settings saved for User ID: ${this.selectedUserId}`;
      this.isError = false;
    },
    error: (error) => {
      this.message = 'Error saving payment settings: ' + error.message;
      this.isError = true;
    }
  });
}

  resetForm(): void {
    this.selectedUserId = null;
    this.sessionFee = null;
    this.sessionDuration = null;
    this.message = '';
    this.isError = false;
  }
}