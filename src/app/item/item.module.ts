import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ItemComponent } from './item/item.component';
import { ItemPopupComponent } from './item-popup/item-popup.component';



@NgModule({
  declarations: [ProductComponent, DeliveryInfoComponent, BreadcrumbsComponent, ItemComponent, ItemPopupComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ItemPopupComponent
  ]
})
export class ItemModule { }
