import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { calendarLocales, defaultLocale } from '../../core/config/languages';
import { ApiService } from '../../core/services/api.service';
import { BasketService } from '../../core/services/basket.service';
import { OrderService } from '../services/order.service';



@Component({
  selector: 'app-fast-order',
  templateUrl: './fast-order.component.html',
  styleUrls: ['./fast-order.component.less']
})
export class FastOrderComponent implements OnInit, OnDestroy {
  public fastOrderForm: FormGroup;
  public submitOrderResponseText: string;
  public minDateValue =
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 1, new Date().getMinutes() + 5);
  public maxDateValue =
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, new Date().getHours(), new Date().getMinutes());
  public calendarLocales = calendarLocales;
  public defaultLocale: string;
  private orderSub: SubscriptionLike;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private basketService: BasketService,
    private orderService: OrderService,
    private apiService: ApiService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.defaultLocale = localStorage.getItem('language') || defaultLocale;
    }
  }

  ngOnInit(): void {
    this.resetForm();
  }

  public submitFastOrder() {
    this.submitOrderResponseText = 'pending';
    const transformedOrderData = this.orderService.transformOrderData(this.fastOrderForm.value);
    this.orderSub = this.apiService.postOrder(transformedOrderData).subscribe((response: boolean) => {
        this.submitOrderResponseText = response ? 'success' : 'error';
      },
      error => {
        this.submitOrderResponseText = 'error';
        console.log('Submit order error: ', error);
      }
    ).add(() => {
      this.resetForm();
      if (this.submitOrderResponseText === 'success') {
        this.basketService.clearBasket();
        this.router.navigate(['/pages/success']);
      }
      setTimeout(() => {
        this.submitOrderResponseText = '';
      }, 5000);
    });
  }

  private resetForm() {
    this.fastOrderForm = new FormGroup({
      clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
      paymentType: new FormControl('CASH', [ Validators.required ]),
      pickup: new FormControl(false, [ Validators.required ]),
      deliveryDate: new FormControl(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
        new Date().getHours() + 1, new Date().getMinutes() + 5))
    });
  }

  ngOnDestroy(): void {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

}
