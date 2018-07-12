export interface Apartment {
  apartmentsDash: ApartmentsDash,
  apartmentInfo: ApartmentTenants[];
  apartmentPayments: ApartmentPayments[];
}

export interface ApartmentsDash {
  id: number;
  floor: number,
  debt: number;
}

export interface ApartmentTenants {
  toDelete: boolean;
  id: number,
  name: string;
  family: string;
  phone: string;
  email: string;
  status: 'tenant' | 'owner'
}

export interface ApartmentPayments {
  id: number;
  year: number;
  month: number;
  payment: number;
}

export interface IAppState {
  apartmentsDash: ApartmentsDash[];
  selectedApartment: Apartment;
}

export interface User {
  email: string;
  phone: string
}


