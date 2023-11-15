import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { ConverterComponent } from './components/converter/converter.component';

const routes: Routes = [
  { path: '', redirectTo: 'exchangeRates', pathMatch: 'full' },
  { path: 'exchangeRates', component: ExchangeRatesComponent },
  { path: 'converter', component: ConverterComponent },
  { path: '**', component: ExchangeRatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
