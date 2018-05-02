import { Pipe, PipeTransform } from '@angular/core';

import { HELPER } from '../../statics/helper';



@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {

  transform(value) {
    return HELPER.relativeTime(value);
  }

}
