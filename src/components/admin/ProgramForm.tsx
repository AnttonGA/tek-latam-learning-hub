
import { useState } from "react";
import { Program } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

interface ProgramFormProps {
  program?: Program;
  onSave: (program: Omit<Program, "id"> | Program) => void;
  onCancel: () => void;
}

const ProgramForm = ({ program, onSave, onCancel }: ProgramFormProps) => {
  const [formData, setFormData] = useState<Omit<Program, "id"> | Program>({
    id: program?.id || "",
    title: program?.title || "",
    instructor: program?.instructor || "",
    level: program?.level || "Principiante",
    students: program?.students || 0,
    description: program?.description || "",
    image: program?.image || "",
    category: program?.category || "curso",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "students" ? Number(value) || 0 : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
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
    // Ensure students is a number
    const formattedData = {
      ...formData,
      students: Number(formData.students) || 0
    };
    onSave(formattedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {program ? "Editar Programa" : "Nuevo Programa"}
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
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Nivel</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Principiante">Principiante</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="students">Estudiantes</Label>
              <Input
                id="students"
                name="students"
                type="number"
                min="0"
                value={formData.students.toString()}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value as 'curso' | 'diplomado' | 'maestria')}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecciona la categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curso">Curso</SelectItem>
                  <SelectItem value="diplomado">Diplomado</SelectItem>
                  <SelectItem value="maestria">Maestría</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <ImageUploader
                id="program-image"
                value={formData.image}
                onChange={handleImageChange}
                label="Imagen del programa"
                previewClassName="h-48 w-auto"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
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

export default ProgramForm;
