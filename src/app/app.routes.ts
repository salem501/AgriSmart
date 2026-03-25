import { Routes } from '@angular/router';
import { ObjectifsComponent } from './pages/objectifs/objectifs.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { DefisComponent } from './pages/defis/defis.component';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/objectifs', pathMatch: 'full' },
    { path: 'objectifs', component: ObjectifsComponent, canActivate: [authGuard] },
    { path: 'evenements', component: EvenementsComponent, canActivate: [authGuard] },
    { path: 'defis', component: DefisComponent, canActivate: [authGuard] },
];
