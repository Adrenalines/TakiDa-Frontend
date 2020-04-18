import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [
    DeliveryInfoComponent,
    BreadcrumbsComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ItemRoutingModule,
    SharedModule
  ]
})
export class ItemModule { }
