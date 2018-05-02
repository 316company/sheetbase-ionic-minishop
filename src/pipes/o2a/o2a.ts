import { Pipe, PipeTransform } from '@angular/core';

import { HELPER } from '../../statics/helper';




@Pipe({
  name: 'o2a'
})
export class O2aPipe implements PipeTransform {

  transform(value: {[$key: string]: any}, clone: boolean = true, limit: number = null) {
    return HELPER.o2a(value, clone, limit);
  }

}
