import { Routes } from '@angular/router';
import { Home} from './home/home';
import { ToysComponent } from './toys/toys';
import { About } from './about/about';
import { CartComponent } from './cart/cart';
import { DetailsComponent } from './details/details';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { UserComponent } from './user/user';

export const routes: Routes = [
  { path: '', component: Home},  
  { path: 'about', component: About },             
  { path: 'toys', component: ToysComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details/:toyId', component: DetailsComponent },
  { path: 'details/:toyId/order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserComponent },
                        
];