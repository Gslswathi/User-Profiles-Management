import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

// Basic User interface — adjust fields to match your real user model or import it instead
export interface User {
  id: number;
  name: string;
  email?: string;
  // add other fields from your user model as needed
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  // Navigate to the profile page
  viewUser(id: number): void {
    this.router.navigate(['/profile', id]);
  }

  // Delete a user locally (service delete is simulated)
  deleteUser(id: number): void {
    const ok = confirm('Are you sure you want to delete this user?');
    if (!ok) {
      return;
    }

    // Service-side delete is simulated (JSON file is read-only in frontend).
    this.userService.deleteUser(id);

    // Optimistically remove from local array so UI updates immediately
    this.users = this.users.filter(u => u.id !== id);
  }
}
