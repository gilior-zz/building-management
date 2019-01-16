import {NgModule} from "@angular/core";
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {IAppState, IMetadata} from "../common/interfaces";
import {rootReducer} from "./reducers";
import {StoreConst} from '../common/const'
import {combineEpics, createEpicMiddleware, ofType} from "redux-observable";
import {applyMiddleware, createStore} from "redux";
import {mergeMap, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Epics} from "./epics";
import UPDATE_DATA = StoreConst.UPDATE_DATA;

@NgModule({
  imports: [NgReduxModule],
  exports: [NgReduxModule],
  providers: [Epics]
})


export class StoreModule {

  rootEpic = combineEpics(this.epics.updateData);
  epicMiddleware = createEpicMiddleware();

  constructor(ngRedux: NgRedux<IAppState>, private epics: Epics) {
    const store = createStore(rootReducer, applyMiddleware(this.epicMiddleware));
    this.epicMiddleware.run(this.rootEpic);

    // ngRedux.configureStore(rootReducer, INITIAL_STATE, this.middleware);
    ngRedux.provideStore(store);
  }
}
