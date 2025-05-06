
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { dataService, SiteContent } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Book, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const navigate = useNavigate();

  // Carrusel de imágenes para el hero con mejores imágenes y textos
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Formación tecnológica especializada",
      subtitle: "Aprende con expertos del sector y obtén certificaciones reconocidas a nivel internacional"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      title: "Impulsa tu carrera profesional",
      subtitle: "Programas diseñados para las demandas actuales del mercado tecnológico en Latinoamérica"
    },
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      title: "Aprendizaje flexible y práctico",
      subtitle: "Metodología que combina teoría y práctica con horarios compatibles con tu vida profesional"
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
      <section className="pt-16 pb-12 min-h-[500px] flex items-center justify-center">
        <p className="text-center text-lg">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full">
      {/* Eliminamos la clase de altura fija para que abarque todo el ancho */}
      <Carousel className="w-full overflow-hidden h-[80vh]">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                {/* Imagen de fondo mejorada con mejor calidad */}
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ 
                    backgroundImage: `url(${image.url})`,
                    backgroundPosition: 'center 30%'
                  }}
                >
                  {/* Overlay con gradiente más dinámico para mejorar legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>
                
                {/* Contenido superpuesto con más espacio a los lados */}
                <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12">
                  <div className="max-w-2xl space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white animate-slide-up">
                      {image.title}
                    </h1>
                    <p className="text-xl text-white/90 max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      {image.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <Button 
                        size="default" 
                        className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                        onClick={() => scrollToSection('programas')}
                      >
                        <GraduationCap className="mr-2" />
                        Ver Programas
                      </Button>
                      <Button 
                        size="default" 
                        variant="outline" 
                        className="border-2 border-white text-white hover:bg-white/10 hover:text-white"
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
        
        {/* Controles del carousel mejorados */}
        <div className="absolute z-20 inset-0 pointer-events-none flex items-center justify-between px-4">
          <div className="pointer-events-auto">
            <CarouselPrevious className="h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" >
              <ChevronLeft className="size-6" />
            </CarouselPrevious>
          </div>
          <div className="pointer-events-auto">
            <CarouselNext className="h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white">
              <ChevronRight className="size-6" />
            </CarouselNext>
          </div>
        </div>

        {/* Indicadores de slide */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <span 
              key={index} 
              className="w-3 h-3 rounded-full bg-white/50 block"
            ></span>
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
