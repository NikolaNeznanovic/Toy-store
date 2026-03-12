import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: { name: string } | null = null;

  login(name: string) {
    this.user = { name };
  }

  logout() {
    this.user = null;
  }

  getActiveUser() {
    return this.user;
  }

  // Dodaj ovu metodu
  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
