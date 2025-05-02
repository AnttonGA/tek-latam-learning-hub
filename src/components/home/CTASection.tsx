
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { dataService, SiteContent } from '@/services/dataService';

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
          <Button size="lg" className="teklatam-btn-primary bg-teklatam-orange hover:bg-teklatam-orange/90">
            <Link to="#programas">Explorar Programas</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teklatam-blue">
            <Link to="#contacto">Contáctanos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
