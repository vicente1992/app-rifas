import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

//Components
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    ThankYouComponent,

  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    TranslateModule,

  ]
})
export class CheckoutModule { }
