import { Component, inject, OnInit } from '@angular/core';
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
import { AllCommunityModule, ModuleRegistry, type ColDef, themeQuartz } from 'ag-grid-community';

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
    styleUrl: './evenements.component.css'
})
export class EvenementsComponent implements OnInit {
    evenementService = inject(EvenementService);

    evenements: Evenement[] = [];

    viewMode: 'list' | 'add' | 'details' | 'edit' = 'list';
    selectedEvenement: Evenement | null = null;

    theme = themeQuartz;

    colDefs: ColDef[] = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'nom', headerName: 'Nom', flex: 1, minWidth: 200, wrapText: true, autoHeight: true },
        { field: 'details', headerName: 'Détails', flex: 1, minWidth: 200, wrapText: true, autoHeight: true }
    ];

    defaultColDef = {
        filter: true,
        filterParams: { buttons: ['clear', 'apply'], closeOnApply: true }
    };

    ngOnInit(): void {
        this.loadEvenementsList();
    }

    private loadEvenementsList() {
        return this.evenementService.getEvenements().subscribe(events => {
            this.evenements = events;
        });
    }

    showAddEvenementForm() {
        this.selectedEvenement = { id: 0, date: '', nom: '', details: '' };
        this.viewMode = 'add';
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
                this.loadEvenementsList();
                this.showEvenementsList();
            });
        }
    }

    saveEvenement() {
        if (!this.selectedEvenement) return;

        if (this.viewMode === 'add') {
            this.evenementService.addEvenement(this.selectedEvenement).subscribe(() => {
                this.loadEvenementsList();
                this.showEvenementsList();
            });
        } else if (this.viewMode === 'edit') {
            this.evenementService.updateEvenement(this.selectedEvenement).subscribe(() => {
                this.loadEvenementsList();
                this.showEvenementsList();
            });
        }
    }
}
