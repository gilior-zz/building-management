import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {FSA} from "flux-standard-action";
import APARTMENTS_LOADED = StoreConst.APARTMENTS_LOADED;
import APARTMENT_SELECTED = StoreConst.APARTMENT_SELECTED;

export type Payload = any;

export interface MetaData {
  actiontype: string;
};

export function rootReducer(lastState: IAppState, action: FSA<Payload, MetaData>): IAppState {
  switch (action.type) {
    case APARTMENTS_LOADED:
      let state = <IAppState>{...lastState};
      state.apartments = action.payload
      return state;
    case APARTMENT_SELECTED:
      let state = <IAppState>{...lastState};
      state.selectedApartmentID = action.payload
      return state;
  }
  return lastState;
}
