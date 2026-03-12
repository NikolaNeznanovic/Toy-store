import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToyService } from '../services/toy.service';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  allToys: any[] = [];
  currentIndex: number = 0;
  toy: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private toyService: ToyService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const toyId = Number(params.get('toyId'));
          return this.toyService.getToys();
        })
      )
      .subscribe((data: any[]) => {

  this.allToys = data;   // ← OVO FALI

  const toyId = Number(this.route.snapshot.paramMap.get('toyId'));

  this.currentIndex = data.findIndex(t => t.toyId === toyId); // ← i ovo

  const foundToy = data[this.currentIndex];

  this.toy = foundToy ? { ...foundToy } : null;

  if (this.toy && this.toy.imageUrl && this.toy.imageUrl.startsWith('/')) {
    this.toy.imageUrl = 'https://toy.pequla.com' + this.toy.imageUrl;
  }

  this.cdr.detectChanges();
});
  }
  nextToy(){
    if(this.currentIndex < this.allToys.length - 1){
      this.currentIndex++;
      this.toy = this.allToys[this.currentIndex];
    }
  }
  prevToy() {
    if(this.currentIndex > 0){
      this.currentIndex --;
      this.toy = this.allToys[this.currentIndex];
    }
  }

  isLoggedIn(): boolean {
    return !!this.authService.getActiveUser();
  }
}

