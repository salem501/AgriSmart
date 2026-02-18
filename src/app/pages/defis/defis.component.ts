import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {Defi} from '../../models/defi.model';
import {DefiService} from '../../services/defi/defi-service';

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
  standalone: true,
  styleUrl: './defis.component.css'
})
export class DefisComponent implements OnInit {
  defiService = inject(DefiService);

  defis: Defi[] = [];

  showAddDefiPage = false;

  ngOnInit(): void {
    this.loadDefisList();
  }

  showAddDefiForm(){
    this.showAddDefiPage = true;
  }

  showDefiList() {
    this.showAddDefiPage = false;
  }
  private loadDefisList() {
    return this.defiService.getUsers().subscribe(defis =>{
      this.defis = defis;
    });

  }
}
