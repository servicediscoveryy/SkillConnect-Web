// src/types.ts (or wherever your types are defined)
export interface CategoryType {
  _id: string;
  category: string;
  image: string; // Ensure this is always a string, avoiding `undefined`
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[];
  status: string;
  view: number;
  avgRating: number | null;
  ratingCount: number;
  category: {
    category: string;
  };
  createdAt: string;
}

export interface FilterState {
  priceRange: [number, number];
  category: string;
  location: string;
  rating: number;
  sort: string;
}

export interface ImageRatingData {
  _id: string;
  image: string[];
  avgRating: number;
  title: string;
}

export interface CategoryWiseServicesProps {
  data: Array<CategoryType & { services: ServiceData[] }>;
}

export type ServiceDetail = {
  _id: string;
  providerId: {
    _id: string;
    email: string;
  };
  title: string;
  description: string;
  category: string;
  image: string[];
  price: number;
  status: string;
  view: number;
  location: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratings: {
    _id: string;
    userId: {
      _id: string;
      email: string;
      profilePicture: string;
    };
    serviceId: string;
    rating: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  ratingAvg: {
    _id: string;
    avgRating: number;
    totalRating: number;
  }[];
};

export interface User {
  email: string;
  role: string;
  userId: string;
}

export interface searchData {
  _id: string;
  title: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[]; // Array of image URLs or base64 strings
}

interface CartItem {
  serviceId: Service; // The service being added to the cart
}

interface Cart {
  items: CartItem[]; // Array of cart items
}

export interface CartData {
  cart: Cart[]; // Array of carts (assuming multiple carts are possible)
  totalItems: number;
  totalAmount: number;
}

export interface AddressData {
  street: string;
  area?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark?: string;
}
