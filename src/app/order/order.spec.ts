import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ToyService } from '../services/toy.service';
import { ToyModel } from '../../models/toy.model';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-toy-order',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class ToyOrder {

  toy = signal<ToyModel | null | undefined>(undefined); // undefined = učitavanje, null = ne postoji

  order: Partial<OrderModel> = {
    count: 1,
    giftWrap: false
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toyService: ToyService
  ) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.toyService.getToyById(id).subscribe({
        next: (toy) => this.toy.set(toy || null),
        error: (err) => {
          console.error('API error:', err);
          this.toy.set(null);
        }
      });
    });
  }

  calculateTotal(): number {
    if (!this.toy() || this.toy() === null) return 0;
    let total = this.toy()!.price * (this.order.count || 1);
    if (this.order.giftWrap) total += 50; // dodatak za pakovanje
    return total;
  }

  placeOrder() {
    if (!this.toy() || this.toy() === null) return;
    console.log('ORDER:', this.order);
    console.log('TOY:', this.toy());
    alert(`Order placed! Total: ${this.calculateTotal()} RSD`);
    this.router.navigate(['/']);
  }
}