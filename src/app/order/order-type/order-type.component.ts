import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderType } from '../../shared/types/types';


@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.less']
})
export class OrderTypeComponent implements OnInit {
  @Output() orderType: EventEmitter<OrderType> = new EventEmitter<OrderType>();
  public orderTypeFast = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleOrderType(orderType: OrderType = 'detailed') {
    this.orderTypeFast = orderType === 'fast';
    this.orderType.emit(orderType);
  }
}
