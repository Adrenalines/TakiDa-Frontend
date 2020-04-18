import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddressComponent } from './address/address.component';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [AccountComponent, AccountMenuComponent, RegistrationComponent, AddressComponent, HistoryComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule
  ]
})
export class ProfileModule { }
