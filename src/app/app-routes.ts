import {Route, RouterModule} from "@angular/router";
import {WorksComponent} from "./works/works.component";
import {InboxComponent} from "./inbox/inbox.component";
import {NgModule} from "@angular/core";


let routes: Route[] = [
  {path: 'works', component: WorksComponent},
  {path: 'inbox', component: InboxComponent},
  {path: '', redirectTo: 'apartments', pathMatch: 'full'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
