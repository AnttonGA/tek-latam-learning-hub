
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, GraduationCap } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-teklatam-gray-900 text-white pt-20 pb-8">
      <div className="teklatam-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <span className="text-white text-2xl font-bold">Tek<span className="text-teklatam-orange">Latam</span></span>
            </Link>
            <p className="text-teklatam-gray-300 mb-8 max-w-md">
              TekLatam es la plataforma educativa líder en América Latina para formación en tecnología, con programas diseñados por expertos de la industria y adaptados a las necesidades del mercado actual.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teklatam-gray-800 flex items-center justify-center text-teklatam-gray-300 hover:bg-teklatam-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teklatam-gray-800 flex items-center justify-center text-teklatam-gray-300 hover:bg-teklatam-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teklatam-gray-800 flex items-center justify-center text-teklatam-gray-300 hover:bg-teklatam-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teklatam-gray-800 flex items-center justify-center text-teklatam-gray-300 hover:bg-teklatam-orange hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-teklatam-orange" />
              Programas
            </h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollToSection('programas')}
                  className="text-teklatam-gray-300 hover:text-teklatam-orange cursor-pointer flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Cursos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('programas')}
                  className="text-teklatam-gray-300 hover:text-teklatam-orange cursor-pointer flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Diplomados
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('programas')}
                  className="text-teklatam-gray-300 hover:text-teklatam-orange cursor-pointer flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Maestrías
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('instructores')}
                  className="text-teklatam-gray-300 hover:text-teklatam-orange cursor-pointer flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Instructores
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Book className="mr-2 h-5 w-5 text-teklatam-orange" />
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-teklatam-orange mr-2">Email:</span>
                <a href="mailto:info@teklatam.com" className="text-teklatam-gray-300 hover:text-teklatam-orange transition-colors">info@teklatam.com</a>
              </li>
              <li className="flex items-start">
                <span className="text-teklatam-orange mr-2">Teléfono:</span>
                <a href="tel:+5215551234567" className="text-teklatam-gray-300 hover:text-teklatam-orange transition-colors">+52 1 555 123 4567</a>
              </li>
              <li className="pt-2">
                <Button
                  onClick={() => scrollToSection('contacto')}
                  className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                >
                  Contáctanos ahora
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Suscripción al boletín */}
        <div className="border-t border-teklatam-gray-800 py-8 my-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold mb-2">¿Quieres recibir noticias y ofertas?</h4>
              <p className="text-teklatam-gray-300">Suscríbete a nuestro boletín para estar al día</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="px-4 py-3 bg-teklatam-gray-800 text-white border border-teklatam-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teklatam-orange w-full md:w-64"
              />
              <Button className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white rounded-l-none">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
        
        {/* Derechos de autor */}
        <div className="border-t border-teklatam-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teklatam-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} TekLatam. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-teklatam-gray-400">
            <a href="#" className="hover:text-teklatam-orange">Términos y condiciones</a>
            <a href="#" className="hover:text-teklatam-orange">Política de privacidad</a>
            <a href="#" className="hover:text-teklatam-orange">Preguntas frecuentes</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
