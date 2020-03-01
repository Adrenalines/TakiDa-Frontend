import { Injectable } from '@angular/core';
import { Item } from '../../shared/types/types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private items: Item[] = [];
  public itemsCount$ = new Subject<number>();

  constructor() { }

  public replenishBasket(item: Item, count: number) {
    for (let i = 0; i < count; i++) {
      this.items.push(item);
    }
    this.itemsCount$.next(this.items.length);

  }
}
