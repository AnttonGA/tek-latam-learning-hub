
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  program: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alejandra Vargas',
    role: 'Front-end Developer',
    company: 'Globant',
    image: 'https://i.pravatar.cc/150?img=32',
    text: 'Gracias a la formación que recibí en TekLatam, conseguí mi primer trabajo como desarrolladora. El enfoque práctico y el apoyo de los instructores fue clave para mi éxito profesional.',
    program: 'Desarrollo Web Full Stack'
  },
  {
    id: '2',
    name: 'Ricardo Montero',
    role: 'Data Scientist',
    company: 'Mercado Libre',
    image: 'https://i.pravatar.cc/150?img=61',
    text: 'El programa de Ciencia de Datos superó mis expectativas. El material es actualizado y relevante para la industria. Pude aplicar lo que aprendí de inmediato en mi trabajo, lo que me valió un ascenso.',
    program: 'Ciencia de Datos y ML'
  },
  {
    id: '3',
    name: 'Camila Rodriguez',
    role: 'UX/UI Designer',
    company: 'Rappi',
    image: 'https://i.pravatar.cc/150?img=25',
    text: 'Como diseñadora tradicional, necesitaba actualizarme en diseño digital. TekLatam me proporcionó las habilidades que necesitaba para hacer la transición al mundo UX/UI con confianza.',
    program: 'Diseño UX/UI'
  },
  {
    id: '4',
    name: 'Miguel Ángel Torres',
    role: 'Security Analyst',
    company: 'BBVA',
    image: 'https://i.pravatar.cc/150?img=58',
    text: 'La calidad del contenido y la experiencia práctica que obtuve en el programa de Ciberseguridad me preparó perfectamente para mi rol actual. Los laboratorios prácticos son excepcionales.',
    program: 'Ciberseguridad Aplicada'
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="teklatam-section bg-teklatam-blue text-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Lo Que Dicen Nuestros Estudiantes</h2>
          <p className="text-teklatam-blue-light/90 text-lg max-w-3xl mx-auto">
            Descubre cómo nuestros programas han impactado las carreras profesionales de los estudiantes de toda Latinoamérica.
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-teklatam-blue-dark/30 rounded-2xl p-8 sm:p-10 relative">
                    <Quote className="h-12 w-12 text-teklatam-orange/30 absolute top-6 left-6" />
                    
                    <div className="relative">
                      <p className="text-lg sm:text-xl leading-relaxed mb-6">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-teklatam-orange"
                        />
                        
                        <div className="ml-4">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-teklatam-blue-light/90">
                            {testimonial.role}, {testimonial.company}
                          </p>
                          <p className="text-xs text-teklatam-orange mt-1">
                            Alumno de: {testimonial.program}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={showPrevious}
              className="p-2 rounded-full bg-teklatam-blue-dark/50 hover:bg-teklatam-blue-dark text-white transition-colors"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-teklatam-orange' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              ></button>
            ))}
            
            <button
              onClick={showNext}
              className="p-2 rounded-full bg-teklatam-blue-dark/50 hover:bg-teklatam-blue-dark text-white transition-colors"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
