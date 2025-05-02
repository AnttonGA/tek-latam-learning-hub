
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
              <div className="relative group">
                <button className="flex items-center text-teklatam-gray-700 hover:text-teklatam-blue">
                  Programas <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/programas/desarrollo-web" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teklatam-blue-light hover:text-white">
                    Desarrollo Web
                  </Link>
                  <Link to="/programas/ciencia-datos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teklatam-blue-light hover:text-white">
                    Ciencia de Datos
                  </Link>
                  <Link to="/programas/ciberseguridad" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teklatam-blue-light hover:text-white">
                    Ciberseguridad
                  </Link>
                </div>
              </div>
              
              <Link to="/instructores" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Instructores
              </Link>
              
              <Link to="/blog" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Blog
              </Link>
              
              <Link to="/nosotros" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Nosotros
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="teklatam-btn-outline">
                  Iniciar Sesión
                </Button>
              </Link>
              
              <Link to="/registro">
                <Button className="teklatam-btn-primary">
                  Registrarse
                </Button>
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
            <Link to="/programas" className="block py-2 text-teklatam-gray-700">
              Programas
            </Link>
            <Link to="/instructores" className="block py-2 text-teklatam-gray-700">
              Instructores
            </Link>
            <Link to="/blog" className="block py-2 text-teklatam-gray-700">
              Blog
            </Link>
            <Link to="/nosotros" className="block py-2 text-teklatam-gray-700">
              Nosotros
            </Link>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full teklatam-btn-outline">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/registro" className="block">
                <Button className="w-full teklatam-btn-primary">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
