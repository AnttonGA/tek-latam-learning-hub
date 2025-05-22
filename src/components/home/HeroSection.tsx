
import { useEffect, useState } from "react";
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

const HeroSection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    try {
      const siteContent = dataService.getSiteContent();
      setContent(siteContent);
      
      // If heroSlides doesn't exist or is empty, initialize it
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

  // Función mejorada para scrollear a las secciones o navegar a ellas
  const scrollToSection = (sectionId: string) => {
    console.log("Intentando navegar a la sección:", sectionId);
    
    // Asegurarse de que sectionId no tenga un # al inicio
    const cleanSectionId = sectionId.replace(/^#+/, '');
    
    // Intentar encontrar el elemento por ID
    const element = document.getElementById(cleanSectionId);
    
    if (element) {
      console.log("Elemento encontrado, haciendo scroll a:", cleanSectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si el elemento no existe, navegamos a la página principal con un hash
      console.log("Elemento no encontrado, redirigiendo a /#" + cleanSectionId);
      window.location.href = `/#${cleanSectionId}`;
    }
  };

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
        opts={{ 
          loop: true,
          dragFree: false
        }}
        onSelect={(api: any) => {
          // Corregido para manejar correctamente la API de Embla Carousel
          if (api && api.selectedScrollSnap) {
            setActiveIndex(api.selectedScrollSnap());
          }
        }}
      >
        <CarouselContent>
          {content.heroSlides.map((slide: HeroSlide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[80vh] w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ 
                    backgroundImage: `url(${slide.imageUrl})`,
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 z-10"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-6">
                  <div className="max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                    {slide.buttonText && (
                      <Button 
                        size="lg" 
                        className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white gap-2"
                        onClick={() => scrollToSection(slide.buttonLink || 'programas')}
                      >
                        {slide.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Slide Indicator */}
                <div className="absolute bottom-6 left-0 right-0 z-30">
                  <div className="flex justify-center gap-2">
                    {content.heroSlides.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeIndex ? 'w-8 bg-teklatam-orange' : 'w-2 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 text-white border-white hover:bg-white/20 hover:text-white" />
        <CarouselNext className="right-4 text-white border-white hover:bg-white/20 hover:text-white" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
