
import { useState } from "react";
import { Testimonial } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSave: (testimonial: Omit<Testimonial, "id"> | Testimonial) => void;
  onCancel: () => void;
}

const TestimonialForm = ({ testimonial, onSave, onCancel }: TestimonialFormProps) => {
  const [formData, setFormData] = useState<Omit<Testimonial, "id"> | Testimonial>({
    id: testimonial?.id || "",
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    company: testimonial?.company || "",
    text: testimonial?.text || "",
    image: testimonial?.image || "",
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
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {testimonial ? "Editar Testimonio" : "Nuevo Testimonio"}
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
              <Label htmlFor="role">Rol / Posición</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <ImageUploader
                id="testimonial-image"
                value={formData.image}
                onChange={handleImageChange}
                label="Foto"
                previewClassName="h-16 w-16 rounded-full"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="text">Testimonio</Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
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

export default TestimonialForm;
