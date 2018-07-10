export interface Apartment {
  apartmentsDash:ApartmentsDash,
  apartmentInfo: ApartmentInfo[];
  apartmentPayments: ApartmentPayments[];
}

export interface ApartmentsDash{
  id: number;
  floor: number,
  debt: number;
}

export interface ApartmentInfo {
  toDelete:boolean;
  id: number,
  name: string;
  phone: string;
  email: string;
  status: 'tenant' | 'owner'
}

export interface ApartmentPayments {
  year: number;
  month: number;
  payment: number;
}

export interface IAppState {
  apartmentsDash: ApartmentsDash[];
  selectedApartment: Apartment;
}

export interface User{
  email:string;
  phone:string
}


