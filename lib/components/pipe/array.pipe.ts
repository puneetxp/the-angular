import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'array',
    standalone: true
})
export class ArrayPipe implements PipeTransform {

  transform(value: any, array: [] = []): any {
    if (typeof value == null || value == undefined || value instanceof Boolean) {
      return array;
    }
    return value;
  }

}
@Pipe({
    name: 'falsepipe',
    standalone: true
})
export class falsePipe implements PipeTransform {

  transform(value: any, array: [] = []): any {
    if (value instanceof Boolean || value == undefined) {
      return array;
    }
    return value;
  }

}
