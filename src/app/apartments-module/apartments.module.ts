import {NgModule} from "@angular/core";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {ApartmentRoutesModule} from "./apartments-routes";

@NgModule({
  imports:[ApartmentRoutesModule],
  declarations: [ApartmentsComponent,
    ApartmentComponent],

})
export class ApartmentsModule {

}
