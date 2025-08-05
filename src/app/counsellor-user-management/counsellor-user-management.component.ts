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
        (c.profile.name && c.profile.name.toLowerCase().includes(this.search.toLowerCase())) ||
        (c.profile.email && c.profile.email.toLowerCase().includes(this.search.toLowerCase()));
      let matchesStatus = true;
      if (this.statusFilter === 'active') {
        matchesStatus = c.profile.is_active;
      } else if (this.statusFilter === 'inactive') {
        matchesStatus = !c.profile.is_active;
      } else if (this.statusFilter === 'approved') {
        matchesStatus = c.profile.is_approved;
      } else if (this.statusFilter === 'unapproved') {
        matchesStatus = !c.profile.is_approved;
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
            profile: {
              user_role: c.user_role,
              phone_number: c.phone_number,
              name: c.name,
              email: c.email,
              age: c.age,
              gender: c.gender,
              qualification: c.qualification,
              experience: c.experience,
              google_pay_number: c.google_pay_number,
              account_number: c.account_number,
              ifsc_code: c.ifsc_code,
              is_approved: c.is_approved,
              is_active: c.is_active,
              profile_photo: c.profile_photo
            }
          }));
        },
        error: (err) => this.toastr.error(err.message)
      });
  }

  editCounsellor(counsellor: Counsellor): void {
    console.log('Edit clicked', counsellor);
    this.selectedCounsellor = { 
      ...counsellor,
      profile: { ...counsellor.profile }
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
    const profile = counsellor.profile;

    // Validate required fields
    if (!counsellor.phone_number) {
      this.toastr.error('Phone Number is required.');
      return;
    }
    if (!profile.name) {
      this.toastr.error('Name is required.');
      return;
    }
    if (!profile.email) {
      this.toastr.error('Email is required.');
      return;
    }
    if (!profile.qualification) {
      this.toastr.error('Qualification is required.');
      return;
    }
    if (profile.age === null || profile.age === undefined) {
      this.toastr.error('Age is required.');
      return;
    }
    if (!profile.gender) {
      this.toastr.error('Gender is required.');
      return;
    }
    if (profile.experience === null || profile.experience === undefined) {
      this.toastr.error('Experience is required.');
      return;
    }
    if (!profile.google_pay_number) {
      this.toastr.error('Google Pay Number is required.');
      return;
    }
    if (!profile.account_number) {
      this.toastr.error('Account Number is required.');
      return;
    }
    if (!profile.ifsc_code) {
      this.toastr.error('IFSC Code is required.');
      return;
    }
    if (profile.age < 18 || profile.age > 100) {
      this.toastr.error('Age must be between 18 and 100.');
      return;
    }
    if (profile.experience < 0) {
      this.toastr.error('Experience cannot be negative.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('phone_number', counsellor.phone_number);
    formData.append('name', profile.name);
    formData.append('email', profile.email || '');
    formData.append('qualification', profile.qualification);
    formData.append('age', profile.age.toString());
    formData.append('gender', profile.gender);
    formData.append('experience', profile.experience.toString());
    formData.append('google_pay_number', profile.google_pay_number);
    formData.append('account_number', profile.account_number);
    formData.append('ifsc_code', profile.ifsc_code);
    formData.append('is_approved', profile.is_approved.toString());
    formData.append('is_active', profile.is_active.toString());

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
        error: (err) => this.toastr.error(err.message)
      });
  }

  toggleApprove(counsellor: Counsellor): void {
    const formData = new FormData();
    formData.append('is_approved', (!counsellor.profile.is_approved).toString());

    this.counsellorService.updateCounsellor(counsellor.id!, formData)
      .subscribe({
        next: () => {
          counsellor.profile.is_approved = !counsellor.profile.is_approved;
          this.toastr.success(`Counsellor ${counsellor.profile.is_approved ? 'approved' : 'unapproved'} successfully`);
        },
        error: (err) => this.toastr.error(err.message)
      });
  }

  toggleActive(counsellor: Counsellor): void {
    const formData = new FormData();
    formData.append('is_active', (!counsellor.profile.is_active).toString());

    this.counsellorService.updateCounsellor(counsellor.id!, formData)
      .subscribe({
        next: () => {
          counsellor.profile.is_active = !counsellor.profile.is_active;
          this.toastr.success(`Counsellor ${counsellor.profile.is_active ? 'activated' : 'deactivated'} successfully`);
        },
        error: (err) => this.toastr.error(err.message)
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
        error: (err) => this.toastr.error(err.message)
      });
  }

  cancelEdit(): void {
    this.selectedCounsellor = null;
    this.selectedFile = null;
  }
}