import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { Button } from '../components/Button';
import { CARS, LOCATIONS } from '../constants';
import { CarType, FuelType } from '../types';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<CarType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState<number>(300);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating'>('rating');

  // Initialize from URL
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setSelectedLocation(loc);
  }, [searchParams]);

  // Filtering Logic
  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchLocation = selectedLocation ? car.location === selectedLocation : true;
      const matchType = selectedTypes.length > 0 ? selectedTypes.includes(car.type) : true;
      const matchPrice = car.pricePerDay <= priceRange;
      
      return matchLocation && matchType && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price_desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedLocation, selectedTypes, priceRange, sortBy]);

  const toggleType = (type: CarType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
            <p className="text-gray-500 mt-1">{filteredCars.length} cars found</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="md:hidden flex-1">
              <Button variant="outline" className="w-full flex gap-2" onClick={() => setIsMobileFilterOpen(true)}>
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-500 pl-2">Sort by:</span>
              <select 
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-0 bg-white z-50 p-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 lg:w-64 lg:p-0 lg:bg-transparent lg:block
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-8">
              {/* Location Filter */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Location
                </h3>
                <select 
                  className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              {/* Price Filter */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Max Price: ${priceRange}/day</h3>
                <input 
                  type="range" 
                  min="30" 
                  max="500" 
                  step="10" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$30</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Type Filter */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Car Type</h3>
                <div className="space-y-2">
                  {Object.values(CarType).map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedLocation('');
                    setSelectedTypes([]);
                    setPriceRange(500);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
