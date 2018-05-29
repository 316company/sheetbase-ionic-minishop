import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { APP_CONFIG } from '../../configs/app.config';

@Pipe({
  name: 'appCurrency',
})
export class AppCurrencyPipe implements PipeTransform {

  transform(value: string, ...args) {
    return new CurrencyPipe(APP_CONFIG.locale||'en-US')
    .transform(value, APP_CONFIG.currencyCode, 'symbol', '1.0-2', APP_CONFIG.locale||'en-US');
  }
}
