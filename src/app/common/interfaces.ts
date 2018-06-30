export interface Apartment {
  id: number;
  status: 'tenant' | 'owner'
  debt: number;
  apartrmentInfo: ApartrmentInfo[]
}

export interface ApartrmentInfo {
  name: string;
  phone: string;
  email: string;
}


