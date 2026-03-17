import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  toy = signal<any | null>(null);
  loading = signal(true);

  // Za review
  newRating: number = 5;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private toyService: ToyService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService 
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('toyId')!;
    this.toyService.getToyById(id).subscribe({
      next: (data) => {
        // 🆕 Učitaj review-e iz localStorage
        const saved = localStorage.getItem('reviews_' + data.toyId);
        if (saved) {
          data.reviews = JSON.parse(saved);
        }
        this.toy.set(data);
        this.loading.set(false);
      },
      error: (err) => {  // ⬅ ispravno
        console.error('API error:', err);
        this.toy.set(null);
        this.loading.set(false);
      }
    });
  }

  orderToy() {
    if (!this.authService.isLoggedIn()) {
      alert('Morate biti ulogovani da biste poručili igračku!');
      return;
    }

    const item = {
      toyID: this.toy()!.toyId,
      name: this.toy()!.name,
      price: this.toy()!.price,
      quantity: 1,
      imageUrl: this.getImageUrl(),
      status: "rezervisano" as "rezervisano" | "pristiglo" | "otkazano",
      giftWrap: false
    };

    this.cartService.addToCart(item);
    alert(`${this.toy()!.name} dodato u korpu!`);
    this.router.navigate(['/cart']);
  }

  getImageUrl(): string {
    if (!this.toy() || !this.toy()!.imageUrl) {
      return 'assets/default-toy.png';
    }
    return this.toy()!.imageUrl.startsWith('http')
      ? this.toy()!.imageUrl
      : 'https://toy.pequla.com' + this.toy()!.imageUrl;
  }

  canReview(): boolean {
    return this.cartService.getCart().some(item =>
      item.toyID === this.toy()?.toyId &&
      item.status === 'pristiglo'
    );
  }

  addReview() {
    if (!this.toy()) return;

    if (!this.toy()!.reviews) {
      this.toy()!.reviews = [];
    }

    // 🆕 Ne dozvoli više ocena istog korisnika
    if (this.toy()!.reviews.length > 0) {
      alert('Već ste ocenili ovaj proizvod!');
      return;
    }

    this.toy()!.reviews.push({
      rating: this.newRating,
      comment: this.newComment
    });

    this.newComment = '';
    this.newRating = 5;

    alert('Uspešno ste ocenili proizvod!');

    
    localStorage.setItem(
      'reviews_' + this.toy()!.toyId,
      JSON.stringify(this.toy()!.reviews)
    );
  }
}
