
import { useEffect, useState } from "react";
import { dataService, Instructor } from "@/services/dataService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InstructorForm from "./InstructorForm";

const InstructorsManager = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadInstructors();
    
    // Escuchar cambios en localStorage para actualizar la UI cuando se modifiquen datos en otras pestañas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teklatam_instructors' || e.key === 'teklatam_update_trigger') {
        console.log("Detected storage change in InstructorsManager:", e.key);
        loadInstructors();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadInstructors = () => {
    try {
      const loadedInstructors = dataService.getInstructors();
      setInstructors(loadedInstructors);
      console.log("Instructores cargados:", loadedInstructors);
    } catch (error) {
      console.error("Error al cargar instructores:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los instructores.",
      });
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setCurrentInstructor(null);
  };

  const handleEdit = (instructor: Instructor) => {
    setCurrentInstructor(instructor);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este instructor? Esta acción no se puede deshacer.")) {
      const deleted = dataService.deleteInstructor(id);
      if (deleted) {
        toast({
          title: "Instructor eliminado",
          description: "El instructor ha sido eliminado correctamente.",
        });
        loadInstructors();
        
        // Actualizar trigger para notificar a otras pestañas
        window.localStorage.setItem('teklatam_update_trigger', Date.now().toString());
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el instructor.",
        });
      }
    }
  };

  const handleSave = (instructor: Omit<Instructor, "id"> | Instructor) => {
    try {
      if ("id" in instructor && instructor.id) {
        // Actualizar un instructor existente
        const updated = dataService.updateInstructor(instructor as Instructor);
        console.log("Instructor actualizado:", updated);
        toast({
          title: "Instructor actualizado",
          description: "El instructor ha sido actualizado correctamente.",
        });
      } else {
        // Añadir un nuevo instructor
        const added = dataService.addInstructor(instructor);
        console.log("Instructor añadido:", added);
        toast({
          title: "Instructor creado",
          description: "El nuevo instructor ha sido añadido correctamente.",
        });
      }
      
      // Para forzar la actualizacion en otras pestañas
      window.localStorage.setItem('teklatam_update_trigger', Date.now().toString());
      
      setIsEditing(false);
      setIsAdding(false);
      loadInstructors(); // Recargar datos inmediatamente
    } catch (error) {
      console.error("Error al guardar instructor:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al guardar el instructor.",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentInstructor(null);
  };

  if (isEditing || isAdding) {
    return (
      <InstructorForm 
        instructor={currentInstructor || undefined} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Instructores</h2>
        <Button className="teklatam-btn-primary" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Instructor
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id}>
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => handleEdit(instructor)}
                  >
                    <PenSquare className="h-4 w-4 text-teklatam-blue" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => handleDelete(instructor.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{instructor.name}</h3>
                <p className="text-teklatam-orange text-sm">{instructor.role}</p>
                <p className="text-sm mt-2 text-gray-600 line-clamp-2">{instructor.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {instructors.length === 0 && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No hay instructores disponibles. Haz clic en "Nuevo Instructor" para agregar uno.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsManager;
