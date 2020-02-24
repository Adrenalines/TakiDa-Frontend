import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.less']
})
export class OrderTypeComponent implements OnInit {
  @Output() orderType = new EventEmitter();
  public orderTypeFast = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleOrderType(orderType: 'fast' | 'detailed' = 'detailed') {
    this.orderTypeFast = orderType === 'fast';
    this.orderType.emit(orderType);
  }
}
