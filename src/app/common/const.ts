import {IAppState} from "./interfaces";

export module StoreConst {
  export const INITIAL_STATE: IAppState = {
    apartmentsDash: [],
    selectedApartment: undefined

  }
  export const APARTMENTS_DASH_LOADED = "APARTMENTS_DASH_LOADED";
  export const APARTMENT_SELECTED = "APARTMENT_SELECTED";
}
