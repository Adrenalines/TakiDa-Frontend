import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Item } from '../types/types';


@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(items: Array<KeyValue<Item, number>>): any {
    return items.reduce((a, b) => a + b.key.price * b.value, 0);
  }

}
