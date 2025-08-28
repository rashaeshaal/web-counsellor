import { Component, OnInit } from '@angular/core';

import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.css']
})
export class CallDetailsComponent implements OnInit {
  callRequests: any[] = [];

  constructor(private callService: CounsellorService) {}

  ngOnInit(): void {
    this.callService.getCallDetails().subscribe({
      next: (response) => {
        this.callRequests = response.data;
      },
      error: (error) => {
        console.error('Error fetching call details:', error);
      }
    });
  }
}