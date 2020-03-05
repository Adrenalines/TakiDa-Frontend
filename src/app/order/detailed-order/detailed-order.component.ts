import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../shared/types/types';
import { BasketService } from '../../core/services/basket.service';


@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.less']
})
export class DetailedOrderComponent implements OnInit {
  public detailedOrderForm: FormGroup;
  public items: Map<Item, number>;
  private metadata: string;

  constructor(private basketService: BasketService) {
    this.detailedOrderForm = new FormGroup({
      clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
      street: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      houseNo: new FormControl(''),
      apartment: new FormControl(''),
      addressMemo: new FormControl(''),
      deliveryType: new FormControl( null),
      deliveryDate: new FormControl(new Date().getTime()),
      paymentType: new FormControl('CASH', [ Validators.required ]),
      paymentMemo: new FormControl('')
    });

    this.items = this.basketService.items;
    this.metadata = this.getCookie('utm_campaign');
  }

  ngOnInit(): void {
  }

  private getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public submitDetailedOrder() {
    console.log(this.detailedOrderForm.value);
  }
}
