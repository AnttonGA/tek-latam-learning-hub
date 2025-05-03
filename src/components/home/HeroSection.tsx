
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { dataService, SiteContent } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const siteContent = dataService.getSiteContent();
      setContent(siteContent);
    } catch (error) {
      console.error("Error al cargar el contenido del hero:", error);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!content) {
    return (
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 bg-gradient-to-r from-teklatam-blue to-teklatam-dark-blue text-white">
        <div className="teklatam-container flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-center text-lg">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 bg-gradient-to-r from-teklatam-blue to-teklatam-dark-blue text-white">
      <div className="teklatam-container grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-white/80 max-w-lg">
            {content.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="teklatam-btn-primary bg-teklatam-orange hover:bg-teklatam-orange/90"
              onClick={() => scrollToSection('programas')}
            >
              Ver Programas
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-teklatam-blue"
              onClick={() => scrollToSection('nosotros')}
            >
              Conoce Más
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center md:justify-end">
          <img 
            src={content.heroImage} 
            alt="Estudiantes TekLatam" 
            className="rounded-lg shadow-xl max-w-full h-auto transform rotate-1"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
