import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ExchangeRatesModel } from 'src/app/models/exchangeRates.model';
import { ExchangeRatesService } from 'src/app/services/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent implements OnInit {
  spinner: boolean = false;
  exchangeRate: ExchangeRatesModel[] = [];
  selectOne: string = 'Долар США';
  selectTwo: string = 'Українська гривня';
  resultOne!: number | null;
  resultTwo!: number | null;
  numOne!: number;
  numTwo!: number;

  uah: ExchangeRatesModel = {
    r030: 804,
    txt: 'Українська гривня',
    rate: 1,
    cc: 'UAH',
  };

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.exchangeRatesService.getExchangeRates().subscribe((e) => {
      this.exchangeRate = e;
      this.exchangeRate.unshift(this.uah);
      this.exchangeRate.sort((a, b) => a.txt.localeCompare(b.txt));
      this.spinner = false;
      this.cd.markForCheck();
    });
  }

  getAvalibleWells(filter: string): ExchangeRatesModel[] {
    return this.exchangeRate.filter((i) => i.txt !== filter);
  }

  resOne(e: number | null) {
    if (e === null || e <= 0) {
      this.resultOne = null;
      this.cd.markForCheck();
    }

    this.exchangeRate.forEach((e) => {
      if (e.txt === this.selectOne) {
        this.numOne = e.rate;
      }
      if (e.txt === this.selectTwo) {
        this.numTwo = e.rate;
      }
    });
    if (this.resultOne !== null) {
      this.resultTwo = parseFloat(
        ((this.numOne / this.numTwo) * this.resultOne).toFixed(2)
      );
    }
  }

  resTwo() {
    if (this.resultTwo === null || this.resultTwo <= 0) {
      this.resultTwo = null;
      this.cd.markForCheck();
    }

    this.exchangeRate.forEach((e) => {
      if (e.txt === this.selectTwo) {
        this.numTwo = e.rate;
      }
      if (e.txt === this.selectOne) {
        this.numOne = e.rate;
      }
    });
    if (this.resultTwo !== null) {
      this.resultOne = parseFloat(
        ((this.numTwo / this.numOne) * this.resultTwo).toFixed(2)
      );
    }
  }
}
