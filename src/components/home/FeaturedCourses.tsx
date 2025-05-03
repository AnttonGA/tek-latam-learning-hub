
import { useEffect, useState } from 'react';
import { Program, dataService } from '@/services/dataService';
import CourseCard from '@/components/ui/CourseCard';
import { Button } from '@/components/ui/button';

const FeaturedCourses = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Obtener programas desde el servicio de datos
    try {
      const loadedPrograms = dataService.getPrograms();
      setPrograms(loadedPrograms);
    } catch (error) {
      console.error("Error al cargar los programas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para manejar el click en "Ver todos los programas"
  const handleShowAll = () => {
    setShowAll(!showAll);
    
    // Si estamos mostrando todos y volvemos a ocultar, hacer scroll hacia arriba
    if (showAll) {
      const element = document.getElementById('programas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtrar programas para mostrar solo 3 cuando showAll es false
  const displayedPrograms = showAll ? programs : programs.slice(0, 3);

  if (loading) {
    return (
      <section id="programas" className="py-16 bg-white">
        <div className="teklatam-container">
          <p className="text-center text-lg">Cargando programas...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="programas" className="py-16 bg-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Programas Destacados</h2>
          <p className="text-teklatam-gray-600 max-w-2xl mx-auto">
            Descubre nuestros programas formativos diseñados para potenciar tu carrera en tecnología.
          </p>
        </div>
        
        {programs.length === 0 ? (
          <p className="text-center text-teklatam-gray-600">No hay programas disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPrograms.map((program) => (
              <CourseCard 
                key={program.id}
                title={program.title}
                instructor={program.instructor}
                level={program.level}
                students={program.students}
                description={program.description}
                imageUrl={program.image}
                onClick={scrollToContact}
              />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          {programs.length > 3 && (
            <Button 
              onClick={handleShowAll}
              className="teklatam-btn-secondary"
            >
              {showAll ? "Ver menos programas" : "Ver todos los programas"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
