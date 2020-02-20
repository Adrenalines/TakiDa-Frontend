import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  exports: [
    ProductComponent
  ]
})
export class SharedModule { }
