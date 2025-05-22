
import { useEffect, useState } from 'react';
import { Instructor, dataService } from '@/services/dataService';

const InstructorsSection = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para cargar los instructores
    const loadInstructors = () => {
      try {
        const loadedInstructors = dataService.getInstructors();
        console.log("Sección de instructores: Datos cargados", loadedInstructors);
        setInstructors(loadedInstructors);
      } catch (error) {
        console.error("Error al cargar los instructores:", error);
      } finally {
        setLoading(false);
      }
    };

    // Cargar instructores cuando se monta el componente
    loadInstructors();

    // Definir un evento personalizado para recargar los datos cuando hay cambios
    const handleStorageChange = (e: StorageEvent) => {
      console.log("Storage change detected:", e.key);
      if (e.key === 'teklatam_instructors' || e.key === 'teklatam_update_trigger') {
        console.log("Recargando instructores debido a cambios en localStorage");
        loadInstructors();
      }
    };

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);

    // También podemos verificar periódicamente
    const interval = setInterval(loadInstructors, 10000); // Comprobar cada 10 segundos

    // Limpiar listeners y intervalos cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <section id="instructores" className="py-16 bg-teklatam-gray-50">
        <div className="teklatam-container">
          <p className="text-center text-lg">Cargando instructores...</p>
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
              <div key={instructor.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover" 
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
