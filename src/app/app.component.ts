import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ExchangeRatesService } from './services/exchange-rates.service';
import { ExchangeRatesModel } from './models/exchangeRates.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Курс валют';
  majorCurrencies: ExchangeRatesModel[] = [];
  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.exchangeRatesService.getExchangeRates().subscribe((exchangeRates) => {
      this.majorCurrencies = exchangeRates.filter(
        (currency) => currency.cc === 'EUR' || currency.cc === 'USD'
      );
      this.cd.markForCheck();
    });
  }
}
