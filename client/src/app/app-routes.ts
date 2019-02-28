import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";


let routes: Route[] = [
  {
    path: '', children: [


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
