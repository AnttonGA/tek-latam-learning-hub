
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Nosotros = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Cabecera */}
        <section className="py-16 bg-gradient-to-r from-teklatam-blue to-teklatam-dark-blue text-white">
          <div className="teklatam-container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre TekLatam</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Construimos el futuro tecnológico de América Latina a través de educación de calidad mundial.
            </p>
          </div>
        </section>
        
        {/* Historia */}
        <section className="py-16 bg-white">
          <div className="teklatam-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
                <p className="text-teklatam-gray-600 mb-4">
                  TekLatam nació en 2018 con una misión clara: democratizar la educación tecnológica de calidad en América Latina. 
                  Fundada por un grupo de profesionales tech con experiencia en Silicon Valley, nuestra plataforma ha crecido hasta 
                  convertirse en referente de formación especializada.
                </p>
                <p className="text-teklatam-gray-600">
                  Hoy contamos con más de 15,000 estudiantes graduados que trabajan en empresas líderes del sector tecnológico
                  y una red de instructores expertos activos en la industria.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="Equipo TekLatam" 
                  className="rounded-lg shadow-xl w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Misión y Visión */}
        <section className="py-16 bg-teklatam-gray-50">
          <div className="teklatam-container">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-teklatam-blue">Nuestra Misión</h3>
                <p className="text-teklatam-gray-600">
                  Formar profesionales tecnológicos que transformen la economía digital de América Latina, a través de
                  programas educativos de clase mundial que combinen conocimientos teóricos con experiencia práctica real.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-teklatam-orange">Nuestra Visión</h3>
                <p className="text-teklatam-gray-600">
                  Convertirnos en la plataforma educativa tecnológica líder en América Latina, reconocida por la calidad 
                  de sus graduados y por su impacto en la transformación digital de la región.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="teklatam-container text-center">
            <h2 className="text-3xl font-bold mb-4">Comienza tu carrera en tecnología</h2>
            <p className="text-teklatam-gray-600 max-w-2xl mx-auto mb-8">
              Descubre nuestros programas formativos y da el primer paso hacia tu futuro profesional en el sector tecnológico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-teklatam-blue hover:bg-teklatam-blue/90"
                onClick={() => navigate('/')}
              >
                Explorar Programas
              </Button>
              <Button 
                variant="outline"
                className="border-teklatam-blue text-teklatam-blue hover:bg-teklatam-blue hover:text-white"
                onClick={() => navigate('/#contacto')}
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Nosotros;
