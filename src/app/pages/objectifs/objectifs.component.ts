import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Objectif, KPI } from '../../models/objectif.model';

@Component({
    selector: 'app-objectifs',
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDividerModule,
        MatChipsModule
    ],
    templateUrl: './objectifs.component.html',
    styleUrl: './objectifs.component.css'
})
export class ObjectifsComponent {
    protected objectifs = signal<Objectif[]>([
        { id: 1, titre: 'Augmenter le rendement des cultures', details: 'Optimiser l\'irrigation et la fertilisation pour améliorer la productivité.', progression: 100 },
        { id: 2, titre: 'Réduire les coûts opérationnels', details: 'Identifier et éliminer les dépenses inutiles dans la chaîne de production.', progression: 78 },
        { id: 3, titre: 'Améliorer la qualité des produits', details: 'Mettre en place des contrôles qualité rigoureux à chaque étape.', progression: 30 }
    ]);

    protected kpis = signal<KPI[]>([
        { id: 1, indicateur: 'Rendement (t/ha)', objectifMensuel: '5', realise: '5', pourcentage: '100%' },
        { id: 2, indicateur: 'Coût par unité (€)', objectifMensuel: '2.5', realise: '1.95', pourcentage: '78%' },
        { id: 3, indicateur: 'Taux de qualité (%)', objectifMensuel: '95', realise: '28.5', pourcentage: '30%' },
        { id: 4, indicateur: 'Surface traitée (ha)', objectifMensuel: '', realise: '', pourcentage: '' }
    ]);

    protected displayedColumns = ['indicateur', 'objectifMensuel', 'realise', 'pourcentage'];

    private objectifCounter = 4;
    private kpiCounter = 5;

    ajouterObjectif(): void {
        const nouveauxObjectifs = [...this.objectifs()];
        nouveauxObjectifs.push({
            id: this.objectifCounter++,
            titre: '',
            details: '',
            progression: 0
        });
        this.objectifs.set(nouveauxObjectifs);
    }

    ajouterKPI(): void {
        const nouveauxKPIs = [...this.kpis()];
        nouveauxKPIs.push({
            id: this.kpiCounter++,
            indicateur: '',
            objectifMensuel: '',
            realise: '',
            pourcentage: ''
        });
        this.kpis.set(nouveauxKPIs);
    }

    calculerPourcentage(kpi: KPI): void {
        const objectif = parseFloat(kpi.objectifMensuel) || 0;
        const realise = parseFloat(kpi.realise) || 0;
        if (objectif > 0) {
            const pourcentage = Math.round((realise / objectif) * 100);
            kpi.pourcentage = pourcentage + '%';
        } else {
            kpi.pourcentage = '';
        }
    }

    getProgressColor(progression: number): 'primary' | 'accent' | 'warn' {
        if (progression >= 75) return 'primary';
        if (progression >= 40) return 'accent';
        return 'warn';
    }
}
