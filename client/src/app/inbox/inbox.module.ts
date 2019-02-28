import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InboxComponent} from "./inbox.component";

@NgModule({
  providers: [], declarations: [InboxComponent], imports: [
    RouterModule.forChild([
      {path: 'inbox', component: InboxComponent},
    ])
  ]
})
export class InboxModule {

}
