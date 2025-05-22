
import FeaturedCourses from '@/components/home/FeaturedCourses';
import InstructorsSection from '@/components/home/InstructorsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';
import HeroSection from '@/components/home/HeroSection';
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
      // Asegurarse de que solo hay un # en el selector
      const cleanHash = location.hash.replace(/^#+/, '#');
      console.log("Scrolling to section with clean hash:", cleanHash);
      try {
        const element = document.querySelector(cleanHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error("Elemento no encontrado con selector:", cleanHash);
          // Intentar buscar por ID sin el símbolo #
          const elementById = document.getElementById(cleanHash.substring(1));
          if (elementById) {
            console.log("Elemento encontrado por ID:", cleanHash.substring(1));
            elementById.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error("Elemento no encontrado por ID:", cleanHash.substring(1));
          }
        }
      } catch (error) {
        console.error("Error al hacer scroll:", error);
      }
    } else if (location.search) {
      // Comprobar si hay un parámetro de sección en la URL
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        console.log("Scrolling to section from query param:", section);
        const element = document.getElementById(section);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          console.error("Elemento no encontrado con ID desde query param:", section);
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
        <HeroSection />
        <div className="teklatam-container">
          <div id="programas">
            <FeaturedCourses />
          </div>
          <div id="instructores">
            <InstructorsSection />
          </div>
          <div id="testimonios">
            <TestimonialsSection />
          </div>
          <CTASection />
          <div id="contacto">
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
