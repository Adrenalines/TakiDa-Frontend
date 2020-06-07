import { Injectable } from '@angular/core';
import { OrderFormData, OrderRequest, ItemsOrder } from '../../core/types/types';
import { BasketService } from '../../core/services/basket.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly metadata: Map<string, string>;

  constructor(private basketService: BasketService) {
    this.metadata = new Map<string, string>();
    // let value = this.getCookie('utm_campaign') && this.getCookie('utm_campaign') !== 'undefined' ? this.getCookie('utm_campaign') : null;
    // if (value != null) {
    //   this.metadata.set("utm_campaign", value);
    // }
  }

  public transformOrderData(rawOrderData: OrderFormData): OrderRequest {
    const itemsOrder = Array.from(this.basketService.items).reduce((itemsTransformed: ItemsOrder, [item, count]) => {
      itemsTransformed[item.id] = count;
      return itemsTransformed;
    }, {});

    const deliveryDate = (rawOrderData.deliveryType || rawOrderData.pickup) ?
      new Date(rawOrderData.deliveryDate).getTime() : null;

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
    return transformedOrderData;
  }
}
