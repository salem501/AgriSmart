import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Evenement } from '../../models/evenement.model';
import { EvenementService } from '../../services/evenement/evenement.service';

import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, type ColDef, themeQuartz, GridReadyEvent, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

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
        FloatLabelModule,
        AgGridAngular
    ],
    templateUrl: './evenements.component.html',
    standalone: true,
    styleUrl: './evenements.component.css'
})
export class EvenementsComponent implements OnInit {
    evenementService = inject(EvenementService);
    cdr = inject(ChangeDetectorRef);

    private gridApi!: GridApi;

    viewMode: 'list' | 'add' | 'details' | 'edit' = 'list';
    selectedEvenement: Evenement | null = null;

    theme = themeQuartz;

    colDefs: ColDef[] = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'nom', headerName: 'Nom', flex: 1, minWidth: 200 },
        { field: 'details', headerName: 'Détails', flex: 1, minWidth: 200 }
    ];

    defaultColDef = {
        filter: true,
        filterParams: { buttons: ['clear', 'apply'], closeOnApply: true }
    };

    ngOnInit(): void {
    }

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        const dataSource: IDatasource = {
            getRows: (params: IGetRowsParams) => {
                const page = Math.floor(params.startRow / 10);
                const size = 10;
                
                this.evenementService.getEvenements(page, size).subscribe({
                    next: (res) => {
                        params.successCallback(res.content, res.totalElements);
                    },
                    error: () => {
                        params.failCallback();
                    }
                });
            }
        };
        params.api.setGridOption('datasource', dataSource);
    }

    showAddEvenementForm() {
        this.selectedEvenement = { id: 0, date: '', nom: '', details: '' };
        this.viewMode = 'add';
    }

    generateReport() {
        this.evenementService.downloadReport().subscribe((blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rapport-evenements.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    showEvenementsList() {
        this.viewMode = 'list';
        this.selectedEvenement = null;
    }

    onRowClicked(event: any) {
        this.selectedEvenement = { ...event.data };
        this.viewMode = 'details';
    }

    editEvenement() {
        this.viewMode = 'edit';
    }

    deleteEvenement() {
        if (this.selectedEvenement && this.selectedEvenement.id) {
            this.evenementService.deleteEvenement(this.selectedEvenement.id).subscribe(() => {
                this.showEvenementsList();
                this.cdr.detectChanges();
            });
        }
    }

    saveEvenement() {
        if (!this.selectedEvenement) return;

        if (this.viewMode === 'add') {
            this.evenementService.addEvenement(this.selectedEvenement).subscribe(() => {
                this.showEvenementsList();
                this.cdr.detectChanges();
            });
        } else if (this.viewMode === 'edit') {
            this.evenementService.updateEvenement(this.selectedEvenement).subscribe(() => {
                this.showEvenementsList();
                this.cdr.detectChanges();
            });
        }
    }
}
