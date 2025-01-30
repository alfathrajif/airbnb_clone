export interface DestinationType {
  location: string;
  description: string;
  icon: string;
  textColor: string;
  bgColor: string;
}

export interface CategoryType {
  name: string;
  icon: string;
  path: string;
}

export interface AmenityType {
  name: string;
  icon: string;
  type: string;
  isMain: boolean;
}

export interface BookingOptionType {
  name: string;
  icon: string;
}

export interface ChartDataType {
  label: string;
  value: number;
}

export interface PropertyTypeType {
  name: string;
  icon: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string;
  phone?: string;
  profile_picture: string;
  location: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  listings: ListingType[];
}

export interface ListingType {
  id: string;
  host: UserType;
  host_id: string;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  listing_photos: ListingPhotoType[];
  bathrooms: number;
  // amenities: AmenityType[];
  // house_rules: HouseRuleType[];
  cancellation_policy?: string;
  check_in_time: Date;
  check_out_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ListingPhotoType {
  id: string;
  photo_url: string;
  listing_id: string;
  created_at: Date;
  updated_at: Date;
}
