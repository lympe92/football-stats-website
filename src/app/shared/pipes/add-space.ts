import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpaces',
})
export class AddSpacesPipe implements PipeTransform {
  transform(categories: string[]): string {
    if (categories.length === 1) return categories[0];
    return categories.join(', ');
  }
}
