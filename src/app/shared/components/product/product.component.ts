import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../types/types';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @ViewChild('toCartButtonElement') toCartButtonElement: ElementRef;
  @Input() item: Item;
  public number = 1;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  public changeNumber(amount: number) {
    if (amount === -1 && this.number === 1) {
      return;
    }
    this.number += amount;
  }

  public replenishBasket($event: Event, item: Item) {
    this.toCartButtonElement.nativeElement.classList.add('info-f_animate');
    setTimeout(() => {
      this.toCartButtonElement.nativeElement.classList.remove('info-f_animate');
    }, 300);
    this.basketService.replenishBasket(item, this.number);
  }
}
