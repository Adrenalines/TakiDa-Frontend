import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public items: Map<Item, number> = new Map<Item, number>();
  public itemsCount$ = new Subject<number>();

  constructor() {
  }

  public replenishBasket(item: Item, count: number) {
    if ((this.items.get(item) + count) === 0) {
      this.removeFromBasket(item);
    } else {
      this.items.set(item, (this.items.get(item) || 0) + count);
    }
    this.itemsCount$.next([...this.items.values()].reduce((a, b) => a + b, 0));
  }

  public removeFromBasket(item: Item) {
    this.items.delete(item);
    this.itemsCount$.next([...this.items.values()].reduce((a, b) => a + b, 0));
  }
}
