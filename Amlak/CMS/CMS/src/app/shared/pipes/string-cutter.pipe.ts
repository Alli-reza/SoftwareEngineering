import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutter',
})
export class StringCutterPipe implements PipeTransform {
  transform(value: string, CharacterLength: number): any {
    if (value && value.length && value.length > CharacterLength) {
      value = value.substring(0, CharacterLength) + ' ...';
    }
    return value;
  }
}
