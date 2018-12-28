import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavComponent} from './common/nav/nav.component';
import {WorksComponent} from './works/works.component';
import {InboxComponent} from './inbox/inbox.component';
import {AppRoutesModule} from "./app-routes";
import {HttpClientModule} from "@angular/common/http";
import {ApartmentsModule} from "./apartments-module/apartments.module";
import {SharedModule} from "./common/shared.module";
import {StoreModule} from "./store/store.module";
import {LoginComponent} from './login/login.component';
import {AuthService} from "./services/auth.service";
import {MetaDataService} from "./services/meta-data.service";
import {InvoiceModule} from "./invoice/invoice.module";
import {IconService} from "./services/icon.service";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WorksComponent,
    InboxComponent,

    LoginComponent,

  ],
  imports: [
    SharedModule,
    StoreModule,
    ApartmentsModule,
    InvoiceModule,
    HttpClientModule,
    BrowserModule,
    AppRoutesModule
  ],
  providers: [AuthService, MetaDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private  a: IconService) {
  }
}
