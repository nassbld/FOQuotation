import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CotationComponent } from './components/cotation/cotation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CotationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FOQuotation';
}
