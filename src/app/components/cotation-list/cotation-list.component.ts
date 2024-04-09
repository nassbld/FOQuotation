import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {NgForOf, SlicePipe} from "@angular/common";
import {IQuote} from "../../types/quote.interface";

@Component({
  selector: 'app-cotation-list',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardImage,
        NgForOf,
        SlicePipe
    ],
  templateUrl: './cotation-list.component.html',
  styleUrl: './cotation-list.component.scss'
})
export class CotationListComponent {
  @Input() upcomingQuotes!: IQuote[];

}
