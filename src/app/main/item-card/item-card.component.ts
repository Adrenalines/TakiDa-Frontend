import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Item } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.less']
})
export class ItemCardComponent implements OnInit {
  @ViewChild('toCartButtonElement') toCartButtonElement: ElementRef;
  @Input() item: Item;
  public itemPlaceholder: Item;
  public environment = environment;
  public image: string;
  public number = 0;
  public purchased = false;

  constructor(private basketService: BasketService) {
    this.itemPlaceholder = {
      id: '1',
      name: '...',
      price: 0,
      weight: 0,
      pieces: 1,
      components: []
    };
  }

  ngOnInit(): void {
    if (this.item) {
      this.image = `${this.environment.imageStore}/${this.item.id}_regular.png`;
    }
  }

  public replenishBasket(event: Event, item: Item, count: number) {
    event.preventDefault();
    event.stopPropagation();

    if (count === 1) {
      this.basketService.replenishBasket(item, 1);
      this.purchased = true;
      setTimeout(() => {
        this.purchased = false;
      }, 500);
    } else if (count === -1) {
      this.basketService.replenishBasket(item, -1);
    }
  }

  public changeNumber(event: Event, count: number) {
    event.preventDefault();
    event.stopPropagation();

    if (count === -1 && this.number === 1) {
      this.number = 0;
      return;
    }
    this.number += count;
  }
}
