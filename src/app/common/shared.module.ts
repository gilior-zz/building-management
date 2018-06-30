import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatIconModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule,

} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";

@NgModule({
  exports: [ BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,]
})
export class SharedModule {
}
