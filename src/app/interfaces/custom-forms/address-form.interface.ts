export interface BaseAddressForm {
  street: string;
  city: string;
  building: string;
  barangay: string;
  province: string;
  postalCode?: string;
}

export interface AccountAddressForm extends BaseAddressForm {
  house: string;
  number: string;
  municipality: string;
}

export interface ParcelAddressForm extends BaseAddressForm {
  lat: number;
  lng: number;
  description: string;
  region: string;
  zipCode: number;
}
