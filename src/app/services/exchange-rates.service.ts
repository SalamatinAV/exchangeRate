import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { ExchangeRatesModel } from '../models/exchangeRates.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<ExchangeRatesModel[]> {
    return this.http
      .get<ExchangeRatesModel[]>(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )
      .pipe(delay(200));
  }
}
