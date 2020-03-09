import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DeliveryComponent,
    AboutComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule
  ]
})
export class PagesModule { }
