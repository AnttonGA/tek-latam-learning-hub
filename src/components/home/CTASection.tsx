
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { dataService } from '@/services/dataService';
import { SiteContent } from '@/types';

const CTASection = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    try {
      const siteContent = dataService.getSiteContent();
      setContent(siteContent);
    } catch (error) {
      console.error("Error al cargar el contenido del CTA:", error);
    }
  }, []);

  // Función mejorada para scrollear a las secciones
  const scrollToSection = (sectionId: string) => {
    console.log("Intentando navegar a la sección desde CTA:", sectionId);
    
    // Asegurarse de que sectionId no tenga un # al inicio
    const cleanSectionId = sectionId.replace(/^#+/, '');
    
    const element = document.getElementById(cleanSectionId);
    if (element) {
      console.log("Elemento encontrado, haciendo scroll a:", cleanSectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Elemento no encontrado, redirigiendo a /#" + cleanSectionId);
      window.location.href = `/#${cleanSectionId}`;
    }
  };

  if (!content) {
    return (
      <section className="py-16 bg-teklatam-blue text-white">
        <div className="teklatam-container">
          <p className="text-center">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-teklatam-blue text-white">
      <div className="teklatam-container text-center">
        <h2 className="text-3xl font-bold mb-4">{content.ctaTitle}</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          {content.ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="teklatam-btn-primary bg-teklatam-orange hover:bg-teklatam-orange/90"
            onClick={() => scrollToSection('programas')}
          >
            Explorar Programas
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-teklatam-blue"
            onClick={() => scrollToSection('contacto')}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
