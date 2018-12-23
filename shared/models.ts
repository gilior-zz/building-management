export interface proc_param {
    name: string;
    value: string | number
    type: any;
}

export interface ApartmentDebt {
    month: number;
    year: number;
    amount: number;
    id: number;
    apartment_id: number;
    payment: number;
    debt: number;
    floor: number
}

export type User = Apartment & ApartmentTenant;


export interface ApartmentsDash {
    apartment_id: number;
    floor: number,
    debt: number;
}

export interface Apartment {
    id: number,
    floor: number,
    apartmentTenants: ApartmentTenant[];
    apartmentPayments: ApartmentDebt[];
}

export interface ApartmentPayment {
    id: number;
    year: number;
    month: number;
    payment: number;
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


