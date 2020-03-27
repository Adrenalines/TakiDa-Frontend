import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public items: Map<Item, number>;
  public itemsCount$: BehaviorSubject<number>;

  constructor() {
    try {
      this.items = new Map(JSON.parse(localStorage.getItem('items'))) || new Map<Item, number>();
    } catch (e) {
      this.items = new Map<Item, number>();
    }

    this.itemsCount$ = new BehaviorSubject<number>(0);
    if (this.items.size) {
      this.itemsCount$.next([...this.items.values()].reduce((a, b) => a + b, 0));
    }
  }

  public replenishBasket(item: Item, count: number) {
    if ((this.items.get(item) + count) === 0) {
      this.removeFromBasket(item);
    } else {
      let newItem = false;
      Array.from(this.items.keys()).forEach(itemBasket => {
        if (itemBasket.id === item.id) {
          newItem = true;
          this.items.set(itemBasket, (this.items.get(itemBasket) || 0) + count);
        }
      });
      if (!newItem) {
        this.items.set(item, (this.items.get(item) || 0) + count);
      }
    }
    this.itemsCount$.next([...this.items.values()].reduce((a, b) => a + b, 0));
    localStorage.setItem('items', JSON.stringify(Array.from(this.items.entries())));
  }

  public removeFromBasket(item: Item) {
    this.items.delete(item);
    this.itemsCount$.next([...this.items.values()].reduce((a, b) => a + b, 0));
    localStorage.setItem('items', JSON.stringify(Array.from(this.items.entries())));
  }

  public clearBasket() {
    this.items.clear();
    this.itemsCount$ = new BehaviorSubject<number>(0);
  }
}
