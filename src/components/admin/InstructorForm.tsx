
import { useState } from "react";
import { Instructor } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

interface InstructorFormProps {
  instructor?: Instructor;
  onSave: (instructor: Omit<Instructor, "id"> | Instructor) => void;
  onCancel: () => void;
}

const InstructorForm = ({ instructor, onSave, onCancel }: InstructorFormProps) => {
  const [formData, setFormData] = useState<Omit<Instructor, "id"> | Instructor>({
    id: instructor?.id || "",
    name: instructor?.name || "",
    role: instructor?.role || "",
    image: instructor?.image || "",
    bio: instructor?.bio || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (value: string) => {
    setFormData({
      ...formData,
      image: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use a type guard to check if 'id' exists and isn't empty
    if ('id' in formData && formData.id) {
      onSave(formData as Instructor);
    } else {
      // If we're creating a new instructor, omit the ID
      const { id, ...newInstructorData } = formData as any;
      onSave(newInstructorData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {instructor ? "Editar Instructor" : "Nuevo Instructor"}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            type="button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol / Especialidad</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUploader
                id="instructor-image"
                value={formData.image}
                onChange={handleImageChange}
                label="Foto del instructor"
                previewClassName="h-32 w-32 object-cover rounded-full"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default InstructorForm;
