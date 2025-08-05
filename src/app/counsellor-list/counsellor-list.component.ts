import { Component, OnInit } from '@angular/core';
import { Counsellor } from '../counsellor';
import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-counsellor-list',
  templateUrl: './counsellor-list.component.html',
  styleUrls: ['./counsellor-list.component.css']
})
export class CounsellorListComponent implements OnInit {
  counsellors: Counsellor[] = [];

  constructor(private counsellorService: CounsellorService) { }

  ngOnInit() {
    this.getCounsellors();
  }

  getCounsellors(): void {
    this.counsellorService.getCounsellors()
      .subscribe(counsellors => this.counsellors = counsellors);
  }

  delete(counsellor: Counsellor): void {
  
    this.counsellorService.deleteCounsellor(counsellor.id).subscribe({
      next: () => {
        // On success, remove the counsellor from the local array.
        this.counsellors = this.counsellors.filter(c => c.id !== counsellor.id);
      },
      error: (err) => {
        console.error('Failed to delete counsellor:', err);
        // You could add user-facing error handling here, like a toast notification.
      }
    });
  }

  addCounsellor(): void {
    console.log('addCounsellor called');
  }
}
