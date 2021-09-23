import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { CreateComponent } from './pages/create/create.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { ReferredListComponent } from './pages/referred-list/referred-list.component';
import { TicketComponent } from './pages/ticket/ticket.component';

const routes: Routes = [
  {
    path: '', component: ListComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:slug', component: DetailComponent,
  },
  {
    path: 'ticket/:slug',
    component: TicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referred-list/:id',
    component: ReferredListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create/:id',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
