import { Routes } from '@angular/router';
import { ObjectifsComponent } from './pages/objectifs/objectifs.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { DefisComponent } from './pages/defis/defis.component';

export const routes: Routes = [
    { path: '', redirectTo: '/objectifs', pathMatch: 'full' },
    { path: 'objectifs', component: ObjectifsComponent },
    { path: 'evenements', component: EvenementsComponent },
    { path: 'defis', component: DefisComponent }
];

