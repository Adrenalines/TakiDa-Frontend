import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SliderComponent } from './slider/slider.component';
import { ItemsComponent } from './items/items.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { MainComponent } from './main/main.component';
import { ItemPopupComponent } from './item-popup/item-popup.component';


@NgModule({
  declarations: [
    SliderComponent,
    ItemsComponent,
    ItemCardComponent,
    ItemPopupComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
