import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
 users: User[] = [];

  // Inject UserService and Router
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Load all users when the component is initialized
    this.users = this.userService.getUsers();
  }

  // Navigate to profile page
  viewUser(id: number) {
    this.router.navigate(['/profile', id]);
  }

  // Delete a user and refresh the list
  deleteUser(id: number) {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }
}
