import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ToyService {

  private apiUrl = 'https://toy.pequla.com/api/toy'; // ispravan endpoint

  constructor(private http: HttpClient) {}

  getToys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(toys => toys.map(t => {
        if (t.imageUrl && t.imageUrl.startsWith('/')) {
          t.imageUrl = 'https://toy.pequla.com' + t.imageUrl;
        }
        return t;
      }))
    );
  }
}


