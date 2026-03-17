import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true, // važno za standalone setup
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterOutlet,
    RouterLink
  ]
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(public authService: AuthService, private router: Router) {}

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}