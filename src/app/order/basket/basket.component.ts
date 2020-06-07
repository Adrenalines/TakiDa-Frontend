import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Item } from '../../core/types/types';
import { BasketService } from '../../core/services/basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit {
  public items: Map<Item, number>;
  public environment = environment;

  constructor(private basketService: BasketService) {
    this.items = this.basketService.items;
  }

  ngOnInit(): void {
  }

  public removeItem(itemKey: Item) {
    this.basketService.removeFromBasket(itemKey);
  }

  public changeNumber(item: Item, count: number) {
    this.basketService.replenishBasket(item, count);
  }

}
