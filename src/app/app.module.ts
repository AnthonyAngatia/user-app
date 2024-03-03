import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from "ngx-bootstrap/modal";
import { UserFormComponent } from './user/user-form/user-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NotifierModule } from "angular-notifier";
import { NgxPaginationModule } from "ngx-pagination";
import { PaginationComponent } from './common/pagination/pagination.component';
// import { customNotifierOptions } from "../environments/environment";
import { NotifierOptions } from "angular-notifier";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailsComponent } from './user/user-details/user-details.component';

export const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 50
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    PaginationComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
