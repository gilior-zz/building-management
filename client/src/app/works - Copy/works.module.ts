import {NgModule} from "@angular/core";
import {WorksComponent} from "./works.component";
import {AuthGuardService} from "../services/auth.guard";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../common/shared.module";


@NgModule({
  providers: [],
  declarations: [WorksComponent],
  imports: [SharedModule,
    RouterModule.forChild([
      {path:'',canActivateChild:[AuthGuardService],children:[
          {path: 'works', component: WorksComponent},
        ]}
    ])
  ],
},)

export class ExpandedModule {

}
