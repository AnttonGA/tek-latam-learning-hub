
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseCard, { CourseCardProps } from '@/components/ui/CourseCard';

// Sample data
const featuredCourses: CourseCardProps[] = [
  {
    id: '1',
    title: 'Desarrollo Full Stack con MERN',
    instructor: 'Carlos Mendoza',
    description: 'Domina MongoDB, Express, React y Node.js para crear aplicaciones web modernas y escalables de punta a punta.',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '10 semanas',
    students: 3420,
    rating: 4.8,
    level: 'Intermedio',
    featured: true,
    slug: 'desarrollo-full-stack-mern'
  },
  {
    id: '2',
    title: 'Ciencia de Datos y Machine Learning con Python',
    instructor: 'Ana María Valencia',
    description: 'Aprende a analizar datos, construir modelos predictivos y tomar decisiones basadas en datos usando las principales bibliotecas de Python.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '12 semanas',
    students: 2874,
    rating: 4.7,
    level: 'Avanzado',
    slug: 'ciencia-datos-machine-learning-python'
  },
  {
    id: '3',
    title: 'Fundamentos de Desarrollo Web',
    instructor: 'Juan Pérez',
    description: 'Iníciate en el mundo del desarrollo web con HTML, CSS y JavaScript. Crea tus primeros sitios web responsive desde cero.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '8 semanas',
    students: 5932,
    rating: 4.9,
    level: 'Principiante',
    slug: 'fundamentos-desarrollo-web'
  },
  {
    id: '4',
    title: 'Ciberseguridad Aplicada',
    instructor: 'Gabriela Rojas',
    description: 'Aprende a proteger sistemas y redes, detectar vulnerabilidades y mitigar riesgos de seguridad en entornos empresariales.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '9 semanas',
    students: 1853,
    rating: 4.6,
    level: 'Intermedio',
    slug: 'ciberseguridad-aplicada'
  },
  {
    id: '5',
    title: 'Desarrollo de Aplicaciones iOS con Swift',
    instructor: 'Roberto González',
    description: 'Construye aplicaciones potentes para iPhone y iPad utilizando Swift y los frameworks más modernos de Apple.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '11 semanas',
    students: 1422,
    rating: 4.7,
    level: 'Avanzado',
    slug: 'desarrollo-ios-swift'
  },
  {
    id: '6',
    title: 'UX/UI Design: Creando Experiencias Digitales',
    instructor: 'Laura Martínez',
    description: 'Aprende a diseñar interfaces digitales centradas en el usuario, desde la investigación hasta los prototipos finales.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    duration: '8 semanas',
    students: 2189,
    rating: 4.8,
    level: 'Intermedio',
    slug: 'ux-ui-design-experiencias-digitales'
  }
];

const categories = [
  'Todos', 'Desarrollo Web', 'Ciencia de Datos', 'Ciberseguridad', 'Mobile', 'UX/UI', 'Cloud'
];

const FeaturedCourses = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  // Here we would filter courses by category in a real application
  // For this demo, we'll just use the full list
  const filteredCourses = featuredCourses;
  
  return (
    <section className="teklatam-section bg-teklatam-gray-50">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Programas Destacados</h2>
          <p className="text-teklatam-gray-600 text-lg max-w-3xl mx-auto">
            Explora nuestros programas de formación más populares diseñados para equiparte con las habilidades más demandadas en la industria tecnológica.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-teklatam-blue text-white'
                    : 'bg-white border border-teklatam-gray-200 text-teklatam-gray-700 hover:bg-teklatam-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Link to="/programas">
            <Button variant="outline" className="teklatam-btn-outline inline-flex items-center">
              Ver todos los programas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
