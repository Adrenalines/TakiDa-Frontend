import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
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
  public image: string;
  public environment = environment;
  public number = 1;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    if (this.item) {
      this.image = `${this.environment.imageStore}/${this.item.id}_big.png`;
    }
  }

  public changeNumber(count: number) {
    if (count === -1 && this.number === 1) {
      return;
    }
    this.number += count;
  }

  public replenishBasket($event: Event, item: Item) {
    this.toCartButtonElement.nativeElement.classList.add('info-f_animate');
    setTimeout(() => {
      this.toCartButtonElement.nativeElement.classList.remove('info-f_animate');
    }, 300);
    this.basketService.replenishBasket(item, this.number);
  }
}
