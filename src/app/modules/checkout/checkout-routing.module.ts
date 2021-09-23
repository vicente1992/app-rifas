import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { CheckReferredGuard } from 'src/app/check-referred.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: 'process/:slug/:idOrder',
    component: CheckoutComponent,
    canActivate: [AuthGuard, CheckReferredGuard]
  },
  {
    path: 'thankyou/:id',
    component: ThankYouComponent,
    canActivate: [AuthGuard, CheckReferredGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
