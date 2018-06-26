import {Route, RouterModule} from "@angular/router";
import {PaymentsComponent} from "./payments/payments.component";
import {WorksComponent} from "./works/works.component";
import {InboxComponent} from "./inbox/inbox.component";
import {NgModule} from "@angular/core";

let routes: Route[] = [
  {path: 'payments', component: PaymentsComponent},
  {path: 'works', component: WorksComponent},
  {path: 'inbox', component: InboxComponent},
  {path: '', redirectTo: 'payments', pathMatch: 'full'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
