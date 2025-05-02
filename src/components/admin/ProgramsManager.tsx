
import { useEffect, useState } from "react";
import { dataService, Program } from "@/services/dataService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProgramForm from "./ProgramForm";

const ProgramsManager = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const loadedPrograms = dataService.getPrograms();
    setPrograms(loadedPrograms);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setCurrentProgram(null);
  };

  const handleEdit = (program: Program) => {
    setCurrentProgram(program);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este programa? Esta acción no se puede deshacer.")) {
      const deleted = dataService.deleteProgram(id);
      if (deleted) {
        toast({
          title: "Programa eliminado",
          description: "El programa ha sido eliminado correctamente.",
        });
        loadPrograms();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el programa.",
        });
      }
    }
  };

  const handleSave = (program: Omit<Program, "id"> | Program) => {
    if ("id" in program) {
      // Actualizar un programa existente
      dataService.updateProgram(program as Program);
      toast({
        title: "Programa actualizado",
        description: "El programa ha sido actualizado correctamente.",
      });
    } else {
      // Añadir un nuevo programa
      dataService.addProgram(program);
      toast({
        title: "Programa creado",
        description: "El nuevo programa ha sido creado correctamente.",
      });
    }
    setIsEditing(false);
    setIsAdding(false);
    loadPrograms();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentProgram(null);
  };

  if (isEditing || isAdding) {
    return (
      <ProgramForm 
        program={currentProgram || undefined} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programas Formativos</h2>
        <Button className="teklatam-btn-primary" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Programa
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teklatam-gray-50 border-b">
                  <th className="py-3 px-4 text-left">Título</th>
                  <th className="py-3 px-4 text-left">Instructor</th>
                  <th className="py-3 px-4 text-left">Nivel</th>
                  <th className="py-3 px-4 text-left">Estudiantes</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{program.title}</td>
                    <td className="py-3 px-4">{program.instructor}</td>
                    <td className="py-3 px-4">{program.level}</td>
                    <td className="py-3 px-4">{program.students}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(program)}>
                          <PenSquare className="h-4 w-4 text-teklatam-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(program.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {programs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No hay programas disponibles. Haz clic en "Nuevo Programa" para agregar uno.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramsManager;
