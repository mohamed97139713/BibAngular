import { Routes } from '@angular/router';
import { BuecherverwaltungComponent } from './buecherverwaltung/buecherverwaltung.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'buecherverwaltung',
        component: BuecherverwaltungComponent,
    },
    {
        path: 'aboutus',
        component: AboutusComponent,
    },
];

