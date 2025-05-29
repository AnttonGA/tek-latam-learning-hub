
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

  useEffect(() => {
    if (location.hash) {
      const cleanHash = location.hash.replace(/^#+/, '#');
      // Usar requestAnimationFrame para mejor rendimiento
      requestAnimationFrame(() => {
        const element = document.querySelector(cleanHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const elementById = document.getElementById(cleanHash.substring(1));
          if (elementById) {
            elementById.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    } else if (location.search) {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          // Pequeño delay para asegurar que la página esté renderizada
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
