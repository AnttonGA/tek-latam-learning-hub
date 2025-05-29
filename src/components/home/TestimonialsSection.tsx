
import { useEffect, useState } from 'react';
import { Testimonial, dataService } from '@/services/dataService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = () => {
      try {
        const loadedTestimonials = dataService.getTestimonials();
        setTestimonials(loadedTestimonials);
      } catch (error) {
        console.error("Error al cargar los testimonios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();

    // Solo escuchar cambios en storage, sin polling
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teklatam_testimonials' || e.key === 'teklatam_update_trigger') {
        loadTestimonials();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <section id="testimonios" className="py-16 bg-white">
        <div className="teklatam-container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 p-8 rounded-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className="py-16 bg-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lo Que Dicen Nuestros Estudiantes</h2>
          <p className="text-teklatam-gray-600 max-w-2xl mx-auto">
            Conoce las experiencias de quienes ya se han formado con nosotros y hoy son profesionales destacados.
          </p>
        </div>
        
        {testimonials.length === 0 ? (
          <p className="text-center text-teklatam-gray-600">No hay testimonios disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-teklatam-gray-50 p-8 rounded-lg transition-transform duration-200 hover:scale-105">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover" 
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-teklatam-orange text-sm">{testimonial.role} | {testimonial.company}</p>
                  </div>
                </div>
                <blockquote>
                  <p className="text-teklatam-gray-600 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </blockquote>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
