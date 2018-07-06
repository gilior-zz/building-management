export interface Apartment {
  id: number;
  floor: number,
  debt: number;
  apartmentInfo: ApartmentInfo[];
  apartmentPayments: ApartmentPayments[];
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
  apartments: Apartment[];
  selectedApartmentID: number | undefined;
}


