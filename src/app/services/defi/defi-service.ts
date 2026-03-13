import { Injectable } from '@angular/core';
import {Defi} from '../../models/defi.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DefiService {
  private mockDefis: Defi[] = [
    { id: 1, titre: 'Defi 1', date: '2025-12-01', description: 'd1', solutionAppliquee: 'solution 1', resultat:'resultat 1' },
    { id: 2, titre: 'Defi 2', date: '2025-11-02', description: 'd2', solutionAppliquee: 'solution 2', resultat:'resultat 2' },
    { id: 3, titre: 'Defi 3', date: '2025-10-03', description: 'd3', solutionAppliquee: 'solution 3', resultat:'resultat 3' },
  ];

  getUsers(): Observable<Defi[]> {
    return of(this.mockDefis);
  }

  addDefi(defi: Defi): Observable<Defi> {
    const newId = this.mockDefis.length > 0 ? Math.max(...this.mockDefis.map(d => d.id)) + 1 : 1;
    const newDefi = { ...defi, id: newId };
    this.mockDefis.push(newDefi);
    return of(newDefi);
  }

  updateDefi(defi: Defi): Observable<Defi> {
    const index = this.mockDefis.findIndex(d => d.id === defi.id);
    if (index !== -1) {
      this.mockDefis[index] = { ...defi };
    }
    return of(defi);
  }

  deleteDefi(id: number): Observable<boolean> {
    const index = this.mockDefis.findIndex(d => d.id === id);
    if (index !== -1) {
      this.mockDefis.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
