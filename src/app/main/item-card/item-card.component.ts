import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  }

  public replenishBasket(event: Event, item: Item) {
    event.preventDefault();
    event.stopPropagation();
    this.toCartButtonElement.nativeElement.classList.add('item__info-g_animate');
    setTimeout(() => {
      this.toCartButtonElement.nativeElement.classList.remove('item__info-g_animate');
    }, 300);
    this.basketService.replenishBasket(item, 1);
  }
}
