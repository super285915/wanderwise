export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  currency: string;
  category: 'trending' | 'popular' | 'recommended';
}

export interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  type?: 'flight' | 'hotel' | 'car' | 'experience';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  currency: string;
  perNight: boolean;
  rating: number;
  reviewCount: number;
  amenities: string[];
}

export interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: number;
  currency: string;
  stops: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}