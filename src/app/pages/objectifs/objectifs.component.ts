import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBar } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Objectif, KPI } from '../../models/objectif.model';
import { ObjectifService } from '../../services/objectif/objectif.service';
import { KpiService } from '../../services/kpi/kpi.service';

import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, ColDef, themeQuartz, GridReadyEvent, GridApi } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

type ViewMode = 'list' | 'add_objectif' | 'edit_objectif' | 'details_objectif' | 'add_kpi' | 'edit_kpi' | 'details_kpi';

@Component({
    selector: 'app-objectifs',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        TextareaModule,
        ProgressBar,
        ButtonModule,
        TagModule,
        FloatLabelModule,
        AgGridAngular
    ],
    standalone: true,
    templateUrl: './objectifs.component.html',
    styleUrl: './objectifs.component.css'
})
export class ObjectifsComponent implements OnInit {
    objectifService = inject(ObjectifService);
    kpiService = inject(KpiService);
    cdr = inject(ChangeDetectorRef);

    private gridApiObjectifs!: GridApi;
    private gridApiKpis!: GridApi;

    viewMode: ViewMode = 'list';
    selectedObjectif: Objectif | null = null;
    selectedKpi: KPI | null = null;

    theme = themeQuartz;
    objectifsList: Objectif[] = [];
    kpisList: KPI[] = [];

    colDefsObjectifs: ColDef[] = [
        { field: 'titre', headerName: 'Titre', minWidth: 150 },
        { field: 'progression', headerName: 'Progression (%)', width: 150 },
        { field: 'details', headerName: 'Détails', flex: 1, minWidth: 200 }
    ];

    colDefsKpis: ColDef[] = [
        { field: 'indicateur', headerName: 'Indicateur', minWidth: 150 },
        { field: 'objectifMensuel', headerName: 'Objectif Mensuel', width: 150 },
        { field: 'realise', headerName: 'Réalisé', width: 150 },
        { field: 'pourcentage', headerName: '% Réalisation', minWidth: 150 }
    ];

    defaultColDef = {
        filter: true,
        filterParams: { buttons: ['clear', 'apply'], closeOnApply: true }
    };

    ngOnInit(): void {
        this.loadObjectifs();
        this.loadKpis();
    }

    loadObjectifs() {
        this.objectifService.getObjectifs().subscribe(data => {
            this.objectifsList = data;
        });
    }

    loadKpis() {
        this.kpiService.getKpis().subscribe(data => {
            this.kpisList = data;
        });
    }

    onGridReadyObjectifs(params: GridReadyEvent) {
        this.gridApiObjectifs = params.api;
    }

    onGridReadyKpis(params: GridReadyEvent) {
        this.gridApiKpis = params.api;
    }

    showList() {
        this.viewMode = 'list';
        this.selectedObjectif = null;
        this.selectedKpi = null;
        this.loadObjectifs();
        this.loadKpis();
    }

    // --- OBJECTIF WORKFLOW ---

    showAddObjectifForm() {
        this.selectedObjectif = { titre: '', details: '', progression: 0 };
        this.viewMode = 'add_objectif';
    }

    onObjectifRowClicked(event: any) {
        this.selectedObjectif = { ...event.data };
        this.viewMode = 'details_objectif';
    }

    editObjectif() {
        this.viewMode = 'edit_objectif';
    }

    deleteObjectif() {
        if (this.selectedObjectif && this.selectedObjectif.id) {
            this.objectifService.deleteObjectif(this.selectedObjectif.id).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        }
    }

    saveObjectif() {
        if (!this.selectedObjectif) return;

        if (this.viewMode === 'add_objectif') {
            this.objectifService.addObjectif(this.selectedObjectif).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        } else if (this.viewMode === 'edit_objectif') {
            this.objectifService.updateObjectif(this.selectedObjectif).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        }
    }

    // --- KPI WORKFLOW ---

    showAddKpiForm() {
        this.selectedKpi = { indicateur: '', objectifMensuel: '', realise: '', pourcentage: '' };
        this.viewMode = 'add_kpi';
    }

    onKpiRowClicked(event: any) {
        this.selectedKpi = { ...event.data };
        this.viewMode = 'details_kpi';
    }

    editKpi() {
        this.viewMode = 'edit_kpi';
    }

    deleteKpi() {
        if (this.selectedKpi && this.selectedKpi.id) {
            this.kpiService.deleteKpi(this.selectedKpi.id).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        }
    }

    calculerPourcentage() {
        if (!this.selectedKpi) return;
        const o = parseFloat(this.selectedKpi.objectifMensuel) || 0;
        const r = parseFloat(this.selectedKpi.realise) || 0;
        if (o > 0) {
            this.selectedKpi.pourcentage = Math.round((r / o) * 100) + '%';
        } else {
            this.selectedKpi.pourcentage = '';
        }
    }

    saveKpi() {
        if (!this.selectedKpi) return;

        // Auto calculate percentage on save just in case
        this.calculerPourcentage();

        if (this.viewMode === 'add_kpi') {
            this.kpiService.addKpi(this.selectedKpi).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        } else if (this.viewMode === 'edit_kpi') {
            this.kpiService.updateKpi(this.selectedKpi).subscribe(() => {
                this.showList();
                this.cdr.detectChanges();
            });
        }
    }
}
