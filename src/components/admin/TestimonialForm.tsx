
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Testimonial, dataService, Program } from "@/services/dataService";
import { ImageUploader } from "@/components/ui/ImageUploader";

const testimonialSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  role: z.string().min(1, "El rol es requerido"),
  company: z.string().min(1, "La empresa es requerida"),
  text: z.string().min(10, "El testimonio debe tener al menos 10 caracteres"),
  image: z.string().min(1, "La imagen es requerida"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSave: (testimonial: Omit<Testimonial, "id"> | Testimonial) => void;
  onCancel: () => void;
}

const TestimonialForm = ({ testimonial, onSave, onCancel }: TestimonialFormProps) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [existingCompanies, setExistingCompanies] = useState<string[]>([]);
  const [existingRoles, setExistingRoles] = useState<string[]>([]);

  // Cargar datos para sugerencias
  useEffect(() => {
    const loadedPrograms = dataService.getPrograms();
    setPrograms(loadedPrograms);

    const testimonials = dataService.getTestimonials();
    
    // Extraer empresas únicas
    const companies = [...new Set(testimonials.map(t => t.company).filter(Boolean))];
    setExistingCompanies(companies);

    // Extraer roles únicos
    const roles = [...new Set(testimonials.map(t => t.role).filter(Boolean))];
    setExistingRoles(roles);
  }, []);

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: testimonial?.name || "",
      role: testimonial?.role || "",
      company: testimonial?.company || "",
      text: testimonial?.text || "",
      image: testimonial?.image || "",
    },
  });

  const onSubmit = (data: TestimonialFormData) => {
    if (testimonial?.id) {
      onSave({ ...data, id: testimonial.id });
    } else {
      onSave(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {testimonial ? "Editar Testimonio" : "Nuevo Testimonio"}
        </h2>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Testimonio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol/Posición</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona o escribe un rol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {existingRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2">
                        <Input 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="O escribe un nuevo rol"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Empresa</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona o escribe una empresa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {existingCompanies.map((company) => (
                            <SelectItem key={company} value={company}>
                              {company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2">
                        <Input 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="O escribe una nueva empresa"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonio</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecciona una foto para el testimonio"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-teklatam-orange hover:bg-teklatam-orange/90">
              {testimonial ? "Actualizar" : "Crear"} Testimonio
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TestimonialForm;
