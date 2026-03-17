import { Component, signal, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { Loading } from '../loading/loading';
import { Alerts } from '../alerts';
import { UserModel } from '../../models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    NgIf,
    
    
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent implements OnInit {
  activeUser: UserModel | null = null;
  destinations = signal<string[]>(['Puzzle', 'Figures', 'Books', 'All']); // primer favorite toys
  oldPassword = '';
  newPassword = '';
  passRepeat = '';

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.activeUser = this.authService.getActiveUser();
    if (!this.activeUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`;
  }

  updateUser() {
    Alerts.confirm('Are you sure you want to update user info?', () => {
      this.authService.updateActiveUser({
        firstName: this.activeUser!.firstName,
        lastName: this.activeUser!.lastName,
        address: this.activeUser!.address,
        phone: this.activeUser!.phone,
        
      });
      Alerts.success('User updated successfully');
    });
  }

  updatePassword() {
    Alerts.confirm('Are you sure you want to change the password?', () => {
      if (this.oldPassword !== this.activeUser?.password) {
        Alerts.error('Invalid old password');
        return;
      }
      if (this.newPassword.length < 6) {
        Alerts.error('Password must be at least 6 characters long');
        return;
      }
      if (this.newPassword !== this.passRepeat) {
        Alerts.error('Passwords do not match');
        return;
      }
      if (this.newPassword === this.activeUser?.password) {
        Alerts.error('New password cannot be the same as old password');
        return;
      }

      this.authService.updatePassword(this.newPassword);
      Alerts.success('Password updated successfully');
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }
}

