import { Component, OnInit } from '@angular/core';
import { OrderType } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  public orderType: OrderType = 'detailed';
  public itemsCount: number;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.itemsCount$.subscribe(itemsCount => {
      this.itemsCount = itemsCount;
    });
  }

}
