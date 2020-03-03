import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasketService } from '../../core/services/basket.service';
import { Item } from '../../shared/types/types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit {
  public items: Map<Item, number>;

  constructor(private basketService: BasketService) {
    this.items = new Map<Item, number>(this.basketService.items);
  }

  ngOnInit(): void {
  }

  public removeItem(itemKey: Item) {
    this.basketService.items.delete(itemKey);
  }

  public changeNumber(amount: number, item: Item) {
    if (amount < 1) {
      this.removeItem(item);
    } else {
      this.basketService.items.set(item, amount);
    }
  }
}
