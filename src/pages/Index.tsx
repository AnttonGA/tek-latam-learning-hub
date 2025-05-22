
import FeaturedCourses from '@/components/home/FeaturedCourses';
import InstructorsSection from '@/components/home/InstructorsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  // Función para manejar el scroll a las secciones cuando se navega
  useEffect(() => {
    if (location.hash) {
      // Si hay un hash en la URL, scrollear a esa sección
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.search) {
      // Comprobar si hay un parámetro de sección en la URL
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="teklatam-container">
          {/* Actualización: Se eliminó la Hero Section según solicitud anterior */}
          <FeaturedCourses />
          <InstructorsSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
