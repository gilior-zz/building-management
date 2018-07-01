export interface Apartment {
  id: number;
  status: 'tenant' | 'owner'
  debt: number;
  apartmentInfo: ApartmentInfo[];
  apartmentPayments: ApartmentPayments[];
}

export interface ApartmentInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ApartmentPayments {
  year: number;
  month: number;
  payment: number;
}

export interface IAppState {
  apartments: Apartment[];
  selectedApartmentID: number|undefined;
}


