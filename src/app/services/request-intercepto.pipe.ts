import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestIntercepto',
  standalone: true
})
export class RequestInterceptoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
