import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrderComponent {}