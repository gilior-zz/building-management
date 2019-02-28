import {NgModule} from "@angular/core";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {ApartmentRoutesModule} from "./apartments-routes";
import {SharedModule} from "../common/shared.module";

import {TableComponent} from "../table/table.component";
import {InfoComponent} from './info/info.component';
import { DetailComponent } from './apartment/detail/detail.component';
import { PaymentsComponent } from './apartment/payments/payments.component';
import { InfoFormFieldComponent } from './info/info-form-field/info-form-field.component';
import { DetailHeaderComponent } from './apartment/detail/detail-header/detail-header.component';

@NgModule({
  imports: [SharedModule, ApartmentRoutesModule],
  declarations: [ApartmentsComponent,
    ApartmentComponent, TableComponent, InfoComponent, DetailComponent, PaymentsComponent, InfoFormFieldComponent, DetailHeaderComponent],

})
export class ApartmentsModule {

}
