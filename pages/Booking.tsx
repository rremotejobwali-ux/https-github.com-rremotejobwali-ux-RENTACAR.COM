import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, CreditCard, ChevronLeft, Shield } from 'lucide-react';
import { CARS } from '../constants';
import { Button } from '../components/Button';
import { Booking as BookingType } from '../types';

export const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const car = CARS.find(c => c.id === id);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingType | null>(null);

  // Set default dates
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, startDate: today, endDate: tomorrow }));
  }, []);

  if (!car) {
    return <div className="p-10 text-center">Car not found. <Button onClick={() => navigate('/search')}>Go Back</Button></div>;
  }

  const calculateTotal = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const days = diffDays > 0 ? diffDays : 1;
    return { days, total: days * car.pricePerDay };
  };

  const { days, total } = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call and DB storage
    const newBooking: BookingType = {
      id: Math.random().toString(36).substr(2, 9),
      carId: car.id,
      carModel: `${car.brand} ${car.model}`,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: total,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };

    // Store in local storage (Simulated DB)
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

    setBookingDetails(newBooking);
    setIsSuccess(true);
  };

  if (isSuccess && bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your reservation ID is <span className="font-mono font-bold text-indigo-600">{bookingDetails.id}</span></p>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 text-sm text-gray-700">
            <p className="flex justify-between mb-2"><span>Vehicle:</span> <span className="font-semibold">{bookingDetails.carModel}</span></p>
            <p className="flex justify-between mb-2"><span>Dates:</span> <span>{bookingDetails.startDate} to {bookingDetails.endDate}</span></p>
            <p className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span>Total Paid:</span> <span className="font-bold text-lg text-green-700">${bookingDetails.totalPrice}</span></p>
          </div>

          <p className="text-sm text-gray-500 mb-6">A confirmation email has been sent to {bookingDetails.customerEmail}.</p>
          
          <Button onClick={() => navigate('/')} className="w-full">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Search
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Rental Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.endDate}
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <form id="booking-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </form>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" /> Payment
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-gray-500 text-sm">
                Secure payment gateway integration would go here. For this demo, no payment is required.
              </div>
            </div>

            <Button type="submit" form="booking-form" size="lg" className="w-full text-lg shadow-lg shadow-indigo-500/20">
              Confirm Booking - ${total}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
               <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
               
               <div className="mb-4">
                 <img src={car.image} alt={car.model} className="w-full h-32 object-cover rounded-lg mb-2" />
                 <h4 className="font-bold text-lg">{car.brand} {car.model}</h4>
                 <p className="text-sm text-gray-500">{car.type} • {car.location}</p>
               </div>

               <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                 <div className="flex justify-between">
                   <span className="text-gray-600">Price per day</span>
                   <span className="font-medium">${car.pricePerDay}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Duration</span>
                   <span className="font-medium">{days} days</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Taxes & Fees</span>
                   <span className="font-medium">$0</span>
                 </div>
                 <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-900">
                   <span>Total</span>
                   <span className="text-indigo-600">${total}</span>
                 </div>
               </div>

               <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs">
                 <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                 <p>Free cancellation up to 48 hours before pick-up.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
