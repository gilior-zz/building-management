import {Route, RouterModule} from "@angular/router";
import {WorksComponent} from "./works/works.component";
import {InboxComponent} from "./inbox/inbox.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";


let routes: Route[] = [
  {
    path: '', children: [
    {path: 'works', component: WorksComponent},
    {path: 'inbox', component: InboxComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'mainInfo', pathMatch: 'full'}
  ]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
