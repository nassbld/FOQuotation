import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotationFirebaseService } from '../../services/cotationFirebaseService';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IQuote } from '../../types/quote.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cotation',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  template: `<div class="container" *ngIf="quote">
    <mat-card class="main-section">
      <mat-card-header>
        <mat-card-title>Estimations :</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <img
          mat-card-image
          [src]="quote.image"
          [height]="250"
          [width]="300"
          alt="Photo du véhicule"
        />

        <p>{{ quote.description }}</p>

        <mat-form-field>
          <mat-label>Entrez votre estimation</mat-label>
          <input matInput [(ngModel)]="quote.quotation" required />
        </mat-form-field>
        <mat-card-actions>
          <button
            mat-flat-button
            color="primary"
            (click)="submitQuotation(quote.quotation, quoteId)"
          >
            Envoyer l'estimation
          </button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  </div> `,
  styleUrl: './cotation.component.scss',
})
export class CotationComponent implements OnInit {
  quoteId: string = '';
  quote?: IQuote;
  upcomingQuotes: IQuote[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly service: CotationFirebaseService
  ) {}

  ngOnInit() {
    this.quoteId = this.route.snapshot.paramMap.get('quoteId')!;
    this.service.getQuote().subscribe((quote: any) => {
      this.quote = quote[0];
    });
    this.getUpcomingQuotes();
  }

  getUpcomingQuotes(): void {
    this.service.getQuote().subscribe((quotes: any) => {
      this.upcomingQuotes = quotes.filter((quote: any) => !quote.quotation);
    });
  }

  submitQuotation(quotation: number, quoteId: string) {
    this.service.updateQuote(quoteId, { quotation });
  }
}
