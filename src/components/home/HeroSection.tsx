
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teklatam-blue-light/10 to-teklatam-orange/10 py-16 md:py-24">
      <div className="teklatam-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Formación tecnológica de <span className="text-teklatam-blue">clase mundial</span> para Latinoamérica
            </h1>
            <p className="text-lg md:text-xl text-teklatam-gray-600 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Programas de especialización diseñados por expertos de la industria para formar los profesionales tecnológicos que la región necesita.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Link to="/programas">
                <Button className="teklatam-btn-primary w-full sm:w-auto text-lg px-8 py-3">
                  Explorar Programas
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" className="teklatam-btn-outline w-full sm:w-auto text-lg px-8 py-3">
                  Contáctanos
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="p-4">
                <div className="text-3xl font-bold text-teklatam-blue">+25</div>
                <div className="text-sm text-teklatam-gray-600">Programas formativos</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-teklatam-blue">+30k</div>
                <div className="text-sm text-teklatam-gray-600">Estudiantes activos</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-teklatam-blue">+100</div>
                <div className="text-sm text-teklatam-gray-600">Instructores expertos</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="lg:w-1/2 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teklatam-blue to-teklatam-orange opacity-30 blur"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Estudiantes de TekLatam" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center space-x-2 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <span className="bg-green-500 h-2 w-2 rounded-full"></span>
              <span className="text-sm font-medium whitespace-nowrap">Convocatoria abierta</span>
              <ArrowRight className="h-4 w-4 text-teklatam-blue" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute top-1/4 left-1/6 bg-teklatam-blue/10 w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 bg-teklatam-orange/10 w-80 h-80 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
