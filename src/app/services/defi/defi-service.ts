import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Defi} from '../../models/defi.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DefiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/defis';

  getDefis(): Observable<Defi[]> {
    return this.http.get<Defi[]>(this.apiUrl);
  }

  addDefi(defi: Defi): Observable<Defi> {
    return this.http.post<Defi>(this.apiUrl, defi);
  }

  updateDefi(defi: Defi): Observable<Defi> {
    return this.http.put<Defi>(`${this.apiUrl}/${defi.id}`, defi);
  }

  deleteDefi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
