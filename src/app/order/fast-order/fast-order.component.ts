import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { calendarLocales, defaultLocale } from '../../shared/data/languages';
import { ApiService } from '../../core/services/api.service';
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
  public defaultLocale = defaultLocale;
  private orderSub: SubscriptionLike;

  constructor(
    private orderService: OrderService,
    private apiService: ApiService
  ) { }

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
        localStorage.removeItem('items');
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
