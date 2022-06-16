import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalali',
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value && value.length) {
      let MomentDate = moment(value);
      return MomentDate.locale('fa').format('dddd, MMMM DD YYYY, hh:mm:ss a');
    }
    return 'مشخص نیست';
  }
}
