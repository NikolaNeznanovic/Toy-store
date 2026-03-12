import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,      // obavezno za <router-outlet>
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [AuthService],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
 

  constructor(public authService: AuthService) {}

  doLogout() {
    this.authService.logout();
  }
}