import { Injectable } from '@angular/core';
import { DetailedOrderFormData, DetailedOrderRequest, Item, ItemsOrder } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly metadata: string;

  constructor(private basketService: BasketService) {
    this.metadata = this.getCookie('utm_campaign') && this.getCookie('utm_campaign') !== 'undefined' ?
      this.getCookie('utm_campaign') : null;
  }

  public transformOrderData(rawOrderData: DetailedOrderFormData): DetailedOrderRequest {
    const itemsOrder = Array.from(this.basketService.items).reduce((itemsTransformed: ItemsOrder, [item, count]) => {
      itemsTransformed[item.id] = count;
      return itemsTransformed;
    }, {});

    const deliveryDate = rawOrderData.deliveryType ? rawOrderData.deliveryDate ? rawOrderData.deliveryTime ?
      new Date(rawOrderData.deliveryDate + ' ' + rawOrderData.deliveryTime).getTime() :
      new Date(rawOrderData.deliveryDate).getTime() : null : null;

    const transformedOrderData = {
      ...rawOrderData,
      houseNo: rawOrderData.houseNo ? rawOrderData.houseNo : null,
      apartment: rawOrderData.apartment ? rawOrderData.apartment : null,
      addressMemo: rawOrderData.addressMemo ? rawOrderData.addressMemo : null,
      deliveryType: null,
      deliveryDate,
      paymentMemo: rawOrderData.paymentMemo ? `Сдача с ${rawOrderData.paymentMemo}` : null,
      metadata: this.metadata ? this.metadata : null,
      goods: itemsOrder
    };
    delete transformedOrderData.deliveryType;
    delete transformedOrderData.deliveryTime;
    return transformedOrderData;
  }

  private getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
