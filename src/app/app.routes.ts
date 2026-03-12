import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ToysComponent } from './toys/toys';
import { CartComponent } from './cart/cart';
import { DetailsComponent } from './details/details';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'toys', component: ToysComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details/:toyId', component: DetailsComponent },
  { path: 'details/:toyId/order', component: OrderComponent },
  { path: '**', redirectTo: 'home' } // fallback
];