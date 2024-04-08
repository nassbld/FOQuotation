import { Routes } from '@angular/router';
import { CotationComponent } from './components/cotation/cotation.component';

export const routes: Routes = [
    { path: '', component: CotationComponent},
    { path: 'quoting/:quoteId', component: CotationComponent }
];
