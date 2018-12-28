import {NgModule} from "@angular/core";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {ApartmentRoutesModule} from "./apartments-routes";
import {SharedModule} from "../common/shared.module";

import {TableComponent} from "../table/table.component";
import {InfoComponent} from './info/info.component';
import { DetailComponent } from './apartment/detail/detail.component';
import { PaymentsComponent } from './apartment/payments/payments.component';

@NgModule({
  imports: [SharedModule, ApartmentRoutesModule],
  declarations: [ApartmentsComponent,
    ApartmentComponent, TableComponent, InfoComponent, DetailComponent, PaymentsComponent],

})
export class ApartmentsModule {

}
