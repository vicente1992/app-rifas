import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallbackRoutingModule } from './callback-routing.module';
import { FacebookCbComponent } from './pages/facebook-cb/facebook-cb.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FacebookCbComponent
  ],
  imports: [
    CommonModule,
    CallbackRoutingModule,
    TranslateModule
  ]
})
export class CallbackModule { }
