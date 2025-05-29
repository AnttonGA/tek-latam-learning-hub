
import { useEffect, useState, useCallback } from "react";
import { dataService } from "@/services/dataService";
import { HeroSlide, SiteContent } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    try {
      const siteContent = dataService.getSiteContent();
      setContent(siteContent);
      
      if (!siteContent.heroSlides || siteContent.heroSlides.length === 0) {
        const updatedContent = {
          ...siteContent,
          heroSlides: [
            {
              id: "1",
              imageUrl: "/placeholder.svg",
              title: "Formación Tecnológica de Calidad",
              subtitle: "Aprende las habilidades más demandadas en el mercado actual",
              buttonText: "Ver Programas",
              buttonLink: "programas"
            },
            {
              id: "2",
              imageUrl: "/placeholder.svg",
              title: "Impulsa tu Carrera Profesional",
              subtitle: "Nuestros programas te preparan para los empleos del futuro",
              buttonText: "Empieza Ahora",
              buttonLink: "contacto"
            },
            {
              id: "3",
              imageUrl: "/placeholder.svg",
              title: "Aprende con los Mejores",
              subtitle: "Instructores con experiencia real en la industria",
              buttonText: "Conoce al Equipo",
              buttonLink: "instructores"
            }
          ]
        };
        dataService.saveSiteContent(updatedContent);
        setContent(updatedContent);
      }
    } catch (error) {
      console.error("Error al cargar el contenido del Hero:", error);
    }
  }, []);

  // Configurar auto-play optimizado
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    // Auto-play más eficiente
    const autoPlay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    api.on("select", onSelect);
    onSelect();

    return () => {
      clearInterval(autoPlay);
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollToSection = useCallback((sectionId: string) => {
    const cleanSectionId = sectionId.replace(/^#+/, '');
    const element = document.getElementById(cleanSectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${cleanSectionId}`;
    }
  }, []);

  if (!content || !content.heroSlides) {
    return (
      <section className="h-[60vh] bg-teklatam-gray-100 flex items-center justify-center">
        <p>Cargando...</p>
      </section>
    );
  }

  return (
    <section className="relative" id="hero">
      <Carousel 
        className="w-full" 
        setApi={setApi}
        opts={{ 
          loop: true,
          dragFree: false,
          duration: 20,
          slidesToScroll: 1,
          skipSnaps: false,
          startIndex: 0
        }}
      >
        <CarouselContent>
          {content.heroSlides.map((slide: HeroSlide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[80vh] w-full overflow-hidden">
                {/* Background optimizado */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ease-out"
                  style={{ 
                    backgroundImage: `url(${slide.imageUrl})`,
                    willChange: index === activeIndex ? 'opacity' : 'auto'
                  }}
                >
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
                
                {/* Content optimizado */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-6">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in">
                      {slide.subtitle}
                    </p>
                    {slide.buttonText && (
                      <Button 
                        size="lg" 
                        className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white gap-2 transform transition-all duration-200 hover:scale-105"
                        onClick={() => scrollToSection(slide.buttonLink || 'programas')}
                      >
                        {slide.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Indicadores optimizados */}
                <div className="absolute bottom-6 left-0 right-0 z-30">
                  <div className="flex justify-center gap-2">
                    {content.heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          i === activeIndex ? 'w-8 bg-teklatam-orange' : 'w-2 bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 text-white border-white hover:bg-white/20 hover:text-white transition-colors duration-200" />
        <CarouselNext className="right-4 text-white border-white hover:bg-white/20 hover:text-white transition-colors duration-200" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
