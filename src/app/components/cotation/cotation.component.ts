import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CotationFirebaseService } from '../../services/cotationFirebaseService';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IQuote } from '../../types/quote.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cotation',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="container-spinner" *ngIf="!quote || quote === null">
      <mat-spinner class="spinner"></mat-spinner>
    </div>
    <div class="container" *ngIf="quote">
      <mat-card class="card-section">
        <mat-card-header>
          <mat-card-title class="title">Estimation en cours</mat-card-title>
        </mat-card-header>
        <div class="main-section">
          <div class="left-side">
            <img mat-card-image [src]="quote.image" alt="Photo du véhicule" />
          </div>
          <div class="right-side">
            <mat-card-content>
              <p>
                <strong> ID Client : <br /></strong>{{ quote.clientId }}
              </p>
              <p>
                <strong> Descrition: <br /></strong>{{ quote.description }}
              </p>

              <mat-form-field appearance="fill">
                <mat-label>Entrez votre estimation</mat-label>
                <input matInput [(ngModel)]="quote.quotation" required />
              </mat-form-field>
              <mat-card-actions>
                <button
                  mat-flat-button
                  color="primary"
                  (click)="submitQuotation(quote.quotation, quoteId)"
                >
                  Confirmer votre estimation
                </button>
              </mat-card-actions>
            </mat-card-content>
          </div>
        </div>
      </mat-card>
      <!-- Section secondaire -->
      <h2>Prochaines estimations</h2>
      <div class="upcoming-quotes-section">
        <mat-card
          *ngFor="let upcomingQuote of upcomingQuotes | slice : 0 : 4"
          class="card-section"
        >
          <div class="main-section">
            <div class="left-side">
              <img
                mat-card-image
                [src]="upcomingQuote.image"
                alt="Photo du véhicule"
              />
            </div>
            <div class="right-side">
              <mat-card-content>
                <p>
                  <strong> ID Client : <br /></strong
                  >{{ upcomingQuote.clientId }}
                </p>
                <p>
                  <strong> Description: <br /></strong
                  >{{ upcomingQuote.description }}
                </p></mat-card-content
              >
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styleUrl: './cotation.component.scss',
})
export class CotationComponent implements OnInit {
  quoteId: string = '';
  quote?: IQuote;
  upcomingQuotes: IQuote[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly service: CotationFirebaseService
  ) {}

  ngOnInit() {
    this.quoteId = this.route.snapshot.paramMap.get('quoteId')!;
    this.service.getQuote().subscribe((quote: any) => {
      this.quote = quote.find((quote: any) => quote.quoteId === this.quoteId);
    });
    this.getUpcomingQuotes();
  }

  getUpcomingQuotes(): void {
    this.service.getQuote().subscribe((quotes: any) => {
      this.upcomingQuotes = quotes.filter(
        (quote: any) => !quote.quotation && quote.quoteId !== this.quoteId
      );
    });
  }

  submitQuotation(quotation: number, quoteId: string) {
    this.updateQuote(quoteId, { quotation })
      .toPromise()
      .then(() => this.navigateToNextQuote())
      .catch((error) => console.error('Error updating quote:', error));
  }

  updateQuote(quoteId: string, quoteData: any): Observable<any> {
    return this.service.updateQuote(quoteId, quoteData);
  }

  navigateToNextQuote(): void {
    if (this.upcomingQuotes.length > 0) {
      this.router
        .navigate(['quoting/', this.upcomingQuotes[0].quoteId])
        .then(() => {
          this.ngOnInit();
        });
    } else {
      this.router.navigate(['/']);
    }
  }
}
