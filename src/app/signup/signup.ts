import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alerts';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,  
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  repeat = '';
  phone = '';
  address = '';
  favoriteToysStr = '';

  constructor(private authService: AuthService, private router: Router) {}

  doSignup() {
    if (!this.email || !this.password || !this.name || !this.phone || !this.address) {
      Alerts.error('All fields should have a value!');
      return;
    }

    if (this.password.length < 6) {
      Alerts.error('Password must be at least 6 characters long!');
      return;
    }

    if (this.password !== this.repeat) {
      Alerts.error('Passwords dont match!');
      return;
    }

    const newUser: UserModel = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      favoriteToys: this.favoriteToysStr.split(',').map(t => t.trim()),
      firstName: '',
      lastName: ''
    };

    if (!this.authService.createUser(newUser)) {
      Alerts.error('Email already registered!');
      return;
    }

    Alerts.success('Uspešno ste napravili nalog!');

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}