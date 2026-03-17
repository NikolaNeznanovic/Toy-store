import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToyModel } from '../../models/toy.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToyService {
  private baseUrl = 'https://toy.pequla.com/api';

  constructor(private http: HttpClient) {}

  getToys(): Observable<ToyModel[]> {
    return this.http.get<ToyModel[]>(`${this.baseUrl}/toy`);
  }

  getToyById(id: string): Observable<ToyModel> {
    return this.http.get<ToyModel>(`${this.baseUrl}/toy/${id}`);
  }
}