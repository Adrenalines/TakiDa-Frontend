import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ItemPopupComponent } from './components/item-popup/item-popup.component';

@NgModule({
  declarations: [
    ProductComponent,
    ItemPopupComponent
  ],
  exports: [
    ProductComponent,
    ItemPopupComponent
  ]
})
export class SharedModule { }
