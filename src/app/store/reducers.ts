import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {FSA} from "flux-standard-action";

import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;
import MAININFO_LOADED = StoreConst.APARTMENTS_DASH_LOADED;

export type Payload = any;

export interface MetaData {
  actiontype: string;
};

export function rootReducer(lastState: IAppState, action: FSA<Payload, MetaData>): IAppState {
  switch (action.type) {
    case MAININFO_LOADED:
      let state = <IAppState>{...lastState};
      state.apartmentsDash = action.payload
      return state;
    case APARTMENT_SELECTED:
      state = <IAppState>{...lastState};
      state.selectedApartment = action.payload
      return state;
  }
  return lastState;
}
