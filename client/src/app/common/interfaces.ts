import {ApartmentDebt, ApartmentsDash,Apartment,User} from "../../../../shared/models";







export interface IAppState {
  apartmentsDash: ApartmentDebt[];
  selectedApartment: Apartment;
  metaData: MetaData,
  user: User
}

export interface MetaData {
  numberOfApartments: number;
  lastUpdateTime: Date;
}

// export interface User {
//   email: string;
//   phone: string
// }

export const Resolution: { [id: number]: string } =
  {
    1: 'month',
    2: '3month',
    3: '6month',
    4: 'year',
    5: 'all'
  };




