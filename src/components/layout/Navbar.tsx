
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    console.log("Intentando scrollear a la sección desde Navbar:", sectionId);
    setIsOpen(false);
    
    // Asegurarse de que sectionId no tenga un # al inicio
    const cleanSectionId = sectionId.replace(/^#+/, '');
    
    const element = document.getElementById(cleanSectionId);
    if (element) {
      console.log("Elemento encontrado en página actual, haciendo scroll a:", cleanSectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Elemento no encontrado en la página actual");
      // Si no existe el elemento, podemos estar en otra página
      navigate(`/?section=${cleanSectionId}`);
    }
  };

  // Si estamos en otra página que no sea la principal, navegar a la página principal y luego al anchor
  const handleNavigation = (sectionId: string) => {
    console.log("Intentando navegar a sección:", sectionId);
    const currentPath = window.location.pathname;
    
    if (currentPath === '/') {
      scrollToSection(sectionId);
    } else {
      console.log("No estamos en la página principal, navegando a:", `/?section=${sectionId}`);
      navigate(`/?section=${sectionId}`);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="teklatam-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/76589c46-9636-4c03-a68d-7af74a38740e.png" 
              alt="TekLatam Logo" 
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleNavigation('programas')} 
                className="text-teklatam-gray-700 hover:text-teklatam-blue"
              >
                Programas
              </button>
              
              <button 
                onClick={() => handleNavigation('instructores')} 
                className="text-teklatam-gray-700 hover:text-teklatam-blue"
              >
                Instructores
              </button>
              
              <button 
                onClick={() => handleNavigation('testimonios')} 
                className="text-teklatam-gray-700 hover:text-teklatam-blue"
              >
                Testimonios
              </button>
              
              <Link to="/noticias" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Noticias
              </Link>
              
              <Link to="/nosotros" className="text-teklatam-gray-700 hover:text-teklatam-blue">
                Nosotros
              </Link>
            </div>

            <Link to="/login">
              <Button variant="outline" className="border-teklatam-blue text-teklatam-blue hover:bg-teklatam-blue hover:text-white">
                Acceso
              </Button>
            </Link>
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
            <button 
              onClick={() => handleNavigation('programas')}
              className="block py-2 text-teklatam-gray-700 w-full text-left"
            >
              Programas
            </button>
            <button 
              onClick={() => handleNavigation('instructores')}
              className="block py-2 text-teklatam-gray-700 w-full text-left"
            >
              Instructores
            </button>
            <button 
              onClick={() => handleNavigation('testimonios')}
              className="block py-2 text-teklatam-gray-700 w-full text-left"
            >
              Testimonios
            </button>
            <Link to="/noticias" className="block py-2 text-teklatam-gray-700" onClick={() => setIsOpen(false)}>
              Noticias
            </Link>
            <Link to="/nosotros" className="block py-2 text-teklatam-gray-700" onClick={() => setIsOpen(false)}>
              Nosotros
            </Link>
            <div className="mt-4">
              <Link to="/login">
                <Button variant="outline" className="w-full border-teklatam-blue text-teklatam-blue hover:bg-teklatam-blue hover:text-white">
                  Acceso
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
