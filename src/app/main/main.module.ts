import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ClickOutsideModule } from 'ng-click-outside';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
/*import { SliderComponent } from './slider/slider.component';*/
import { ItemsComponent } from './items/items.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { MainComponent } from './main/main.component';
import { ItemModalComponent } from './item-modal/item-modal.component';



@NgModule({
  declarations: [
    /*SliderComponent,*/
    ItemsComponent,
    ItemCardComponent,
    ItemModalComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LazyLoadImageModule,
    ClickOutsideModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
