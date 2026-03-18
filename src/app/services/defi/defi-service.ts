import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Defi} from '../../models/defi.model';
import {Observable} from 'rxjs';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class DefiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/defis';

  getDefis(page: number = 0, size: number = 10): Observable<PageResponse<Defi>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<Defi>>(this.apiUrl, { params });
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
