import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSortModule,
  MatTableModule,
  MatToolbarModule,

} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  exports: [ BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatPaginatorModule,ReactiveFormsModule,
  FormsModule]
})
export class SharedModule {
}
