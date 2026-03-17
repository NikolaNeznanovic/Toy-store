import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';
import { ToyModel } from '../../models/toy.model';

@Component({
  selector: 'app-toys',
  standalone: true,
  templateUrl: './toys.html',
  styleUrls: ['./toys.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ToysComponent implements OnInit {

  toys: ToyModel[] = [];
  loading = true;

  constructor(
    private toyService: ToyService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.toyService.getToys().subscribe({
      next: (data) => {
        this.toys = data;
        this.loading = false;
        console.log('Toys loaded:', this.toys);
      },
      error: (err) => {
        console.error('Greška pri učitavanju igračaka:', err);
        this.loading = false;
      }
    });
  }

  addToCart(toy: ToyModel) {
    if (this.authService.isLoggedIn()) {
      console.log('Dodato u korpu:', toy);
    } else {
      alert('Morate biti prijavljeni da biste dodali proizvod u korpu!');
    }
  }

  
  getImageUrl(toy: ToyModel): string {
    const img = toy.imageUrl ?? 1;             
    return `https://toy.pequla.com/img/${img}.png`;
  }

  
  onImageError(event: any) {
    event.target.src = 'https://toy.pequla.com/img/1.png';
  }
}