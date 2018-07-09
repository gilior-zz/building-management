import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,

} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {ReactiveFormsModule} from "@angular/forms";

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
    MatCheckboxModule,
    MatPaginatorModule,ReactiveFormsModule]
})
export class SharedModule {
}
