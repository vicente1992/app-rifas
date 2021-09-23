import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { GuestRegistrationComponent } from './pages/guest-registration/guest-registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    GuestRegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
