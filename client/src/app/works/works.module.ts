import {NgModule} from "@angular/core";
import {WorksComponent} from "./works.component";
import {AuthGuardService} from "../services/auth.guard";
import {RouterModule} from "@angular/router";


@NgModule({
  providers: [], declarations: [WorksComponent], imports: [
    RouterModule.forChild([
      {path:'',canActivateChild:[AuthGuardService],children:[
          {path: 'works', component: WorksComponent},
        ]}
    ])
  ],
},)

export class WorksModule {

}
