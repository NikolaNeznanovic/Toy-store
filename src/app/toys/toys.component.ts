/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ToyService } from '../services/toy.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
@Component({
  selector: 'app-toys',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIcon,
    MatAnchor,
    MatProgressSpinner
], 
   templateUrl: './toys.html',
  styleUrls: ['./toys.css']
})
export class ToysComponent {

  toys: any[] = [];
  searchText: string = '';      
filteredToys: any[] = [];
loading: boolean = false;
onImageError: any;


constructor(private toyService: ToyService) {}

  ngOnInit() {
    this.toyService.getToys().subscribe(data => {
      this.toys = data;
    });
  }
 
  addToCart(toy: any) {
  console.log('Dodato u korpu:', toy);
}

/*filterToys() {
  this.loading = true;  // ako koristiš spinner
  this.toyService.searchToys(this.searchText).subscribe({
    next: data => {
      this.filteredToys = data;
      this.loading = false;
    },
    error: err => {
      console.error(err);
      this.loading = false;
    }
  });
}

}
*/

