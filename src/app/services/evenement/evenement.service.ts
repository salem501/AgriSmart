import { Injectable } from '@angular/core';
import { Evenement } from '../../models/evenement.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private mockEvenements: Evenement[] = [
    { id: 1, date: this.getDateAujourdhui(), nom: 'Semis de printemps', details: 'Plantation des cultures de printemps dans les parcelles nord.' },
    { id: 2, date: this.getDateAujourdhui(), nom: 'Traitement phytosanitaire', details: 'Application des traitements préventifs contre les maladies fongiques.' },
    { id: 3, date: this.getDateAujourdhui(), nom: 'Irrigation programmée', details: 'Mise en route du système d\'irrigation automatique.' },
    { id: 4, date: this.getDateAujourdhui(), nom: 'Bilan mensuel', details: 'Réunion d\'équipe pour évaluer les résultats du mois.' }
  ];

  private getDateAujourdhui(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getEvenements(): Observable<Evenement[]> {
    return of(this.mockEvenements);
  }

  addEvenement(evenement: Evenement): Observable<Evenement> {
    const newId = this.mockEvenements.length > 0 ? Math.max(...this.mockEvenements.map(e => e.id)) + 1 : 1;
    const newEvenement = { ...evenement, id: newId };
    this.mockEvenements.push(newEvenement);
    return of(newEvenement);
  }

  updateEvenement(evenement: Evenement): Observable<Evenement> {
    const index = this.mockEvenements.findIndex(e => e.id === evenement.id);
    if (index !== -1) {
      this.mockEvenements[index] = { ...evenement };
    }
    return of(evenement);
  }

  deleteEvenement(id: number): Observable<boolean> {
    const index = this.mockEvenements.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockEvenements.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
