
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { dataService, SiteContent } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GraduationCap, Book } from "lucide-react";

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const navigate = useNavigate();

  // Carrusel de imágenes para el hero
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Formación tecnológica especializada",
      subtitle: "Aprende con expertos del sector"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      title: "Impulsa tu carrera profesional",
      subtitle: "Programas diseñados para el mercado actual"
    },
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      title: "Aprendizaje flexible y práctico",
      subtitle: "Compatible con tu vida profesional"
    }
  ];

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
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 bg-gradient-to-r from-teklatam-blue to-teklatam-dark-blue text-white">
      <Carousel className="w-full max-w-full overflow-hidden h-[500px]">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${image.url})` }}
                >
                  {/* Overlay oscuro para mejorar legibilidad del texto */}
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                
                {/* Contenido superpuesto */}
                <div className="teklatam-container relative z-10 h-full flex flex-col justify-center items-start">
                  <div className="max-w-2xl space-y-6 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {image.title}
                    </h1>
                    <p className="text-lg text-white/90 max-w-lg">
                      {image.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button 
                        size="lg" 
                        className="teklatam-btn-primary bg-teklatam-orange hover:bg-teklatam-orange/90"
                        onClick={() => scrollToSection('programas')}
                      >
                        <GraduationCap className="mr-2" />
                        Ver Programas
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-teklatam-blue"
                        onClick={() => scrollToSection('nosotros')}
                      >
                        <Book className="mr-2" />
                        Conoce Más
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          <CarouselPrevious className="relative left-0 top-0 h-9 w-9 translate-x-0 translate-y-0" />
          <CarouselNext className="relative right-0 top-0 h-9 w-9 translate-x-0 translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
