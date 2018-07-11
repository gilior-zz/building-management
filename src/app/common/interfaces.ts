export interface Apartment {
  apartmentsDash: ApartmentsDash,
  apartmentInfo: ApartmentInfo[];
  apartmentPayments: ApartmentPayments[];
}

export interface ApartmentsDash {
  id: number;
  floor: number,
  debt: number;
}

export interface ApartmentInfo {
  toDelete: boolean;
  isNew: boolean
  apartmentID: number,
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
  metaData: MetaData
}

export interface MetaData {
  lastUpdateTime: Date;
}

export interface User {
  email: string;
  phone: string
}




