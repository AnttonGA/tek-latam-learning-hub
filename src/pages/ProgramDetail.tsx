import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dataService, Program, Instructor } from "@/services/dataService";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AlertTriangle, Book, Calendar, Clock, GraduationCap, Star, UserCircle, Users } from "lucide-react";

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID de programa no encontrado");
      setLoading(false);
      return;
    }

    try {
      const foundProgram = dataService.getProgramById(id);
      
      if (!foundProgram) {
        setError("Programa no encontrado");
        setLoading(false);
        return;
      }

      setProgram(foundProgram);
      
      // Intentamos encontrar el instructor asociado
      if (foundProgram.instructor) {
        const instructors = dataService.getInstructors();
        const matchingInstructor = instructors.find(
          (inst) => inst.name === foundProgram.instructor
        );
        setInstructor(matchingInstructor || null);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar el programa:", err);
      setError("Error al cargar el programa");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="teklatam-container py-12 flex justify-center">
          <p>Cargando programa...</p>
        </div>
      </Layout>
    );
  }

  if (error || !program) {
    return (
      <Layout>
        <div className="teklatam-container py-12">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto" />
            <h1 className="text-2xl font-bold">{error || "Error desconocido"}</h1>
            <p>No se pudo cargar la información del programa solicitado.</p>
            <Button asChild>
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-blue-100 text-blue-800";
      case "Avanzado":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "curso":
        return "Curso";
      case "diplomado":
        return "Diplomado";
      case "maestria":
        return "Maestría";
      default:
        return category;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-teklatam-gray-50 to-white">
        <div className="teklatam-container py-8 md:py-12">
          {/* Navegación */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm text-teklatam-gray-600 hover:text-teklatam-blue">
                    Inicio
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-1 text-teklatam-gray-400">/</span>
                    <Link to="/#programas" className="text-sm text-teklatam-gray-600 hover:text-teklatam-blue">
                      Programas
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-1 text-teklatam-gray-400">/</span>
                    <span className="text-sm text-teklatam-gray-500 truncate max-w-[200px]">
                      {program?.title || 'Cargando...'}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.title}</h1>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(program.level)}`}>
                    {program.level}
                  </span>
                  <span className="text-teklatam-gray-600 flex items-center text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {program.students.toLocaleString()} estudiantes
                  </span>
                  <span className="text-teklatam-gray-600 flex items-center text-sm">
                    <Book className="w-4 h-4 mr-1" />
                    {getCategoryLabel(program.category)}
                  </span>
                </div>
                
                <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={program.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                    alt={program.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-lg">{program.detailedDescription || program.description}</p>
                </div>
              </div>
              
              {/* Módulos */}
              {program.modules && program.modules.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contenido del programa</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {program.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="text-left">
                          {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose max-w-none">
                            <p>{module.content}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              
              {/* Objetivos de aprendizaje */}
              {program.learningObjectives && program.learningObjectives.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Lo que aprenderás</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {program.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-teklatam-blue mr-2 mt-1">✓</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Requisitos */}
              {program.requirements && program.requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    {program.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Público objetivo */}
              {program.targetAudience && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">¿A quién va dirigido?</h2>
                  <div className="prose max-w-none">
                    <p>{program.targetAudience}</p>
                  </div>
                </div>
              )}
              
              {/* Preguntas frecuentes */}
              {program.faqs && program.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {program.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose max-w-none">
                            <p>{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
            
            {/* Sidebar - Información del curso e inscripción */}
            <div className="space-y-6">
              <Card className="border border-teklatam-gray-200 shadow-sm sticky top-24">
                <CardHeader className="bg-teklatam-blue text-white">
                  <CardTitle className="flex justify-between items-center">
                    <span>Inscríbete ahora</span>
                    {program.category === "curso" && (
                      <span className="animate-bounce text-white bg-teklatam-orange px-3 py-1 rounded-full text-sm">
                        ¡Plazas limitadas!
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-4">
                    {program.startDate && (
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Fecha de inicio:</p>
                          <p>{program.startDate}</p>
                        </div>
                      </div>
                    )}
                    
                    {program.duration && (
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Duración:</p>
                          <p>{program.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {program.schedule && (
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Horario:</p>
                          <p>{program.schedule}</p>
                        </div>
                      </div>
                    )}
                    
                    {instructor && (
                      <div className="flex items-start">
                        <UserCircle className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Instructor:</p>
                          <p className="flex items-center">
                            {instructor.name}
                            {instructor.role && (
                              <span className="ml-1 text-xs text-teklatam-gray-500">
                                ({instructor.role})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Nivel:</p>
                        <p>{program.level}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 mr-2 text-teklatam-blue shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Modalidad:</p>
                        <p>En línea / Presencial</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full bg-teklatam-orange hover:bg-teklatam-orange/90">
                    Solicitar información
                  </Button>
                  <Button variant="outline" className="w-full">
                    Descargar programa formativo
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Info del instructor */}
              {instructor && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Sobre el instructor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 w-24 h-24 rounded-full overflow-hidden">
                        <img 
                          src={instructor.image || "https://via.placeholder.com/150"} 
                          alt={instructor.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{instructor.name}</h3>
                      <p className="text-teklatam-orange text-sm">{instructor.role}</p>
                    </div>
                    <p className="text-sm">{instructor.bio}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgramDetail;
