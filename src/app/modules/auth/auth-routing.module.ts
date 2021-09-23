import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/can-deactivate.guard';
import { CheckReferredGuard } from 'src/app/check-referred.guard';
import { GuestRegistrationComponent } from './pages/guest-registration/guest-registration.component';
import { RegisterComponent } from './pages/register/register.component';
// CheckReferredGuard
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CheckReferredGuard]

  },
  {
    path: 'guest-register', component: GuestRegistrationComponent
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
