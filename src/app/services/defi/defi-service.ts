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

}
