import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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
export class LoginComponent {
  email = 'user@example.com';
  password = 'user123';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']); // automatski na home ako je ulogovan
    }
  }

  doLogin() {
    if (this.authService.login(this.email, this.password)) {
      Alerts.success('Uspesno ste se ulogovali!');
      this.router.navigate(['/']); // Home stranica posle login-a
    } else {
      Alerts.error('Neispravan email ili lozinka!');
    }
  }
}