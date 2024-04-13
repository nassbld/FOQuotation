import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IQuote } from '../../types/quote.interface';

@Component({
  selector: 'app-cotation-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './cotation-list.component.html',
  styleUrl: './cotation-list.component.scss'
})
export class CotationListComponent {
  @Input() upcomingQuotes: IQuote[] = [];

}
