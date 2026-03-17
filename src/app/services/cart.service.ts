import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cart: CartItem[] = [];


  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);


  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();


  getCart(): CartItem[] {
    return this.cart;
  }


  addToCart(item: CartItem) {
    const existing = this.cart.find(ci => ci.toyID === item.toyID);
    if (existing) {

      existing.quantity += item.quantity;
      existing.status = item.status;
    } else {
      this.cart.push(item);
    }

    this.cartSubject.next([...this.cart]);
  }


  removeFromCart(toyID: string) {
    this.cart = this.cart.filter(item => item.toyID !== toyID);
    this.cartSubject.next([...this.cart]);
  }


  updateQuantity(toyID: string, quantity: number) {
    const item = this.cart.find(ci => ci.toyID === toyID);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }


  clearCart() {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }


  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}