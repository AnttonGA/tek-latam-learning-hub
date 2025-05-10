
import { useState } from "react";
import { Program, ProgramModule, ProgramFAQ } from "@/services/dataService";
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
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
    // Campos adicionales para la página de detalle
    duration: program?.duration || "",
    schedule: program?.schedule || "",
    startDate: program?.startDate || "",
    detailedDescription: program?.detailedDescription || "",
    targetAudience: program?.targetAudience || "",
    learningObjectives: program?.learningObjectives || [""],
    requirements: program?.requirements || [""],
    modules: program?.modules || [{ title: "", content: "" }],
    faqs: program?.faqs || [{ question: "", answer: "" }],
  });

  const [activeTab, setActiveTab] = useState("basic");

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

  // Manejadores para arrays
  const handleArrayItemChange = (
    arrayName: 'learningObjectives' | 'requirements',
    index: number,
    value: string
  ) => {
    const updatedArray = [...(formData[arrayName] || [])];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [arrayName]: updatedArray,
    });
  };

  const addArrayItem = (arrayName: 'learningObjectives' | 'requirements') => {
    const updatedArray = [...(formData[arrayName] || []), ""];
    setFormData({
      ...formData,
      [arrayName]: updatedArray,
    });
  };

  const removeArrayItem = (
    arrayName: 'learningObjectives' | 'requirements',
    index: number
  ) => {
    const updatedArray = [...(formData[arrayName] || [])];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [arrayName]: updatedArray,
    });
  };

  // Manejadores para módulos
  const handleModuleChange = (
    index: number,
    field: keyof ProgramModule,
    value: string
  ) => {
    const updatedModules = [...(formData.modules || [])];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      modules: updatedModules,
    });
  };

  const addModule = () => {
    const updatedModules = [...(formData.modules || []), { title: "", content: "" }];
    setFormData({
      ...formData,
      modules: updatedModules,
    });
  };

  const removeModule = (index: number) => {
    const updatedModules = [...(formData.modules || [])];
    updatedModules.splice(index, 1);
    setFormData({
      ...formData,
      modules: updatedModules,
    });
  };

  // Manejadores para FAQs
  const handleFAQChange = (
    index: number,
    field: keyof ProgramFAQ,
    value: string
  ) => {
    const updatedFaqs = [...(formData.faqs || [])];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const addFAQ = () => {
    const updatedFaqs = [...(formData.faqs || []), { question: "", answer: "" }];
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const removeFAQ = (index: number) => {
    const updatedFaqs = [...(formData.faqs || [])];
    updatedFaqs.splice(index, 1);
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure students is a number
    const formattedData = {
      ...formData,
      students: Number(formData.students) || 0,
      // Filter out empty items from arrays
      learningObjectives: formData.learningObjectives?.filter(item => item.trim() !== "") || [],
      requirements: formData.requirements?.filter(item => item.trim() !== "") || [],
      modules: formData.modules?.filter(module => module.title.trim() !== "" || module.content.trim() !== "") || [],
      faqs: formData.faqs?.filter(faq => faq.question.trim() !== "" || faq.answer.trim() !== "") || [],
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
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-4">
              <TabsTrigger value="basic">Información Básica</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="objectives">Objetivos</TabsTrigger>
              <TabsTrigger value="modules">Módulos</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            {/* Pestaña de Información Básica */}
            <TabsContent value="basic" className="space-y-4">
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
                  <Label htmlFor="description">Descripción Corta</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Pestaña de Detalles */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleChange}
                    placeholder="Ej: 6 meses"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Horario</Label>
                  <Input
                    id="schedule"
                    name="schedule"
                    value={formData.schedule || ""}
                    onChange={handleChange}
                    placeholder="Ej: Flexible, 8-10 horas por semana"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de Inicio</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    value={formData.startDate || ""}
                    onChange={handleChange}
                    placeholder="Ej: Próximo inicio: 15 de junio, 2025"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="detailedDescription">Descripción Detallada</Label>
                  <Textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    value={formData.detailedDescription || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Descripción detallada del programa"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="targetAudience">Público Objetivo</Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="A quién va dirigido este programa"
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Pestaña de Objetivos y Requisitos */}
            <TabsContent value="objectives" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Objetivos de Aprendizaje</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => addArrayItem('learningObjectives')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Objetivo
                    </Button>
                  </div>
                  
                  {formData.learningObjectives?.map((objective, index) => (
                    <div key={`objective-${index}`} className="flex items-center gap-2 mb-2">
                      <Input
                        value={objective}
                        onChange={(e) => handleArrayItemChange('learningObjectives', index, e.target.value)}
                        placeholder="Objetivo de aprendizaje"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem('learningObjectives', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Requisitos</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => addArrayItem('requirements')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Requisito
                    </Button>
                  </div>
                  
                  {formData.requirements?.map((requirement, index) => (
                    <div key={`requirement-${index}`} className="flex items-center gap-2 mb-2">
                      <Input
                        value={requirement}
                        onChange={(e) => handleArrayItemChange('requirements', index, e.target.value)}
                        placeholder="Requisito"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Pestaña de Módulos */}
            <TabsContent value="modules" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <Label>Módulos del Programa</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addModule}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Módulo
                  </Button>
                </div>
                
                {formData.modules?.map((module, index) => (
                  <div key={`module-${index}`} className="p-4 border rounded-lg space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Módulo {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModule(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Título del Módulo</Label>
                      <Input
                        value={module.title}
                        onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                        placeholder="Ej: Módulo 1: Fundamentos"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Contenido</Label>
                      <Textarea
                        value={module.content}
                        onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                        rows={3}
                        placeholder="Descripción del contenido de este módulo"
                      />
                    </div>
                  </div>
                ))}
                
                {formData.modules?.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No hay módulos definidos. Añade uno para empezar.
                  </p>
                )}
              </div>
            </TabsContent>
            
            {/* Pestaña de FAQs */}
            <TabsContent value="faqs" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <Label>Preguntas Frecuentes</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addFAQ}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir FAQ
                  </Button>
                </div>
                
                {formData.faqs?.map((faq, index) => (
                  <div key={`faq-${index}`} className="p-4 border rounded-lg space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Pregunta {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFAQ(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pregunta</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        placeholder="Ej: ¿Necesito conocimientos previos?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Respuesta</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        rows={3}
                        placeholder="Respuesta a la pregunta"
                      />
                    </div>
                  </div>
                ))}
                
                {formData.faqs?.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No hay preguntas frecuentes definidas. Añade una para empezar.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

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
