import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonUrl = 'assets/Data/profile.json'; // path to your JSON file

  // Keep an in-memory copy so add/delete work during app runtime
  private usersSubject = new BehaviorSubject<any[]>([]);
  private users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialUsers();
  }

  private loadInitialUsers(): void {
    this.http.get<any[]>(this.jsonUrl).subscribe({
      next: (data) => this.usersSubject.next(Array.isArray(data) ? data : []),
      error: (err) => {
        console.error('Failed to load users from JSON:', err);
        this.usersSubject.next([]);
      }
    });
  }

  // Get all users as an observable that updates when add/delete happen
  getUsers(): Observable<any[]> {
    return this.users$;
  }

  // Get user by ID from the in-memory list
  getUserById(id: number): Observable<any> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  // Add a new user (keeps changes in-memory during the app session)
  addUser(newUser: any): void {
    const users = this.usersSubject.getValue() || [];
    const maxId = users.length ? Math.max(...users.map(u => u.id || 0)) : 0;
    const id = newUser.id && newUser.id > 0 ? newUser.id : maxId + 1;
    const userToAdd = { ...newUser, id };
    this.usersSubject.next([...users, userToAdd]);
    console.info('User added (in-memory):', userToAdd);
  }

  // Delete user (keeps changes in-memory during the app session)
  deleteUser(id: number): void {
    const users = this.usersSubject.getValue() || [];
    const updated = users.filter(u => u.id !== id);
    this.usersSubject.next(updated);
    console.info('User deleted (in-memory):', id);
  }

  // Update user in-memory
  updateUser(id: number, changes: any): void {
    const users = this.usersSubject.getValue() || [];
    const updated = users.map(u => (u.id === id ? { ...u, ...changes } : u));
    this.usersSubject.next(updated);
    console.info('User updated (in-memory):', id, changes);
  }

}
