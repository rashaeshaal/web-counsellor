import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../register/services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers()
      .subscribe((users: User[]) => this.users = users);
  }

  delete(user: User): void {
    this.authService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u !== user);
    });
  }

  edit(user: User): void {
    // This is a placeholder for editing a user.
    // You would typically navigate to a separate "edit user" page or open a modal.
    console.log('editUser called for user:', user);
  }

  addUser(): void {
    // This is a placeholder for adding a new user. 
    // You would typically navigate to a separate "add user" page or open a modal.
    console.log('addUser called');
  }

}