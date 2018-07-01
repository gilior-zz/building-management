import {NgModule} from "@angular/core";
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {IAppState} from "../common/interfaces";
import {rootReducer} from "./reducers";
import * as a from '../common/const'
import {StoreConst} from "../common/const";
import INITIAL_STATE = StoreConst.INITIAL_STATE;
@NgModule({
  imports: [NgReduxModule],
  exports: [NgReduxModule]
})
export class StoreModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
