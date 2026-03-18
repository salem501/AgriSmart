import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Defi } from '../../models/defi.model';
import { DefiService } from '../../services/defi/defi-service';

import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, type ColDef, themeQuartz } from 'ag-grid-community';
import {Observable} from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-defis',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    AgGridAngular
  ],
  templateUrl: './defis.component.html',
  standalone: true,
  styleUrl: './defis.component.css'
})
export class DefisComponent implements OnInit {
  defiService = inject(DefiService);
  cdr = inject(ChangeDetectorRef);

  defis: Defi[] = [];

  viewMode: 'list' | 'add' | 'details' | 'edit' = 'list';
  selectedDefi: Defi | null = null;

  theme = themeQuartz;

  colDefs: ColDef[] = [
    { field: 'titre', headerName: 'Titre', minWidth: 150 },
    { field: 'date', headerName: 'Date', width: 150, sort: 'desc' },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 200 },
    { field: 'solutionAppliquee', headerName: 'Solution Appliquée', flex: 1, minWidth: 200 },
    { field: 'resultat', headerName: 'Résultat', flex: 1, minWidth: 150 }
  ];

  defaultColDef = {
    filter: true,
    filterParams: { buttons: ['clear', 'apply'], closeOnApply: true }
  };


  ngOnInit(): void {
    this.defiService.getDefis().subscribe(defis=>{
      this.defis = [...defis];
      this.cdr.detectChanges();
    });
  }

  showAddDefiForm() {
    this.selectedDefi = { id: 0, titre: '', date: '', description: '', solutionAppliquee: '', resultat: '' };
    this.viewMode = 'add';
  }

  showDefiList() {
    this.viewMode = 'list';
    this.selectedDefi = null;
  }

  onRowClicked(event: any) {
    this.selectedDefi = { ...event.data };
    this.viewMode = 'details';
  }

  editDefi() {
    this.viewMode = 'edit';
  }

  deleteDefi() {
    if (this.selectedDefi && this.selectedDefi.id) {
      this.defiService.deleteDefi(this.selectedDefi.id).subscribe(() => {
      });
      this.viewMode='list';
    }
  }

  saveDefi() {
    if (!this.selectedDefi) return;

    if (this.viewMode === 'add') {
      this.defiService.addDefi(this.selectedDefi).subscribe(() => {
        this.defiService.getDefis().subscribe(defis=>{
          this.defis = [...defis];
          this.cdr.detectChanges();
        });
      });
    } else if (this.viewMode === 'edit') {
      this.defiService.updateDefi(this.selectedDefi).subscribe(() => {
        this.defiService.getDefis().subscribe(defis=>{
          this.defis = [...defis];
          this.cdr.detectChanges();
        });
      });
    }

    this.viewMode='list';
  }
}
