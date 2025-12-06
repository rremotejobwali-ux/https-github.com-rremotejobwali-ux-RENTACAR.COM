export enum CarType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  SPORTS = 'Sports',
  ELECTRIC = 'Electric',
  ECONOMY = 'Economy'
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid'
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: CarType;
  fuel: FuelType;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  pricePerDay: number;
  rating: number;
  image: string;
  location: string;
  features: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  carId: string;
  carModel: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  bookedAt: string;
}

export interface SearchFilters {
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: CarType[];
  brand?: string[];
}
