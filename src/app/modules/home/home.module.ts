import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//Components
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { DetailComponent } from './pages/detail/detail.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ImagePipe } from '../image.pipe';
import { ReferredListComponent } from './pages/referred-list/referred-list.component';
const icons = [
  // ... other icons
  faFacebookSquare
];

const shareProp = {
  facebook: {
    icon: ['fab', 'facebook-square']
  }
};

@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent,
    CreateComponent,
    DetailComponent,
    TicketComponent,
    ImagePipe,
    ReferredListComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FilePickerModule,
    ShareButtonsModule.withConfig({ prop: shareProp }),
    ShareIconsModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeModule {
  constructor(iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(...icons);
  }
}
