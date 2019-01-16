import {IAppState} from "./interfaces";

export module StoreConst {
  export const INITIAL_STATE: IAppState = {
    apartmentsDash: [],
    selectedApartment: undefined,
    metaData: {lastUpdateTime: undefined, numberOfApartments: 0},
    user: undefined,


  }
  export const APARTMENTS_DASH_LOADED = "APARTMENTS_DASH_LOADED";
  export const APARTMENT_SELECTED = "APARTMENT_SELECTED";
  export const META_DATA_LOADED = "META_DATA_LOADED";
  export const USER_STATUS_CHANGED = "USER_STATUS_CHANGED";

  export const API_URL = '/api/';

  export const API_REQUEST = 'API_REQUEST';

  export const UPDATE_DATA = "UPDATE_DATA"
  export const DATA_UPDATED_ = "DATA_UPDATED_"
}
