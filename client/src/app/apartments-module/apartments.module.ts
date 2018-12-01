import {NgModule} from "@angular/core";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {ApartmentRoutesModule} from "./apartments-routes";
import {SharedModule} from "../common/shared.module";

import {TableComponent} from "../table/table.component";
import {InfoComponent} from './info/info.component';

@NgModule({
  imports: [SharedModule, ApartmentRoutesModule],
  declarations: [ApartmentsComponent,
    ApartmentComponent, TableComponent, InfoComponent],

})
export class ApartmentsModule {

}
