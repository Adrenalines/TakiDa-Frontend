import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ItemsComponent } from './items/items.component';
import { ItemCardComponent } from './item-card/item-card.component';



@NgModule({
  declarations: [
    SliderComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ItemsComponent,
    ItemCardComponent
  ],
  exports: [
    SliderComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ItemsComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
