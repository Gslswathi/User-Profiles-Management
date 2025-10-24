import { Injectable } from '@angular/core';
export interface User {
  id: number;
  name: string;
  email: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
// Sample data to simulate database
  private users: User[] = [
    { id: 1, name: 'Dave Richards', email: 'dave@mail.com' },
    { id: 2, name: 'Abhishek Hari', email: 'hari@mail.com' },
    { id: 3, name: 'Nishta Gupta', email: 'nishta@mail.com' }
  ];

  // Get all users
  getUsers() {
    return this.users;
  }

  // Get user by ID
  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  // Add a new user
  addUser(user: User) {
    this.users.push({ ...user, id: this.users.length + 1 });
  }

  // Delete user
  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

}
