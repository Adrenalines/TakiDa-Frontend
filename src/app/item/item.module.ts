import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [ProductComponent, DeliveryInfoComponent, BreadcrumbsComponent],
  imports: [
    CommonModule
  ]
})
export class ItemModule { }
