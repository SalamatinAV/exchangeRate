import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ExchangeRatesModel } from 'src/app/models/exchangeRates.model';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeRatesComponent implements OnInit {
  spinner: boolean = false;
  exchangeRates: ExchangeRatesModel[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'date'];

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.exchangeRatesService.getExchangeRates().subscribe((exchangeRates) => {
      this.exchangeRates = exchangeRates;
      this.exchangeRates.sort((a, b) => a.txt.localeCompare(b.txt));
      this.spinner = false;
      this.cd.markForCheck();
    });
  }
}
