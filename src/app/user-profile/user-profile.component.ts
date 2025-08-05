import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../register/services/auth.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      // Handle the case where 'id' is not found in the route parameters
      console.error('User ID not found in route parameters.');
      return;
    }
    const id = +idParam;
    this.authService.getUsers()
      .subscribe((users: User[]) => {
        const foundUser = users.find((user: User) => user.id === id);
        if (foundUser) {
          this.user = foundUser;
        } else {
          console.error('User not found with ID:', id);
        }
      });
  }

  updateUser(): void {
    if (this.user) {
      this.authService.updateUser(this.user.id, this.user)
        .subscribe(() => console.log('User updated successfully'));
    } else {
      console.error('Cannot update user: user object is undefined.');
    }
  }
}