import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  isLoggedIn = computed(() => this.currentUser() !== null);

  private mockUsers: User[] = [
    { id: 1, username: 'admin', email: 'admin@marketplace.com' },
    { id: 2, username: 'user', email: 'user@marketplace.com' },
  ];

  constructor() {
    this.loadUserFromStorage();
  }

  login(username: string): boolean {
    const currentUser = this.mockUsers.find((user) => user.username === username);

    if (currentUser) {
      this.currentUserSignal.set(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
  }

  loadUserFromStorage(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        this.currentUserSignal.set(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  getMockUsers(): User[] {
    return this.mockUsers;
  }
}
