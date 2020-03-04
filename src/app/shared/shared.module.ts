import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GetItemsPipe } from './pipes/get-items.pipe';
import { SumPipe } from './pipes/sum.pipe';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    GetItemsPipe,
    SumPipe,
    ProductComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LazyLoadImageModule
  ],
  exports: [
    GetItemsPipe,
    SumPipe,
    ProductComponent
  ]
})
export class SharedModule { }
