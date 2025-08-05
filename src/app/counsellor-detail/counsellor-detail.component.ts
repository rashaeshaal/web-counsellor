import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Counsellor } from '../counsellor';
import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-counsellor-detail',
  templateUrl: './counsellor-detail.component.html',
  styleUrls: ['./counsellor-detail.component.css']
})
export class CounsellorDetailComponent implements OnInit {
  counsellor: Counsellor | null = null;

  constructor(
    private route: ActivatedRoute,
    private counsellorService: CounsellorService
  ) { }

  ngOnInit() {
    this.getCounsellor();
  }

  getCounsellor(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.counsellorService.getCounsellor(id)
      .subscribe(counsellor => this.counsellor = counsellor);
  }

  // updateCounsellor(): void {
  //   if (this.counsellor) {
  //     this.counsellorService.updateCounsellor(this.counsellor.id, this.counsellor)
  //       .subscribe(() => console.log('Counsellor updated successfully'));
  //   } else {
  //     console.error('Cannot update counsellor: counsellor object is null.');
  //   }
  // }
}
