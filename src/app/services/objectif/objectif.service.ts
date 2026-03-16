import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objectif } from '../../models/objectif.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectifService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/objectifs';

  getObjectifs(): Observable<Objectif[]> {
    return this.http.get<Objectif[]>(this.apiUrl);
  }

  addObjectif(objectif: Objectif): Observable<Objectif> {
    return this.http.post<Objectif>(this.apiUrl, objectif);
  }

  updateObjectif(objectif: Objectif): Observable<Objectif> {
    return this.http.put<Objectif>(`${this.apiUrl}/${objectif.id}`, objectif);
  }

  deleteObjectif(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
