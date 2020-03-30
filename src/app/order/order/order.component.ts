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
  public widthMultiplicator: number;

  constructor(private basketService: BasketService) {
    this.items = this.basketService.items;
    this.widthMultiplicator = window.screen.width < 930 ? 40 : 0;
  }

  ngOnInit(): void {
  }

}
