import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatTableModule, MatProgressSpinnerModule, MatPaginatorModule
} from '@angular/material';

import { WorksComponent } from './works/works.component';
import { InboxComponent } from './inbox/inbox.component';
import {AppRoutesModule} from "./app-routes";
import { TableComponent } from './table/table.component';
import {HttpClientModule} from "@angular/common/http";
import {ApartmentsModule} from "./apartments-module/apartments.module";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WorksComponent,
    InboxComponent,
    TableComponent,

  ],
  imports: [
    ApartmentsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
