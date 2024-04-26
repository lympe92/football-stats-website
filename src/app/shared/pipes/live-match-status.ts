import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'liveMatchStatus',
})
export class LiveMatchStatusPipe implements PipeTransform {
  transform(fixture: any): string | Date {
    if (fixture.status.short === 'FT') return 'FT';
    if (fixture.status.elapsed) return `${fixture.status.elapsed} '`;
    if (!fixture.status.elapsed) {
      let date = new Date(fixture.status.elapsed);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }

    return '';
  }
}
