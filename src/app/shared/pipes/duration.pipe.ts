import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const duration = parseInt(value as string);
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  }
}
