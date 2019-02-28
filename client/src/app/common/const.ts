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
  export const NEW_DATA = "NEW_DATA"
  export const LOAD_DATA = "LOAD_DATA"
  export const DATA_LOADED_ = "DATA_LOADED_"
  export const LOAD_SELECTED_APARTMENT_DETAILS = "LOAD_SELECTED_APARTMENT_DETAILS"
  export const DATA_LOADED_SelectedApartmentDetails = "DATA_LOADED_SelectedApartmentDetails"
  export const TENANT_DATA_UPDATED = "DATA_UPDATED_name"
  export const TENANT_DATA_ADDED = 'TENANT_DATA_ADDED';

}
