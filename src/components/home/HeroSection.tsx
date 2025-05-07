
import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { dataService } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Book, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteContent } from "@/types"; // Import types from our types file

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
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
    } else if (sectionId.startsWith('#')) {
      // Si es un enlace con ancla, intentamos con el ID sin el #
      const elementId = sectionId.substring(1);
      const elem = document.getElementById(elementId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!content) {
    return (
      <section className="pt-16 pb-12 min-h-[500px] flex items-center justify-center">
        <p className="text-center text-lg">Cargando...</p>
      </section>
    );
  }

  const handleButtonClick = (linkTo?: string) => {
    if (!linkTo) return;
    
    if (linkTo.startsWith('#')) {
      scrollToSection(linkTo);
    } else if (linkTo.startsWith('/')) {
      navigate(linkTo);
    } else {
      // Si es una URL externa
      window.open(linkTo, '_blank');
    }
  };

  return (
    <section className="relative w-full">
      <Carousel className="w-full overflow-hidden h-[80vh]">
        <CarouselContent>
          {content.heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-full w-full">
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ 
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundPosition: 'center 30%'
                  }}
                >
                  {/* Overlay con gradiente para mejorar legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                </div>
                
                {/* Contenido superpuesto */}
                <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12">
                  <div className="max-w-2xl space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white animate-slide-up">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      {slide.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <Button 
                        size="default" 
                        className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                        onClick={() => handleButtonClick(slide.buttonLink)}
                      >
                        <GraduationCap className="mr-2" />
                        {slide.buttonText || 'Ver Más'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Controles del carousel */}
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
          {content.heroSlides.map((_, index) => (
            <span 
              key={index} 
              className={`w-3 h-3 rounded-full block ${activeSlide === index ? 'bg-white' : 'bg-white/50'}`}
            ></span>
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
