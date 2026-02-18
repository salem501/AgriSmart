import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { Defi } from '../../models/defi.model';

@Component({
    selector: 'app-defis',
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule
    ],
    templateUrl: './defis.component.html',
    styleUrl: './defis.component.css'
})
export class DefisComponent {
    protected defis = signal<Defi[]>([
        {
            id: 1,
            titre: 'Sécheresse prolongée',
            date: this.getDateAujourdhui(),
            description: 'Manque de précipitations pendant 3 semaines consécutives affectant les cultures.',
            solutionAppliquee: 'Activation du système d\'irrigation de secours et paillage des sols.',
            resultat: 'Pertes limitées à 5% du rendement prévu.'
        },
        {
            id: 2,
            titre: 'Infestation de ravageurs',
            date: this.getDateAujourdhui(),
            description: 'Apparition de pucerons sur les cultures de légumineuses.',
            solutionAppliquee: 'Traitement biologique avec des insectes auxiliaires (coccinelles).',
            resultat: 'Infestation maîtrisée en 10 jours sans produits chimiques.'
        },
        {
            id: 3,
            titre: 'Panne du matériel',
            date: this.getDateAujourdhui(),
            description: 'Défaillance du tracteur principal pendant la période de récolte.',
            solutionAppliquee: 'Location d\'un tracteur de remplacement et réparation d\'urgence.',
            resultat: 'Retard de 2 jours sur le calendrier de récolte.'
        }
    ]);

    private defiCounter = 4;

    ajouterDefi(): void {
        const nouveauxDefis = [...this.defis()];
        nouveauxDefis.push({
            id: this.defiCounter,
            titre: `Défi ${this.defiCounter}`,
            date: this.getDateAujourdhui(),
            description: '',
            solutionAppliquee: '',
            resultat: ''
        });
        this.defiCounter++;
        this.defis.set(nouveauxDefis);
    }

    private getDateAujourdhui(): string {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
}
