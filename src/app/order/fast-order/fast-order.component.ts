import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-fast-order',
  templateUrl: './fast-order.component.html',
  styleUrls: ['./fast-order.component.less']
})
export class FastOrderComponent implements OnInit {
  public fastOrderForm: FormGroup;
  public submitOrderResponseText: string;

  constructor(
    private orderService: OrderService,
    private apiService: ApiService
  ) {
    this.fastOrderForm = new FormGroup({
      clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
      paymentType: new FormControl('CASH', [ Validators.required ])
    });
  }

  ngOnInit(): void {
  }

  public submitFastOrder() {
    this.submitOrderResponseText = 'pending';
    const transformedOrderData = this.orderService.transformOrderData(this.fastOrderForm.value);
    this.apiService.postOrder(transformedOrderData).subscribe((response: boolean) => {
        console.log(response);
        this.submitOrderResponseText = response ? 'success' : 'error';
      },
      error => {
        this.submitOrderResponseText = 'error';
        console.log('Submit order error: ', error);
      }
    ).add(() => {
      this.fastOrderForm.reset();
      if (this.submitOrderResponseText === 'success') {
        localStorage.removeItem('items');
      }
      setTimeout(() => {
        this.submitOrderResponseText = '';
      }, 5000);
    });
  }

}
