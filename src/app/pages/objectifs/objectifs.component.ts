import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Objectif, KPI } from '../../models/objectif.model';

@Component({
    selector: 'app-objectifs',
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        InputTextModule,
        TextareaModule,
        ProgressBar,
        ButtonModule,
        DividerModule,
        TagModule,
        FloatLabelModule
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

    getTagSeverity(progression: number): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        if (progression >= 75) return 'success';
        if (progression >= 40) return 'info';
        return 'warn';
    }
}
