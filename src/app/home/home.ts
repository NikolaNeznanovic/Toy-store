import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ToyModel } from '../../models/toy.model';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  search = '';
  description = '';
  type = '';
  age = '';
  target = '';
  productionYear: string = '';
  noToysMessage: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  userRating: number | null = null;
  userReview: string = '';
  randomRatings: Record<string, number> = {};
  toys = signal<ToyModel[]>([]);
  filteredToys = signal<ToyModel[]>([]);

  constructor(
    public authService: AuthService,
    public toyService: ToyService
  ) {
    this.toyService.getToys().subscribe({
      next: (data) => {
        data.forEach(t => {
          if (!t.ratings) t.ratings = [];
          if (!t.userReviews) t.userReviews = [];
        });
        this.toys.set(data);
        this.filteredToys.set(data);
      },
      error: (err: any) => console.error(err)
    });
  }

  getTypes(): string[] {
    return [...new Set(this.toys().map(t => t.type?.name))];
  }

  getAges(): string[] {
    return [...new Set(this.toys().map(t => t.ageGroup?.name))];
  }

  getTargets(): string[] {
    return [...new Set(this.toys().map(t => t.targetGroup))];
  }

  canRate(toy: ToyModel): boolean {
    const activeUser = this.authService.getActiveUser();
    if (!activeUser) return false;
    const cart: CartItem[] = (activeUser as any).cart || [];
    return cart.some(c => c.toyID === toy.toyId && c.status === 'pristiglo');
  }

  submitReview(toy: ToyModel) {
    const activeUser = this.authService.getActiveUser();
    if (!activeUser || !this.userRating || !this.userReview.trim()) return;

    if (!toy.ratings) toy.ratings = [];
    toy.ratings.push({
      userId: activeUser.email,
      value: this.userRating,
      createdAt: new Date().toISOString()
    });

    if (!toy.userReviews) toy.userReviews = [];
    toy.userReviews.push({
      userId: activeUser.email,
      reviewerName: (activeUser as any).name,
      comment: this.userReview,
      createdAt: new Date().toISOString()
    });

    this.userRating = null;
    this.userReview = '';

    this.filteredToys.set([...this.filteredToys()]);
  }

  filter() {
    const min = this.minPrice != null ? Number(this.minPrice) : null;
    const max = this.maxPrice != null ? Number(this.maxPrice) : null;

    const filtered = this.toys().filter(t => {
      const price = Number(t.price);
      const toyYear = t.productionDate ? new Date(t.productionDate).getFullYear() : null;

      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;

      if (this.search && !t.name.toLowerCase().includes(this.search.toLowerCase())) return false;
      if (this.description && !t.description.toLowerCase().includes(this.description.toLowerCase())) return false;
      if (this.type && t.type?.name !== this.type) return false;
      if (this.age && t.ageGroup?.name !== this.age) return false;
      if (this.target && t.targetGroup !== this.target) return false;
      if (this.productionYear && toyYear !== Number(this.productionYear)) return false;

      return true;
    });

    this.filteredToys.set(filtered);

    if (filtered.length === 0) {
      this.noToysMessage = 'No toys available for the selected filters';
    } else {
      this.noToysMessage = '';
    }
  }

  getImageUrl(toy: ToyModel): string {
    if (!toy.imageUrl) return 'https://toy.pequla.com/img/1.png';
    return toy.imageUrl.startsWith('http') ? toy.imageUrl : `https://toy.pequla.com${toy.imageUrl}`;
  }

  goHome() {
    this.noToysMessage = '';
    this.filteredToys.set(this.toys()); 
  }

  // ⭐ NOVO - prosečna ocena
getRating(toy: ToyModel): number {
  if (toy.ratings && toy.ratings.length > 0) {
    const avg = toy.ratings.reduce((sum, r) => sum + r.value, 0) / toy.ratings.length;
    return Math.round(avg);
  }

  // 👉 ako nema ocena → random
  if (!this.randomRatings[toy.toyId]) {
    this.randomRatings[toy.toyId] = Math.floor(Math.random() * 5) + 1;
  }

  return this.randomRatings[toy.toyId];
}

rateToy(toy: ToyModel, rating: number) {
  if (!this.authService.isLoggedIn()) {
    alert('Morate biti ulogovani!');
    return;
  }

  const user = this.authService.getActiveUser()!; 

  if (!toy.ratings) toy.ratings = [];

  const alreadyRated = toy.ratings.some(r => r.userId === user.email);
  if (alreadyRated) {
    alert('Već ste ocenili ovaj proizvod!');
    return;
  }

  toy.ratings.push({
    userId: user.email, 
    value: rating,
    createdAt: new Date().toISOString()
  });

  this.filteredToys.set([...this.filteredToys()]);
}
getReviewCount(toy: ToyModel): number {
  return toy.ratings ? toy.ratings.length : 0;
}
}