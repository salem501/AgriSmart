import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Defi } from '../../models/defi.model';
import { DefiService } from '../../services/defi/defi-service';

@Component({
  selector: 'app-defis',
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule
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

  showAddDefiForm() {
    this.showAddDefiPage = true;
  }

  showDefiList() {
    this.showAddDefiPage = false;
  }

  private loadDefisList() {
    return this.defiService.getUsers().subscribe(defis => {
      this.defis = defis;
    });
  }
}
