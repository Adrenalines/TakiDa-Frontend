import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  public orderType: 'fast' | 'detailed' = 'detailed';

  constructor() { }

  ngOnInit(): void {
  }

}
