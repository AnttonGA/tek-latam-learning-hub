import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Program, ProgramModule, ProgramFAQ, dataService, Instructor } from "@/services/dataService";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { X, Plus } from "lucide-react";

const programSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  instructor: z.string().min(1, "El instructor es requerido"),
  level: z.string().min(1, "El nivel es requerido"),
  students: z.number().min(0, "El número de estudiantes debe ser positivo"),
  description: z.string().min(1, "La descripción es requerida"),
  image: z.string().min(1, "La imagen es requerida"),
  category: z.enum(["curso", "diplomado", "maestria"]),
  duration: z.string().optional(),
  schedule: z.string().optional(),
  startDate: z.string().optional(),
  detailedDescription: z.string().optional(),
  targetAudience: z.string().optional(),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface ProgramFormProps {
  program?: Program;
  onSave: (program: Omit<Program, "id"> | Program) => void;
  onCancel: () => void;
}

const ProgramForm = ({ program, onSave, onCancel }: ProgramFormProps) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [learningObjectives, setLearningObjectives] = useState<string[]>(program?.learningObjectives || [""]);
  const [requirements, setRequirements] = useState<string[]>(program?.requirements || [""]);
  const [modules, setModules] = useState<ProgramModule[]>(program?.modules || [{ title: "", content: "" }]);
  const [faqs, setFaqs] = useState<ProgramFAQ[]>(program?.faqs || [{ question: "", answer: "" }]);

  // Cargar instructores disponibles
  useEffect(() => {
    const loadedInstructors = dataService.getInstructors();
    setInstructors(loadedInstructors);
  }, []);

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: program?.title || "",
      instructor: program?.instructor || "",
      level: program?.level || "",
      students: program?.students || 0,
      description: program?.description || "",
      image: program?.image || "",
      category: program?.category || "curso",
      duration: program?.duration || "",
      schedule: program?.schedule || "",
      startDate: program?.startDate || "",
      detailedDescription: program?.detailedDescription || "",
      targetAudience: program?.targetAudience || "",
    },
  });

  const onSubmit = (data: ProgramFormData) => {
    const programData = {
      ...data,
      learningObjectives: learningObjectives.filter(obj => obj.trim() !== ""),
      requirements: requirements.filter(req => req.trim() !== ""),
      modules: modules.filter(mod => mod.title.trim() !== "" || mod.content.trim() !== ""),
      faqs: faqs.filter(faq => faq.question.trim() !== "" || faq.answer.trim() !== ""),
    };

    if (program?.id) {
      onSave({ ...programData, id: program.id });
    } else {
      onSave(programData);
    }
  };

  const addLearningObjective = () => setLearningObjectives([...learningObjectives, ""]);
  const removeLearningObjective = (index: number) => setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  const updateLearningObjective = (index: number, value: string) => {
    const updated = [...learningObjectives];
    updated[index] = value;
    setLearningObjectives(updated);
  };

  const addRequirement = () => setRequirements([...requirements, ""]);
  const removeRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addModule = () => setModules([...modules, { title: "", content: "" }]);
  const removeModule = (index: number) => setModules(modules.filter((_, i) => i !== index));
  const updateModule = (index: number, field: keyof ProgramModule, value: string) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], [field]: value };
    setModules(updated);
  };

  const addFAQ = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFAQ = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFAQ = (index: number, field: keyof ProgramFAQ, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {program ? "Editar Programa" : "Nuevo Programa"}
        </h2>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Programa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un instructor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {instructors.map((instructor) => (
                            <SelectItem key={instructor.id} value={instructor.name}>
                              {instructor.name} - {instructor.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nivel</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el nivel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Principiante">Principiante</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="curso">Curso</SelectItem>
                          <SelectItem value="diplomado">Diplomado</SelectItem>
                          <SelectItem value="maestria">Maestría</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Estudiantes</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ej: 6 meses" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horario</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ej: Flexible, 8-10 horas por semana" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Inicio</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ej: Próximo inicio: 15 de junio, 2025" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Corta</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="detailedDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Detallada</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audiencia Objetivo</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
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
                    <FormLabel>Imagen del Programa</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecciona una imagen para el programa"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objetivos de Aprendizaje</CardTitle>
            </CardHeader>
            <CardContent>
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={objective}
                    onChange={(e) => updateLearningObjective(index, e.target.value)}
                    placeholder="Objetivo de aprendizaje"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeLearningObjective(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addLearningObjective}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Objetivo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requisitos</CardTitle>
            </CardHeader>
            <CardContent>
              {requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Requisito"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addRequirement}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Requisito
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Módulos del Programa</CardTitle>
            </CardHeader>
            <CardContent>
              {modules.map((module, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Módulo {index + 1}</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeModule(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(index, "title", e.target.value)}
                      placeholder="Título del módulo"
                    />
                    <Textarea
                      value={module.content}
                      onChange={(e) => updateModule(index, "content", e.target.value)}
                      placeholder="Contenido del módulo"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addModule}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Módulo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              {faqs.map((faq, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">FAQ {index + 1}</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFAQ(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, "question", e.target.value)}
                      placeholder="Pregunta"
                    />
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                      placeholder="Respuesta"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addFAQ}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar FAQ
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-teklatam-orange hover:bg-teklatam-orange/90">
              {program ? "Actualizar" : "Crear"} Programa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProgramForm;
