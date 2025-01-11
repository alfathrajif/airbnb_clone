export interface Category {
  name: string;
  icon: string;
  path: string;
}

export interface Amenity {
  name: string;
  icon: string;
  type: string;
  isMain: boolean;
}

export interface BookingOption {
  name: string;
  icon: string;
}
