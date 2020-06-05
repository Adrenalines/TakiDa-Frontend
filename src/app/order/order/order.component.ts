import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Item, OrderType } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';
import { WindowRefService } from '../../core/services/window-ref.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  public orderType: OrderType = 'detailed';
  public items: Map<Item, number>;
  public widthMultiplicator: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private windowRefService: WindowRefService,
    private basketService: BasketService
  ) {
    this.items = this.basketService.items;
    if (isPlatformBrowser(this.platformId)) {
      this.widthMultiplicator = this.windowRefService.nativeWindow.screen.width < 930 ? 40 : 0;
    }
  }

  ngOnInit(): void {
  }

}
