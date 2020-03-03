import { Component, OnInit } from '@angular/core';
import { Item, OrderType } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  public orderType: OrderType = 'detailed';
  public items: Map<Item, number>;

  constructor(private basketService: BasketService) {
    this.items = this.basketService.items;
  }

  ngOnInit(): void {
  }

}
