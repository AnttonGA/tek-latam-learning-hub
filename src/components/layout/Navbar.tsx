
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="teklatam-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-teklatam-blue text-xl font-bold">Tek<span className="text-teklatam-orange">Latam</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <a href="#programas" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Programas
              </a>
              
              <a href="#instructores" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Instructores
              </a>
              
              <a href="#testimonios" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Testimonios
              </a>
              
              <Link to="/nosotros" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Nosotros
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-teklatam-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <a href="#programas" className="block py-2 text-teklatam-gray-700">
              Programas
            </a>
            <a href="#instructores" className="block py-2 text-teklatam-gray-700">
              Instructores
            </a>
            <a href="#testimonios" className="block py-2 text-teklatam-gray-700">
              Testimonios
            </a>
            <Link to="/nosotros" className="block py-2 text-teklatam-gray-700">
              Nosotros
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
