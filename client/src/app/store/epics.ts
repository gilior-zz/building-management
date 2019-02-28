import {ofType} from "redux-observable";
import {StoreConst} from "../common/const";
import {of} from "rxjs";
import {mergeMap, switchMap} from "rxjs/operators";
import {DataService} from "../services/data.service";
import {IActionPayload, IMetadata} from "../common/interfaces";

import {Injectable} from "@angular/core";



@Injectable()
export class Epics {
  //  incrementIfOddEpic = (action$, state$) => action$.pipe(
  //   ofType(INCREMENT_IF_ODD),
  //   filter(() => state$.value.counter % 2 === 1),
  //   map(() => increment())
  // );
  updateData = (action$, state$) =>
    action$.pipe(
      ofType(StoreConst.UPDATE_DATA),
      switchMap((metadata: IActionPayload) =>
        this.dataService.udpateData(metadata.meta).pipe(
          mergeMap(response => of(
            {type: metadata.meta.continueWith, meta: null, payload: response}
          ))
        )
      )
    );

  newData = (action$, state$) =>
    action$.pipe(
      ofType(StoreConst.NEW_DATA),
      switchMap((metadata: IActionPayload) =>
        this.dataService.newData(metadata.meta).pipe(
          mergeMap(response => of(
            {type: metadata.meta.continueWith, meta: null, payload: response}
          ))
        )
      )
    );

  getData = (action$, state$) =>
    action$.pipe(
      ofType(StoreConst.LOAD_DATA),
      switchMap((metadata: IActionPayload) =>
        this.dataService.loadData(metadata.meta).pipe(
          mergeMap(response => of(
            {type: metadata.meta.continueWith, meta: null, payload: response}
          ))
        )
      )
    );

  constructor(private dataService: DataService) {
  }
}

