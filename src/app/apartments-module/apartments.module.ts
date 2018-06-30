import {NgModule} from "@angular/core";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {ApartmentRoutesModule} from "./apartments-routes";
import {SharedModule} from "../common/shared.module";
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';

@NgModule({
  imports:[SharedModule, ApartmentRoutesModule],
  declarations: [ApartmentsComponent,
    ApartmentComponent,
    ApartmentDetailsComponent],

})
export class ApartmentsModule {

}
