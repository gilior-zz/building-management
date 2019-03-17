import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,

} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CdkTableModule} from "@angular/cdk/table";
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from './pipes/date.pipe';
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
  FormsModule,CdkTableModule,MatInputModule,MatRadioModule,MatCardModule,MatChipsModule,MatSnackBarModule,DatePipe],
  declarations: [DatePipe]
})
export class SharedModule {
}
