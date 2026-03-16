import { Component, OnInit, inject, signal } from '@angular/core';
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
import { ObjectifService } from '../../services/objectif/objectif.service';
import { KpiService } from '../../services/kpi/kpi.service';

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
export class ObjectifsComponent implements OnInit {
    objectifService = inject(ObjectifService);
    kpiService = inject(KpiService);

    protected objectifs = signal<Objectif[]>([]);
    protected kpis = signal<KPI[]>([]);

    ngOnInit(): void {
        this.loadObjectifs();
        this.loadKpis();
    }

    private loadObjectifs(): void {
        this.objectifService.getObjectifs().subscribe(data => this.objectifs.set(data));
    }

    private loadKpis(): void {
        this.kpiService.getKpis().subscribe(data => this.kpis.set(data));
    }

    ajouterObjectif(): void {
        const nouvelObjectif: Objectif = {
            id: 0,
            titre: '',
            details: '',
            progression: 0
        };
        this.objectifService.addObjectif(nouvelObjectif).subscribe(created => {
            const nouveauxObjectifs = [...this.objectifs()];
            nouveauxObjectifs.push(created);
            this.objectifs.set(nouveauxObjectifs);
        });
    }

    ajouterKPI(): void {
        const nouveauKpi: KPI = {
            id: 0,
            indicateur: '',
            objectifMensuel: '',
            realise: '',
            pourcentage: ''
        };
        this.kpiService.addKpi(nouveauKpi).subscribe(created => {
            const nouveauxKPIs = [...this.kpis()];
            nouveauxKPIs.push(created);
            this.kpis.set(nouveauxKPIs);
        });
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
