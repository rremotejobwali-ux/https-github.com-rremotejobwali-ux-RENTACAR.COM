import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CarFront, Menu } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600';

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <CarFront className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Genius<span className="text-indigo-600">Rent</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/search" className={`font-medium transition-colors ${isActive('/search')}`}>Browse Cars</Link>
            <Link to="#" className="font-medium text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="#" className="font-medium text-gray-600 hover:text-indigo-600">Contact</Link>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm">Sign Up</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4">
          <div className="px-4 pt-2 space-y-1">
            <Link to="/" className="block py-2 text-base font-medium text-gray-900">Home</Link>
            <Link to="/search" className="block py-2 text-base font-medium text-gray-600">Browse Cars</Link>
            <Link to="#" className="block py-2 text-base font-medium text-gray-600">About</Link>
            <Link to="#" className="block py-2 text-base font-medium text-gray-600">Contact</Link>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-center">Sign In</Button>
              <Button className="w-full justify-center">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
