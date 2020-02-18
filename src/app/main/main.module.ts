import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ItemsComponent } from './items/items.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { ItemModule } from '../item/item.module';



@NgModule({
  declarations: [
    SliderComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ItemsComponent,
    ItemCardComponent,
    MainComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ItemModule
  ]
})
export class MainModule { }
