import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from './components/product/product.component';
import { GetItemsPipe } from './pipes/get-items.pipe';
import { SumPipe } from './pipes/sum.pipe';


@NgModule({
  declarations: [
    ProductComponent,
    GetItemsPipe,
    SumPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ProductComponent,
    GetItemsPipe,
    SumPipe
  ]
})
export class SharedModule { }
