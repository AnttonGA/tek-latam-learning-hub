
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-teklatam-gray-900 text-white">
      <div className="teklatam-container">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold">
                Tek<span className="text-teklatam-orange">Latam</span>
              </Link>
            </div>
            <p className="text-teklatam-gray-300 mb-4">
              Formación en tecnología de alta calidad para profesionales latinoamericanos. 
              Transformando carreras y potenciando el desarrollo regional.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-teklatam-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-teklatam-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-teklatam-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-teklatam-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programas/desarrollo-web" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link to="/programas/desarrollo-movil" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Desarrollo Móvil
                </Link>
              </li>
              <li>
                <Link to="/programas/ciencia-datos" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Ciencia de Datos
                </Link>
              </li>
              <li>
                <Link to="/programas/ciberseguridad" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Ciberseguridad
                </Link>
              </li>
              <li>
                <Link to="/programas/inteligencia-artificial" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Inteligencia Artificial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/instructores" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Instructores
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/empleo" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Oportunidades de Empleo
                </Link>
              </li>
              <li>
                <Link to="/alianzas" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  Alianzas Corporativas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-teklatam-gray-400 flex-shrink-0 mt-1" />
                <a href="mailto:contacto@teklatam.com" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  contacto@teklatam.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 text-teklatam-gray-400 flex-shrink-0 mt-1" />
                <a href="tel:+52555123456" className="text-teklatam-gray-400 hover:text-white transition-colors">
                  +52 (55) 5123 4567
                </a>
              </li>
              <li className="mt-4">
                <Link to="/contacto" className="bg-teklatam-blue px-4 py-2 rounded text-white hover:bg-teklatam-blue-dark transition-colors">
                  Enviar Mensaje
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-teklatam-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-teklatam-gray-400">
          <div className="mb-2 md:mb-0">
            &copy; {currentYear} TekLatam. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <Link to="/terminos" className="hover:text-white transition-colors">
              Términos de Servicio
            </Link>
            <Link to="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
