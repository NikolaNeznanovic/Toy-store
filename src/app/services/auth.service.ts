import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: UserModel[] = [
  {
    email: 'user@example.com',
    password: 'user123',
    firstName: 'Example',
    lastName: 'User',
    address: 'Beograd',
    phone: '061234123',
  } as UserModel
];
  private activeUser: UserModel | null = null;


  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.activeUser = { ...user };
      return true;
    }
    return false;
  }

 
  createUser(user: UserModel): boolean {
    if (this.existsByEmail(user.email)) return false;
    this.users.push(user);
    return true;
  }

  existsByEmail(email: string): boolean {
    return this.users.some(u => u.email === email);
  }

  logout() {
    this.activeUser = null;
  }

  isLoggedIn(): boolean {
    return this.activeUser !== null;
  }

  getActiveUser(): UserModel | null {
    return this.activeUser;
  }

  // Update user info
  updateActiveUser(updated: Partial<UserModel>) {
    if (!this.activeUser) return;
    const index = this.users.findIndex(u => u.email === this.activeUser!.email);
    if (index !== -1) {
      
      this.users[index] = { ...this.users[index], ...updated };
      this.activeUser = { ...this.users[index] };
    }
  }

 
  updatePassword(newPassword: string) {
    if (!this.activeUser) return;
    const index = this.users.findIndex(u => u.email === this.activeUser!.email);
    if (index !== -1) this.users[index].password = newPassword;
    this.activeUser.password = newPassword;
  }
}