import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KPI } from '../../models/objectif.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/kpis';

  getKpis(): Observable<KPI[]> {
    return this.http.get<KPI[]>(this.apiUrl);
  }

  addKpi(kpi: KPI): Observable<KPI> {
    return this.http.post<KPI>(this.apiUrl, kpi);
  }

  updateKpi(kpi: KPI): Observable<KPI> {
    return this.http.put<KPI>(`${this.apiUrl}/${kpi.id}`, kpi);
  }

  deleteKpi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
