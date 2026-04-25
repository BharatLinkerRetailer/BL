
export interface Address {
  id?: string;
  street: string;
  apartmentUnit?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark?: string;
  label?: string;
  deliveryInstructions?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
  createdAt?: any;
  updatedAt?: any;
}
