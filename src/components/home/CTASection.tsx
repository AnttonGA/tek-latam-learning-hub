
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const benefits = [
    'Profesores con experiencia en la industria',
    'Proyectos prácticos basados en casos reales',
    'Comunidad de aprendizaje colaborativo',
    'Certificación reconocida por empresas',
    'Bolsa de trabajo exclusiva',
    'Mentoría personalizada'
  ];
  
  return (
    <section className="teklatam-section bg-white">
      <div className="teklatam-container">
        <div className="bg-gradient-to-br from-teklatam-blue/10 to-teklatam-orange/10 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Content */}
            <div className="p-8 md:p-12">
              <div className="inline-block bg-teklatam-blue/10 text-teklatam-blue font-medium rounded-full px-4 py-1 text-sm mb-6">
                ¿Listo para Avanzar?
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforma tu futuro con las habilidades más demandadas</h2>
              
              <p className="text-teklatam-gray-600 mb-8">
                Avanza tu carrera profesional con programas formativos diseñados para el mercado latinoamericano. Aprende de expertos, construye proyectos reales y únete a una comunidad de profesionales tecnológicos en crecimiento.
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-teklatam-orange/10 text-teklatam-orange p-0.5 rounded-full mr-3 flex-shrink-0 mt-1">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-teklatam-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/programas">
                  <Button className="teklatam-btn-primary w-full sm:w-auto">
                    Explorar Programas
                  </Button>
                </Link>
                
                <Link to="/contacto">
                  <Button variant="outline" className="teklatam-btn-outline w-full sm:w-auto">
                    Hablar con un Asesor
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Content - Image */}
            <div className="relative md:flex items-center justify-center hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Estudiantes colaborando" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 right-12 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-start">
                  <div className="bg-teklatam-blue/10 p-2 rounded">
                    <ArrowRight className="h-6 w-6 text-teklatam-blue" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">+85%</h4>
                    <p className="text-sm text-teklatam-gray-600">de nuestros estudiantes obtienen mejores oportunidades profesionales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
