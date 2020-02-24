import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    TranslateModule
  ],
  exports: [
    ProductComponent
  ]
})
export class SharedModule { }
