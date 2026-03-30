import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evenement } from '../../models/evenement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/evenements';

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  addEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.apiUrl, evenement);
  }

  updateEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${evenement.id}`, evenement);
  }

  deleteEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/report`, { responseType: 'blob' });
  }
}
