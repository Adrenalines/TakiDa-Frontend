import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.less']
})
export class DetailedOrderComponent implements OnInit {
  public detailedOrderForm: FormGroup;
  public submitOrderResponseText: string;

  constructor(
    private orderService: OrderService,
    private apiService: ApiService
  ) {
    this.resetForm();
  }

  ngOnInit(): void {
  }

  public submitDetailedOrder() {
    this.submitOrderResponseText = 'pending';
    const transformedOrderData = this.orderService.transformOrderData(this.detailedOrderForm.value);
    this.apiService.postOrder(transformedOrderData).subscribe((response: boolean) => {
        console.log(response);
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
    this.detailedOrderForm = new FormGroup({
      clientName: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      phone: new FormControl('+380', [ Validators.required, Validators.minLength(6) ]),
      street: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      houseNo: new FormControl(''),
      apartment: new FormControl(''),
      addressMemo: new FormControl(''),
      deliveryType: new FormControl( false),
      deliveryDate: new FormControl(new Date().toISOString().slice(0, 10)),
      deliveryTime: new FormControl('12:00'),
      paymentType: new FormControl('CASH', [ Validators.required ]),
      paymentMemo: new FormControl('')
    });
  }
}
