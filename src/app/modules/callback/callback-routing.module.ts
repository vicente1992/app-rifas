import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookCbComponent } from './pages/facebook-cb/facebook-cb.component';

const routes: Routes = [
  {
    path: 'facebook',
    component: FacebookCbComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallbackRoutingModule { }
