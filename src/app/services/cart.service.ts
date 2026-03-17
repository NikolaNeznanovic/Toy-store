import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Privatni niz korpe
  private cart: CartItem[] = [];

  // BehaviorSubject da emitujemo promene u korpi
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  // Observable koji može da se subscribuje u komponentama
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  // Dobavi trenutni niz korpe (trenutna snapshot vrednost)
  getCart(): CartItem[] {
    return this.cart;
  }

  // Dodaj stavku u korpu
  addToCart(item: CartItem) {
    const existing = this.cart.find(ci => ci.toyID === item.toyID);
    if (existing) {
      // Ako već postoji, samo povećaj quantity i update status
      existing.quantity += item.quantity;
      existing.status = item.status;
    } else {
      this.cart.push(item);
    }
    // Emituj promenu
    this.cartSubject.next([...this.cart]);
  }

  // Ukloni stavku iz korpe po toyID
  removeFromCart(toyID: string) {
    this.cart = this.cart.filter(item => item.toyID !== toyID);
    this.cartSubject.next([...this.cart]);
  }

  // Promeni količinu
  updateQuantity(toyID: string, quantity: number) {
    const item = this.cart.find(ci => ci.toyID === toyID);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cart]);
    }
  }

  // Očisti celu korpu
  clearCart() {
    this.cart = [];
    this.cartSubject.next([...this.cart]);
  }

  // Ukupna cena
  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}