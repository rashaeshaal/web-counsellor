import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Counsellor } from '../counsellor';
import { CounsellorService } from '../register/services/counsellor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-counsellor-user-management',
  templateUrl: './counsellor-user-management.component.html',
  styleUrls: ['./counsellor-user-management.component.css'],
})
export class CounsellorUserManagementComponent implements OnInit {
  counsellors: Counsellor[] = [];
  selectedCounsellor: Counsellor | null = null;
  selectedFile: File | null = null;
  search: string = '';
  statusFilter: string = '';

  get filteredCounsellors() {
    return this.counsellors.filter(c => {
      const matchesSearch =
        !this.search ||
        (c.name && c.name.toLowerCase().includes(this.search.toLowerCase())) ||
        (c.email && c.email.toLowerCase().includes(this.search.toLowerCase()));
      let matchesStatus = true;
      if (this.statusFilter === 'active') {
        matchesStatus = c.is_active;
      } else if (this.statusFilter === 'inactive') {
        matchesStatus = !c.is_active;
      } else if (this.statusFilter === 'approved') {
        matchesStatus = c.is_approved;
      } else if (this.statusFilter === 'unapproved') {
        matchesStatus = !c.is_approved;
      }
      return matchesSearch && matchesStatus;
    });
  }

  constructor(
    private counsellorService: CounsellorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('Fetching counsellors...');
    this.getCounsellors();
  }

  getCounsellors(): void {
    this.counsellorService.getCounsellors()
      .subscribe({
        next: (counsellors) => {
          this.counsellors = (counsellors as any[]).map(c => ({
            id: c.id,
            phone_number: c.phone_number,
            email: c.email,
            firebase_uid: c.firebase_uid,
            user_role: c.user_role,
            name: c.name,
            age: c.age,
            gender: c.gender,
            qualification: c.qualification,
            experience: c.experience,
            google_pay_number: c.google_pay_number,
            account_number: c.account_number,
            ifsc_code: c.ifsc_code,
            is_approved: c.is_approved,
            is_active: c.is_active,
            profile_photo: c.profile_photo,
            user_id: c.user_id,
          }));
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.message)
      });
  }

  editCounsellor(counsellor: Counsellor): void {
    console.log('Edit clicked', counsellor);
    this.selectedCounsellor = { 
      ...counsellor
    };
    this.selectedFile = null;
    console.log('selectedCounsellor', this.selectedCounsellor);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveCounsellor(): void {
    if (!this.selectedCounsellor) {
      this.toastr.error('No counsellor selected.');
      return;
    }

    const counsellor = this.selectedCounsellor;

    // Validate required fields
    if (!counsellor.phone_number) {
      this.toastr.error('Phone Number is required.');
      return;
    }
    if (!counsellor.name) {
      this.toastr.error('Name is required.');
      return;
    }
    if (!counsellor.email) {
      this.toastr.error('Email is required.');
      return;
    }
    if (!counsellor.qualification) {
      this.toastr.error('Qualification is required.');
      return;
    }
    if (counsellor.age === null || counsellor.age === undefined) {
      this.toastr.error('Age is required.');
      return;
    }
    if (!counsellor.gender) {
      this.toastr.error('Gender is required.');
      return;
    }
    if (counsellor.experience === null || counsellor.experience === undefined) {
      this.toastr.error('Experience is required.');
      return;
    }
    if (!counsellor.google_pay_number) {
      this.toastr.error('Google Pay Number is required.');
      return;
    }
    if (!counsellor.account_number) {
      this.toastr.error('Account Number is required.');
      return;
    }
    if (!counsellor.ifsc_code) {
      this.toastr.error('IFSC Code is required.');
      return;
    }
    if (counsellor.age < 18 || counsellor.age > 100) {
      this.toastr.error('Age must be between 18 and 100.');
      return;
    }
    if (counsellor.experience < 0) {
      this.toastr.error('Experience cannot be negative.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('phone_number', counsellor.phone_number);
    formData.append('name', counsellor.name);
    formData.append('email', counsellor.email || '');
    formData.append('qualification', counsellor.qualification);
    formData.append('age', counsellor.age.toString());
    formData.append('gender', counsellor.gender);
    formData.append('experience', counsellor.experience.toString());
    formData.append('google_pay_number', counsellor.google_pay_number);
    formData.append('account_number', counsellor.account_number);
    formData.append('ifsc_code', counsellor.ifsc_code);
    formData.append('is_approved', counsellor.is_approved.toString());
    formData.append('is_active', counsellor.is_active.toString());

    if (this.selectedFile) {
      formData.append('profile_photo', this.selectedFile, this.selectedFile.name);
    }

    this.counsellorService.updateCounsellor(counsellor.id!, formData)
      .subscribe({
        next: () => {
          this.getCounsellors();
          this.selectedCounsellor = null;
          this.selectedFile = null;
          this.toastr.success('Counsellor updated successfully');
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.message)
      });
  }

  toggleApprove(counsellor: Counsellor): void {
    const formData = new FormData();
    formData.append('is_approved', (!counsellor.is_approved).toString());

    this.counsellorService.updateCounsellor(counsellor.id!, formData)
      .subscribe({
        next: () => {
          counsellor.is_approved = !counsellor.is_approved;
          this.toastr.success(`Counsellor ${counsellor.is_approved ? 'approved' : 'unapproved'} successfully`);
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.message)
      });
  }

  toggleActive(counsellor: Counsellor): void {
    const formData = new FormData();
    formData.append('is_active', (!counsellor.is_active).toString());

    this.counsellorService.updateCounsellor(counsellor.id!, formData)
      .subscribe({
        next: () => {
          counsellor.is_active = !counsellor.is_active;
          this.toastr.success(`Counsellor ${counsellor.is_active ? 'activated' : 'deactivated'} successfully`);
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.message)
      });
  }

  deleteCounsellor(id: number): void {
    this.counsellorService.deleteCounsellor(id)
      .subscribe({
        next: () => {
          this.counsellors = this.counsellors.filter(c => c.id !== id);
          if (this.selectedCounsellor && this.selectedCounsellor.id === id) {
            this.selectedCounsellor = null;
          }
          this.toastr.success('Counsellor deleted successfully');
        },
        error: (err: HttpErrorResponse) => this.toastr.error(err.message)
      });
  }

  cancelEdit(): void {
    this.selectedCounsellor = null;
    this.selectedFile = null;
  }
}
