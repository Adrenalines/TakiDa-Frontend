import { Component, OnInit } from '@angular/core';
import { OrderType } from '../../shared/types/types';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  public orderType: OrderType = 'detailed';

  constructor() { }

  ngOnInit(): void {
  }

}
