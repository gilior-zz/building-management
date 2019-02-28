import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ApartmentsComponent} from "./apartments/apartments.component";
import {ApartmentComponent} from "./apartment/apartment.component";
import {AuthGuardService} from "../services/auth.guard";


const routes: Route[] = [
  {
    path: '', canActivateChild: [AuthGuardService], children: [
      {path: 'apartments', component: ApartmentsComponent},
      {path: 'apartments/:id', component: ApartmentComponent},
      {path: '', redirectTo: 'apartments', pathMatch: 'full'},
    ]
  }


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class ApartmentRoutesModule {

}
