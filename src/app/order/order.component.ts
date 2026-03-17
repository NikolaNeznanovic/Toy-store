import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToyService } from '../services/toy.service';
import { ToyModel } from '../../models/toy.model';
import { CartService } from '../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrderComponent {

  toy = signal<ToyModel | null | undefined>(undefined);
  loading = signal<boolean>(true); // loading state
  order: Partial<{count: number, giftWrap: boolean}> = { count: 1, giftWrap: false };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toyService: ToyService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    // Provera da li je korisnik ulogovan
    if (!this.authService.isLoggedIn()) {
      alert('Morate biti prijavljeni da biste dodali proizvod u korpu!');
      this.router.navigate(['/login']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('toyId')!;
    this.toyService.getToyById(id).subscribe({
      next: (toy) => {
        this.toy.set(toy);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('API error:', err);
        this.toy.set(null);
        this.loading.set(false);
      }
    });
  }

  // Funkcija za pun URL slike koja radi i ako je imageUrl undefined
  getImageUrl(toy: ToyModel | null | undefined): string {
    if (!toy?.imageUrl) return 'https://toy.pequla.com/img/1.png';
    return toy.imageUrl.startsWith('http')
      ? toy.imageUrl
      : `https://toy.pequla.com${toy.imageUrl}`;
  }

  calculateTotal(): number {
    if (!this.toy() || this.toy() === null) return 0;
    let total = this.toy()!.price * (this.order.count || 1);
    if (this.order.giftWrap) total += 50; // dodatak za gift wrap
    return total;
  }

  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      alert('Morate biti prijavljeni da biste dodali proizvod u korpu!');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.toy() || this.toy() === null) return;

    const fullImageUrl = this.getImageUrl(this.toy());

    const item: CartItem = {
      imageUrl: fullImageUrl, // pun URL slike
      toyID: this.toy()!.toyId.toString(),
      name: this.toy()!.name,
      price: this.toy()!.price,
      quantity: this.order.count || 1,
      status: 'rezervisano',
      giftWrap: this.order.giftWrap
    };

    this.cartService.addToCart(item);
    alert(`Item added to cart! Total: ${this.calculateTotal()} RSD`);
    this.router.navigate(['/cart']);
  }
}