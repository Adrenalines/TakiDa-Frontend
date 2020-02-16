import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { ItemComponent } from './item/item/item.component';
import { CabinetComponent } from './account/cabinet/cabinet.component';
import { OrderComponent } from './order/order/order.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'profile', component: CabinetComponent },
  { path: 'cart', component: OrderComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
