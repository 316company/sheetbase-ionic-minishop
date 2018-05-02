import { Pipe, PipeTransform } from '@angular/core';

import { HELPER } from '../../statics/helper';



@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], keyword: string, fields: string[] = null) {
    return HELPER.search(value, keyword, fields);
  }

}
