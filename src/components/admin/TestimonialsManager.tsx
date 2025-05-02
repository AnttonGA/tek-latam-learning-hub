
import { useEffect, useState } from "react";
import { dataService, Testimonial } from "@/services/dataService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TestimonialForm from "./TestimonialForm";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    const loadedTestimonials = dataService.getTestimonials();
    setTestimonials(loadedTestimonials);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setCurrentTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este testimonio? Esta acción no se puede deshacer.")) {
      const deleted = dataService.deleteTestimonial(id);
      if (deleted) {
        toast({
          title: "Testimonio eliminado",
          description: "El testimonio ha sido eliminado correctamente.",
        });
        loadTestimonials();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el testimonio.",
        });
      }
    }
  };

  const handleSave = (testimonial: Omit<Testimonial, "id"> | Testimonial) => {
    if ("id" in testimonial) {
      // Actualizar un testimonio existente
      dataService.updateTestimonial(testimonial as Testimonial);
      toast({
        title: "Testimonio actualizado",
        description: "El testimonio ha sido actualizado correctamente.",
      });
    } else {
      // Añadir un nuevo testimonio
      dataService.addTestimonial(testimonial);
      toast({
        title: "Testimonio creado",
        description: "El nuevo testimonio ha sido añadido correctamente.",
      });
    }
    setIsEditing(false);
    setIsAdding(false);
    loadTestimonials();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentTestimonial(null);
  };

  if (isEditing || isAdding) {
    return (
      <TestimonialForm 
        testimonial={currentTestimonial || undefined} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Testimonios</h2>
        <Button className="teklatam-btn-primary" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Testimonio
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teklatam-gray-50 border-b">
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Rol</th>
                  <th className="py-3 px-4 text-left">Empresa</th>
                  <th className="py-3 px-4 text-left">Testimonio</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{testimonial.name}</td>
                    <td className="py-3 px-4">{testimonial.role}</td>
                    <td className="py-3 px-4">{testimonial.company}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate">{testimonial.text}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}>
                          <PenSquare className="h-4 w-4 text-teklatam-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No hay testimonios disponibles. Haz clic en "Nuevo Testimonio" para agregar uno.
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

export default TestimonialsManager;
