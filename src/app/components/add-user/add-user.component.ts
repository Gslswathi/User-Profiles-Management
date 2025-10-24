import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // Form fields
  name: string = '';
  email: string = '';

  constructor(private userService: UserService, private router: Router) {}

  // Add a new user
  addUser() {
    if (this.name && this.email) {
      this.userService.addUser({ id: 0, name: this.name, email: this.email });
      alert('✅ User added successfully!');
      // After adding, navigate back to user list
      this.router.navigate(['/']);
    } else {
      alert('⚠️ Please fill in all fields!');
    }
  }

}
