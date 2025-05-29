
import { useEffect, useState } from 'react';
import { Instructor, dataService } from '@/services/dataService';

const InstructorsSection = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstructors = () => {
      try {
        const loadedInstructors = dataService.getInstructors();
        setInstructors(loadedInstructors);
      } catch (error) {
        console.error("Error al cargar los instructores:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInstructors();

    // Solo escuchar cambios en storage, sin polling
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teklatam_instructors' || e.key === 'teklatam_update_trigger') {
        loadInstructors();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <section id="instructores" className="py-16 bg-teklatam-gray-50">
        <div className="teklatam-container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instructores" className="py-16 bg-teklatam-gray-50">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Instructores</h2>
          <p className="text-teklatam-gray-600 max-w-2xl mx-auto">
            Aprende con expertos de la industria que comparten su conocimiento y experiencia real en el sector tecnológico.
          </p>
        </div>
        
        {instructors.length === 0 ? (
          <p className="text-center text-teklatam-gray-600">No hay instructores disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                  <p className="text-teklatam-orange mb-3">{instructor.role}</p>
                  <p className="text-teklatam-gray-600 text-sm line-clamp-3">{instructor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InstructorsSection;
