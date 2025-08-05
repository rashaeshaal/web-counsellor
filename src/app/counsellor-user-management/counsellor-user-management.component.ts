
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Counsellor } from '../counsellor';
import { CounsellorService } from '../register/services/counsellor.service';

@Component({
  selector: 'app-counsellor-user-management',
  templateUrl: './counsellor-user-management.component.html',
  styleUrls: ['./counsellor-user-management.component.css']
})
export class CounsellorUserManagementComponent implements OnInit {
  counsellors: Counsellor[] = [];
  selectedCounsellor: Counsellor | null = null;
  newCounsellor: Counsellor = {
    id: 0, // Temporary ID, will be replaced by backend
    phone_number: '',
    email: '',
    profile: {
      user_role: 'counsellor',
      phone_number: '',
      name: '',
      email: null,
      age: null,
      gender: null,
      qualification: '',
      experience: null,
      google_pay_number: null,
      account_number: null,
      ifsc_code: null,
      is_approved: false,
      is_active: true,
      profile_photo: null
    }
  };

  constructor(private counsellorService: CounsellorService) { }

  ngOnInit(): void {
    this.getCounsellors();
  }

  getCounsellors(): void {
    this.counsellorService.getCounsellors()
      .subscribe(counsellors => this.counsellors = counsellors);
  }

  addCounsellor(): void {
    if (!this.newCounsellor.phone_number || !this.newCounsellor.profile?.name) {
      alert('Phone number and name are required.');
      return;
    }
    // Sync profile.phone_number with newCounsellor.phone_number
    if (this.newCounsellor.profile) {
      this.newCounsellor.profile.phone_number = this.newCounsellor.phone_number;
    }
    this.counsellorService.addCounsellor(this.newCounsellor)
      .subscribe(counsellor => {
        this.counsellors.push(counsellor);
        this.newCounsellor = {
          id: 0, // Temporary ID, will be replaced by backend
          phone_number: '',
          email: '',
          profile: {
            user_role: 'counsellor',
            phone_number: '',
            name: '',
            email: null,
            age: null,
            gender: null,
            qualification: '',
            experience: null,
            google_pay_number: null,
            account_number: null,
            ifsc_code: null,
            is_approved: false,
            is_active: true,
            profile_photo: null
          }
        }; // Reset form
      });
  }

  editCounsellor(counsellor: Counsellor): void {
    this.selectedCounsellor = { ...counsellor }; // Create a copy for editing
  }

  saveCounsellor(): void {
    if (this.selectedCounsellor && this.selectedCounsellor.id !== 0) {
      // Sync profile.phone_number with selectedCounsellor.phone_number
      if (this.selectedCounsellor.profile) {
        this.selectedCounsellor.profile.phone_number = this.selectedCounsellor.phone_number;
      }
      this.counsellorService.updateCounsellor(this.selectedCounsellor.id, this.selectedCounsellor)
        .subscribe(() => {
          this.getCounsellors(); // Refresh the list
          this.selectedCounsellor = null; // Clear selection
        });
    } else {
      alert('Cannot save: Invalid counsellor ID.');
    }
  }

  deleteCounsellor(id: number): void {
    if (id !== 0) {
      this.counsellorService.deleteCounsellor(id)
        .subscribe(() => {
          this.counsellors = this.counsellors.filter(c => c.id !== id);
          if (this.selectedCounsellor && this.selectedCounsellor.id === id) {
            this.selectedCounsellor = null; // Clear selection if deleted
          }
        });
    } else {
      alert('Cannot delete: Invalid counsellor ID.');
    }
  }

  cancelEdit(): void {
    this.selectedCounsellor = null;
  }
}