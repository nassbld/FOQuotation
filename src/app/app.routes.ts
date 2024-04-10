import { Routes } from '@angular/router';
import { CotationComponent } from './components/cotation/cotation.component';

export const routes: Routes = [
    { path: '', redirectTo: 'quoting/1', pathMatch: 'full' },
    { path: 'quoting/:quoteId', component: CotationComponent },
    { path: '**', redirectTo: 'quoting/1' }
];
