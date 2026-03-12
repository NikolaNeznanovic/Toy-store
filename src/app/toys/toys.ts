import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toys',
  standalone: true,
  templateUrl: './toys.html',
  styleUrls: ['./toys.css'], // obavezno dodaj ovde
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ToysComponent {
  toys: any[] = [];
  loading = true;

  constructor(private toyService: ToyService, public authService: AuthService) {}

  ngOnInit() {
    this.toyService.getToys().subscribe(data => {
      this.toys = data;
      this.loading = false;
    });
  }

  addToCart(toy: any) {
    if(this.authService.isLoggedIn()) {
      console.log('Dodato u korpu:', toy);
    } else {
      alert('Morate biti prijavljeni da biste dodali proizvod u korpu!');
    }
  }
}