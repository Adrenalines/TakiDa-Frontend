import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: () => import('../main/main.module').then(m => m.MainModule) },
  { path: 'item', loadChildren: () => import('../item/item.module').then(m => m.ItemModule) },
  { path: 'profile', loadChildren: () => import('../account/account.module').then(m => m.AccountModule) },
  { path: 'cart', loadChildren: () => import('../order/order.module').then(m => m.OrderModule) },
  { path: 'delivery', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
  { path: 'about', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
  { path: 'contacts', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
