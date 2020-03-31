import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import { AuthGuard } from './services/auth.guard';*/


const routes: Routes = [
  { path: '', loadChildren: () => import('../main/main.module').then(m => m.MainModule) },
  { path: 'item',
    loadChildren: () => import('../item/item.module').then(m => m.ItemModule)
  },
  /*{
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },*/
  { path: 'cart', loadChildren: () => import('../order/order.module').then(m => m.OrderModule) },
  { path: 'pages', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

