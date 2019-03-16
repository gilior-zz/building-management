import {IAppState} from "../common/interfaces";
import {StoreConst} from "../common/const";
import {FSA} from "flux-standard-action";
import {Apartment, ApartmentDebt, ApartmentTenant} from '../../../../shared/models'
import * as _ from 'lodash'

export type Payload = any;

export interface MetaData {
  actiontype: string;
};

export function rootReducer(lastState: IAppState, action: FSA<Payload, MetaData>): IAppState {
  switch (action.type) {
    case StoreConst.APARTMENTS_DASH_LOADED:
      let state = <IAppState>{...lastState};
      state.apartmentsDash = action.payload;
      return state;
    case StoreConst.APARTMENT_SELECTED:
      state = <IAppState>{...lastState};
      state.selectedApartment = action.payload;
      return state;
    case StoreConst.META_DATA_LOADED:
      state = <IAppState>{...lastState};
      state.metaData = action.payload[0];
      return state;
    case StoreConst.USER_STATUS_CHANGED:
      state = <IAppState>{...lastState};
      state.user = action.payload;
      return state;
    case StoreConst.TENANT_DATA_UPDATED:
      state = <IAppState>{...lastState};
      let tenant = _.find(state.selectedApartment.apartmentTenants, i => i.id === action.payload[0].id);
      let index = _.indexOf(state.selectedApartment.apartmentTenants, tenant);
      for (let key in tenant)
        state.selectedApartment.apartmentTenants[index][key] = action.payload[0][key];
      state.selectedApartment.apartmentTenants = [...state.selectedApartment.apartmentTenants];
      return state;
    case StoreConst.TENANT_DATA_ADDED:
      state = <IAppState>{...lastState};
      state.selectedApartment.apartmentTenants.push(action.payload[0])
      state.selectedApartment.apartmentTenants = [...state.selectedApartment.apartmentTenants];
      return state
    case StoreConst.DATA_LOADED_SelectedApartmentDetails:
      let l = <[[ApartmentDebt], [ApartmentTenant], [Apartment]]>action.payload;
      let data: Apartment = {
        floor: l[2][0].floor,
        id: l[2][0].id,
        apartmentTenants: l[1],
        apartmentPayments: l[0]
      };
      state = <IAppState>{...lastState};
      state.selectedApartment = data;
      return state;
    case StoreConst.DATA_LOADED_WORKS:
      state = {...lastState};
      state.works = action.payload;
      return state;
  }
  return lastState;
}
