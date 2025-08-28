import { Component, OnInit } from '@angular/core';
import { CounsellorService } from '../register/services/counsellor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-payout',
  templateUrl: './admin-payout.component.html',
  styleUrls: ['./admin-payout.component.css'],
})
export class AdminPayoutComponent implements OnInit {
  counsellors: any[] = [];
  selectedCounsellorId: number | null = null;
  amount: number | null = null;
  notes: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private payoutService: CounsellorService) {}

  ngOnInit(): void {
    this.payoutService.getCounsellors().subscribe({
      next: (response) => {
        this.counsellors = response;
        console.log('Counsellors:', this.counsellors);
      },
      error: (error) => {
        this.message = 'Error fetching counsellors: ' + error.message;
        this.isError = true;
      }
    });
  }

  initiatePayout(): void {
    if (!this.selectedCounsellorId || !this.amount) {
      this.message = 'Please select a counsellor and enter an amount';
      this.isError = true;
      return;
    }

    this.payoutService.initiatePayout(this.selectedCounsellorId, this.amount, this.notes).subscribe({
      next: (response) => {
        this.message = `Payout of ₹${this.amount} to Counsellor ID: ${this.selectedCounsellorId} initiated successfully (Payout ID: ${response.payout_id})`;
        this.isError = false;
        this.resetForm();
      },
      error: (error) => {
        this.message = 'Error initiating payout: ' + error.message;
        this.isError = true;
      }
    });
  }

  resetForm(): void {
    this.selectedCounsellorId = null;
    this.amount = null;
    this.notes = '';
  }
}