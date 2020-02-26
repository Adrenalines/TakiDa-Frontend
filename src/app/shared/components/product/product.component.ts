import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../types/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() item: Item;
  public number = 1;

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
