
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-teklatam-dark-blue text-white pt-16 pb-8">
      <div className="teklatam-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-white text-2xl font-bold">Tek<span className="text-teklatam-orange">Latam</span></span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              TekLatam es la plataforma educativa líder en América Latina para formación en tecnología, con programas diseñados por expertos de la industria.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('programas')}
                  className="text-white/70 hover:text-white cursor-pointer"
                >
                  Programas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('instructores')}
                  className="text-white/70 hover:text-white cursor-pointer"
                >
                  Instructores
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonios')}
                  className="text-white/70 hover:text-white cursor-pointer"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <Link to="/nosotros" className="text-white/70 hover:text-white">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="text-white/70">
                <span className="block">Email:</span>
                <a href="mailto:info@teklatam.com" className="hover:text-white">info@teklatam.com</a>
              </li>
              <li className="text-white/70">
                <span className="block">Teléfono:</span>
                <a href="tel:+5215551234567" className="hover:text-white">+52 1 555 123 4567</a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="px-4 py-2 bg-teklatam-orange text-white rounded hover:bg-teklatam-orange/90 transition-colors mt-2"
                >
                  Contáctanos
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Derechos de autor */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {currentYear} TekLatam. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 text-sm text-white/70">
            <a href="#" className="hover:text-white">Términos y condiciones</a>
            <a href="#" className="hover:text-white">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
