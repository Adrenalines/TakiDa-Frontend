import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeNumber(amount: number) {
    if (amount === -1 && this.number === 1) {
      return;
    }
    this.number += amount;
  }
}
