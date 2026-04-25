export type AddressLabel = 'Home' | 'Work' | 'Other';
export type Screen = "list" | "form" | "map";



export interface StoredAddress {
  id: string;
  full: string;
  city: string | null;
  lat: number;
  lng: number;
}


export interface PlaceSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}


export interface Address {
  id: string;
  label: AddressLabel | string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  pincode?: string;
}

export interface AddressForm {
  street: string;
  apartmentUnit: string;
  landmark: string;
  deliveryInstructions: string;
  label: AddressLabel;
  receiverName: string;
  phoneNumber: string;
}

export interface LocationInfo {
  name: string;
  subText: string;
  latitude: number;
  longitude: number;
}




export interface AddressesScreenProps {
  addresses: Address[];
  onBack: () => void;
  onAddNew: () => void;
  onShare: (id: string) => void;
  onMoreOptions: (id: string) => void;
  onSelectAddress?: (id: string) => void;
}
 
export interface AddressCardProps {
  address: Address;
  onShare: () => void;
  onMoreOptions: () => void;
  onPress?: () => void;
}
 