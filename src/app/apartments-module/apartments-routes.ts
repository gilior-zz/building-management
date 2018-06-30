import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";


const routes: Route[] = [
  {    path: 'apartments', component: ApartmentsComponent      },
  {    path: 'apartments/:id', component: ApartmentComponent      },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutesModule {

}
