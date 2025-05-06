
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Program, dataService } from '@/services/dataService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { GraduationCap, Calendar, Users, Star, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('descripcion');
  const { toast } = useToast();

  useEffect(() => {
    const fetchProgram = () => {
      try {
        if (!id) return;
        
        const programs = dataService.getPrograms();
        const foundProgram = programs.find(p => p.id === id);
        
        if (foundProgram) {
          setProgram(foundProgram);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el programa:", error);
        setLoading(false);
      }
    };

    fetchProgram();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home page and then to contact section
      toast({
        title: "Navegando a la página de contacto",
        description: "Te estamos redirigiendo a la sección de contacto",
      });
      window.location.href = '/?section=contacto';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-teklatam-gray-600">Cargando información del programa...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold mb-4">Programa no encontrado</h1>
          <p className="text-xl text-teklatam-gray-600 mb-8">Lo sentimos, no pudimos encontrar el programa que estás buscando.</p>
          <Link to="/">
            <Button className="bg-teklatam-blue hover:bg-teklatam-blue/90">
              Volver a la página principal
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Información del programa (mock data que podría venir de la API)
  const programDetails = {
    duration: "6 meses",
    schedule: "Flexible, 8-10 horas por semana",
    startDate: "Próximo inicio: 15 de junio, 2025",
    modules: [
      {
        title: "Módulo 1: Fundamentos",
        content: "Introducción a los conceptos básicos de la materia. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: Desarrollo de habilidades",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Aplicación real",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      },
      {
        title: "Módulo 4: Especialización",
        content: "Profundización en áreas específicas y desarrollo de portfolio."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "Depende del nivel del programa. Los cursos de nivel principiante no requieren conocimientos previos, mientras que los intermedios y avanzados sí requieren una base."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section del programa */}
      <div className="relative w-full bg-gradient-to-r from-teklatam-blue to-blue-800 text-white py-16">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url(${program.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="teklatam-container relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="mb-4">
                <span className="bg-teklatam-orange text-white px-3 py-1 rounded-full text-sm uppercase">
                  {program.category === 'curso' ? 'Curso' : 
                   program.category === 'diplomado' ? 'Diplomado' : 'Maestría'}
                </span>
                <span className="ml-3 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {program.level}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{program.title}</h1>
              
              <p className="text-lg mb-6">{program.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{program.students.toLocaleString()} estudiantes</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  <span>4.8/5 (120 reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{programDetails.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <GraduationCap className="h-6 w-6 mr-2" />
                <span className="text-lg">Instructor: {program.instructor}</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                >
                  Solicitar información
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Descargar temario
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full text-teklatam-gray-700 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-teklatam-blue">Detalles del programa</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-teklatam-orange" />
                      <span className="font-semibold">Inicio:</span>
                    </div>
                    <p>{programDetails.startDate}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 mr-2 text-teklatam-orange" />
                      <span className="font-semibold">Horario:</span>
                    </div>
                    <p>{programDetails.schedule}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <GraduationCap className="h-4 w-4 mr-2 text-teklatam-orange" />
                      <span className="font-semibold">Nivel:</span>
                    </div>
                    <p>{program.level}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-teklatam-blue hover:bg-teklatam-blue/90"
                >
                  Inscribirme ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido detallado del programa */}
      <div className="py-12 bg-gray-50">
        <div className="teklatam-container">
          <Tabs defaultValue="descripcion" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 grid w-full grid-cols-4">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="contenido">Contenido</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="faq">Preguntas frecuentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="descripcion" className="animate-fade-in">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Sobre este programa</h2>
                <p className="text-lg mb-6">
                  {program.description} Este programa está diseñado para proporcionar una formación
                  completa que te permitirá desarrollarte profesionalmente en esta área, adquiriendo
                  conocimientos prácticos y teóricos demandados por el mercado laboral actual.
                </p>
                
                <h3 className="text-xl font-bold mb-3">Lo que aprenderás</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Dominio de las técnicas y herramientas fundamentales</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Aplicación práctica en proyectos reales</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Desarrollo de un portfolio profesional</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Acceso a una comunidad de expertos y estudiantes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Mentoría personalizada durante todo el programa</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-teklatam-orange">✓</div>
                    <span>Certificación reconocida en la industria</span>
                  </li>
                </ul>
                
                <h3 className="text-xl font-bold mb-3">Requisitos</h3>
                <ul className="list-disc pl-5 mb-8">
                  <li className="mb-2">Conocimientos básicos en el área (para niveles intermedio y avanzado)</li>
                  <li className="mb-2">Computadora con acceso a internet</li>
                  <li className="mb-2">Dedicación de 8-10 horas semanales</li>
                </ul>
                
                <h3 className="text-xl font-bold mb-3">A quién va dirigido</h3>
                <p className="text-lg">
                  Este programa está dirigido a profesionales que buscan especializarse, estudiantes
                  que desean complementar su formación académica, y entusiastas que quieren iniciar
                  una carrera en este campo. Es ideal para quienes buscan una formación práctica y
                  actualizada con las demandas del mercado laboral.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="contenido" className="animate-fade-in">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Contenido del programa</h2>
                
                <div className="space-y-4">
                  {programDetails.modules.map((module, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                        <h3 className="text-lg font-medium">{module.title}</h3>
                        <span>+</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 border-t">
                        <p>{module.content}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Metodología</h3>
                  <p className="mb-6">
                    Nuestro enfoque de enseñanza combina teoría con práctica, permitiéndote aplicar
                    lo aprendido en proyectos reales desde el primer día. Las clases incluyen:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Clases en vivo</h4>
                      <p>Sesiones interactivas con expertos de la industria.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Contenido on-demand</h4>
                      <p>Acceso a material educativo para estudiar a tu ritmo.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Proyectos prácticos</h4>
                      <p>Desarrollo de soluciones para problemas reales.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Mentoría personalizada</h4>
                      <p>Apoyo individual para potenciar tu aprendizaje.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button onClick={scrollToContact} className="bg-teklatam-orange hover:bg-teklatam-orange/90">
                      Solicitar temario completo
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="animate-fade-in">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Sobre el instructor</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/300" 
                        alt={program.instructor}
                        className="w-full object-cover aspect-square"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-2">{program.instructor}</h3>
                    <p className="text-teklatam-gray-600 mb-4">Especialista en {program.title}</p>
                    
                    <p className="mb-4">
                      Profesional con amplia experiencia en la industria y en docencia. Ha trabajado
                      en importantes empresas del sector y cuenta con reconocimientos por su labor
                      educativa y profesional. Su enfoque práctico y cercano hace que los conceptos
                      más complejos sean fáciles de entender y aplicar.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Experiencia</h4>
                      <ul className="list-disc pl-5">
                        <li className="mb-1">Más de 10 años de experiencia en la industria</li>
                        <li className="mb-1">Docente en prestigiosas universidades</li>
                        <li className="mb-1">Consultor para diversas empresas del sector</li>
                        <li className="mb-1">Ponente en conferencias internacionales</li>
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="border-teklatam-blue text-teklatam-blue hover:bg-teklatam-blue/10">
                      Ver perfil completo
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="animate-fade-in">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
                
                <div className="space-y-4">
                  {programDetails.faqs.map((faq, index) => (
                    <Collapsible key={index}>
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
                        <h3 className="text-lg font-medium">{faq.question}</h3>
                        <span>+</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 border-t">
                        <p>{faq.answer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">¿Tienes más preguntas?</h3>
                  <p className="mb-4">
                    No dudes en contactarnos para resolver cualquier duda adicional que tengas sobre
                    este u otros programas de TekLatam.
                  </p>
                  <Button onClick={scrollToContact} className="bg-teklatam-blue hover:bg-teklatam-blue/90">
                    Contactar con un asesor
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProgramDetail;
