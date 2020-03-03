import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { BasketComponent } from './basket/basket.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import { FastOrderComponent } from './fast-order/fast-order.component';
import { DetailedOrderComponent } from './detailed-order/detailed-order.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    BasketComponent,
    OrderTypeComponent,
    FastOrderComponent,
    DetailedOrderComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class OrderModule { }
