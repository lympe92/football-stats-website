import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerName',
})
export class PlayerNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length === 1) return value;

    let namesArray = value.split(' ');
    let displayedName = `${namesArray[0][0]}. ${
      namesArray[namesArray.length - 1]
    }`;
    return displayedName;
  }
}
