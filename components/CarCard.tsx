import React from 'react';
import { Car } from '../types';
import { Users, Fuel, Settings, Star, MapPin } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="text-sm font-semibold">{car.rating}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">{car.type}</p>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">${car.pricePerDay}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            {car.location}
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 mt-auto">
          <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
            <Settings className="w-4 h-4 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
            <Fuel className="w-4 h-4 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
            <Users className="w-4 h-4 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">{car.seats} Seats</span>
          </div>
        </div>

        <div className="mt-4 pt-4">
          <Link to={`/book/${car.id}`} className="block">
            <Button variant="primary" className="w-full">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
