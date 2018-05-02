import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { SITE_CONFIG } from '../../configs/site.config';

@Pipe({
  name: 'appCurrency',
})
export class AppCurrencyPipe implements PipeTransform {

  transform(value: string, ...args) {
    return new CurrencyPipe(SITE_CONFIG.locale||'en-US')
    .transform(value, SITE_CONFIG.currencyCode, 'symbol', '1.0-2', SITE_CONFIG.locale||'en-US');
  }
}
