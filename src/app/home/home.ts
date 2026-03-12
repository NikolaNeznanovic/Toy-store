import { Component } from '@angular/core';
import { ToyService } from '../services/toy.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'], // ispravno je styleUrls (plural)
  imports: [
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class HomeComponent{
  toys: any[] = [];
  loading = true;

  constructor(
    public toyService: ToyService,
    public authService: AuthService // ovde se ubacuje servis
  ) {}

  ngOnInit() {
    this.toyService.getToys().subscribe(data => {
      this.toys = data.slice(0, 16).map((toy: any) => ({
        ...toy,
        id: toy.id ?? toy.toyId ?? toy.productId,
        reviews: toy.reviews || []
      }));
      this.loading = false;
    });
  }
}
