/*import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToyService } from '../services/toy.service';
import { ToyModel } from '../../models/toy.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,  // za *ngIf, *ngFor
    FormsModule    // za [(ngModel)]
  ],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class Order {
  toy = signal<ToyModel | null>(null);

  order: { count: number; giftWrap: boolean } = {
    count: 1,
    giftWrap: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toyService: ToyService
  ) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.toyService.getToyById(id).subscribe(t => this.toy.set(t || null));
    });
  }

  calculateTotal(): number {
    if (!this.toy()) return 0;
    let total = this.toy()!.price * this.order.count;
    if (this.order.giftWrap) total += 50; // dodatak za pakovanje
    return total;
  }

  placeOrder() {
    console.log('Order:', this.order);
    console.log('Toy:', this.toy());
    alert(`Order placed! Total: ${this.calculateTotal()} RSD`);
    this.router.navigate(['/']);
  }
}
*/