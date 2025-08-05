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
    if (counsellor.id !== undefined) {
      this.counsellorService.deleteCounsellor(counsellor.id).subscribe({
        next: () => {
          this.counsellors = this.counsellors.filter(c => c.id !== counsellor.id);
        },
        error: (err) => {
          console.error('Failed to delete counsellor:', err);
        }
      });
    } else {
      console.error('Counsellor ID is undefined, cannot delete.');
    }
  }

  addCounsellor(): void {
    console.log('addCounsellor called');
  }
}
