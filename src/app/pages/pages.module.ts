import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';



@NgModule({
  declarations: [DeliveryComponent, AboutComponent, ContactsComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
