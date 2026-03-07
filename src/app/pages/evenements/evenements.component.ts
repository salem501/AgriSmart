import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Evenement } from '../../models/evenement.model';

@Component({
    selector: 'app-evenements',
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        DatePickerModule,
        FloatLabelModule
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
