
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { dataService, SiteContent } from '@/services/dataService';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Book, GraduationCap } from "lucide-react";

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
    <section className="relative">
      <Carousel className="w-full max-w-full overflow-hidden h-[600px]">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-fade-in"
                  style={{ backgroundImage: `url(${image.url})` }}
                >
                  {/* Overlay oscuro para mejorar legibilidad del texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                
                {/* Contenido superpuesto */}
                <div className="teklatam-container relative z-10 h-full flex flex-col justify-center items-start">
                  <div className="max-w-2xl space-y-6 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white animate-slide-up">
                      {image.title}
                    </h1>
                    <p className="text-lg text-white/90 max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      {image.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
                      <Button 
                        size="lg" 
                        className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                        onClick={() => scrollToSection('programas')}
                      >
                        <GraduationCap className="mr-2" />
                        Ver Programas
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-teklatam-orange"
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
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          <CarouselPrevious className="relative left-0 top-0 h-9 w-9 translate-x-0 translate-y-0 bg-white/30 border-white/30 text-white hover:bg-white/50 hover:text-white" />
          <CarouselNext className="relative right-0 top-0 h-9 w-9 translate-x-0 translate-y-0 bg-white/30 border-white/30 text-white hover:bg-white/50 hover:text-white" />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSection;
