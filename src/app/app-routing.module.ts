import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CheckReferredGuard } from './check-referred.guard';

const routes: Routes = [
  {
    path: 'oauth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [CheckReferredGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [CheckReferredGuard]
  },
  {
    path: 'callback',
    loadChildren: () => import('./modules/callback/callback.module').then(m => m.CallbackModule),
    canActivate: [CheckReferredGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [CheckReferredGuard, AuthGuard]
  },
  {
    path: '',
    redirectTo: 'oauth',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'oauth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
