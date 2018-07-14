export interface Apartment {
  apartmentsDash: ApartmentsDash,
  apartmentTenants: ApartmentTenant[];
  apartmentPayments: ApartmentPayment[];
}

export interface ApartmentsDash {
  id: number;
  floor: number,
  debt: number;
}

export interface ApartmentTenant {
  toDelete: boolean;
  id: number,
  isNew: boolean
  apartmentID: number,
  name: string;
  family: string;
  phone: string;
  email: string;
  status: 'tenant' | 'owner';
}

export interface ApartmentPayment {
  id: number;
  year: number;
  month: number;
  payment: number;
}

export interface IAppState {
  apartmentsDash: ApartmentsDash[];
  selectedApartment: Apartment;
  metaData: MetaData,
  user: ApartmentTenant
}

export interface MetaData {
  lastUpdateTime: Date;
}

export interface User {
  email: string;
  phone: string
}


