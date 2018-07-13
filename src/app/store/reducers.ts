import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {FSA} from "flux-standard-action";
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;
import MAININFO_LOADED = StoreConst.APARTMENTS_DASH_LOADED;
import META_DATA_LOADED = StoreConst.META_DATA_LOADED;

import USER_STATUS_CHANGED = StoreConst.USER_STATUS_CHANGED;

export type Payload = any;

export interface MetaData {
  actiontype: string;
};

export function rootReducer(lastState: IAppState, action: FSA<Payload, MetaData>): IAppState {
  switch (action.type) {
    case MAININFO_LOADED:
      let state = <IAppState>{...lastState};
      state.apartmentsDash = action.payload;
      return state;
    case APARTMENT_SELECTED:
      state = <IAppState>{...lastState};
      state.selectedApartment = action.payload;
      return state;
    case META_DATA_LOADED:
      state = <IAppState>{...lastState};
      state.metaData = action.payload;
      return state;
    case USER_STATUS_CHANGED:
      state = <IAppState>{...lastState};
      state.user = action.payload;
      return state;
  }
  return lastState;
}
