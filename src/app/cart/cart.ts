import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // ✅ Pretplata na BehaviorSubject da uvek prikazuje nove stavke
    this.cartService.cart$.subscribe(items => {
      this.items = items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  removeItem(toyID: string) {
    this.cartService.removeFromCart(toyID);
  }

  updateQuantity(toyID: string, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(toyID, quantity);
  }

  placeOrder() {
    if (this.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert(`Order placed! Total: ${this.getTotal()} RSD`);
    this.cartService.clearCart();
  }
}