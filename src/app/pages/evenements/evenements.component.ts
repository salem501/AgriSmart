import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { Evenement } from '../../models/evenement.model';

@Component({
    selector: 'app-evenements',
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule
    ],
    templateUrl: './evenements.component.html',
    styleUrl: './evenements.component.css'
})
export class EvenementsComponent {
    protected evenements = signal<Evenement[]>([
        { id: 1, semaine: 'Semaine 1', date: this.getDateAujourdhui(), nom: 'Semis de printemps', details: 'Plantation des cultures de printemps dans les parcelles nord.' },
        { id: 2, semaine: 'Semaine 2', date: this.getDateAujourdhui(), nom: 'Traitement phytosanitaire', details: 'Application des traitements préventifs contre les maladies fongiques.' },
        { id: 3, semaine: 'Semaine 3', date: this.getDateAujourdhui(), nom: 'Irrigation programmée', details: 'Mise en route du système d\'irrigation automatique.' },
        { id: 4, semaine: 'Semaine 4', date: this.getDateAujourdhui(), nom: 'Bilan mensuel', details: 'Réunion d\'équipe pour évaluer les résultats du mois.' }
    ]);

    private evenementCounter = 5;

    ajouterEvenement(): void {
        const nouveauxEvenements = [...this.evenements()];
        nouveauxEvenements.push({
            id: this.evenementCounter,
            semaine: `Semaine ${this.evenementCounter}`,
            date: this.getDateAujourdhui(),
            nom: '',
            details: ''
        });
        this.evenementCounter++;
        this.evenements.set(nouveauxEvenements);
    }

    private getDateAujourdhui(): string {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
}
