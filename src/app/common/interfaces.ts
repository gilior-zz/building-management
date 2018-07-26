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
  numberOfApartments: number;
  lastUpdateTime: Date;
}

export interface User {
  email: string;
  phone: string
}

export const Resolution: { [id: number]: string } =
  {
    1: 'month',
    2: '3month',
    3: '6month',
    4: 'year',
    5: 'all'
  };




