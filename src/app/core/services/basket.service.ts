import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../shared/types/types';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public items: Map<Item, number>;
  public itemsCount$: BehaviorSubject<number>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    try {
      if (isPlatformBrowser(this.platformId)) {
        this.items = new Map(JSON.parse(localStorage.getItem('items'))) || new Map<Item, number>();
      }
    } catch (e) {
      this.items = new Map<Item, number>();
    }

    this.itemsCount$ = new BehaviorSubject<number>(0);
    if (this.items?.size) {
      this.itemsCount$.next(this.items.size);
    }
  }

  public replenishBasket(item: Item, count: number) {
    if ((this.items.get(item) + count) === 0) {
      return;
    }

    let existItem = false;
    // Use foreach instead this.items.has() because of eliminate duplication when re-entry
    Array.from(this.items.keys()).forEach(itemBasket => {
      if (itemBasket.id === item.id) {
        existItem = true;
        this.items.set(itemBasket, (this.items.get(itemBasket)) + count);
      }
    });
    if (!existItem) {
      this.items.set(item, count);
      this.itemsCount$.next(this.items.size);
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('items', JSON.stringify(Array.from(this.items.entries())));
    }
  }

  public removeFromBasket(item: Item) {
    this.items.delete(item);
    this.itemsCount$.next(this.items.size);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('items', JSON.stringify(Array.from(this.items.entries())));
    }
  }

  public clearBasket() {
    this.items.clear();
    this.itemsCount$ = new BehaviorSubject<number>(0);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('items');
    }
  }

}
