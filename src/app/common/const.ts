import {IAppState} from "./interfaces";

export module StoreConst {
  export const INITIAL_STATE: IAppState = {
    apartments: [],
    selectedApartmentID: undefined

  }
  export const APARTMENTS_LOADED = "APARTMENTS_LOADED";
  export const APARTMENT_SELECTED = "APARTMENT_SELECTED";
}
