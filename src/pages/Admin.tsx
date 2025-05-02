
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, PenSquare, Trash2, Plus, Save, Image, Users, BookOpen, MessageSquare } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="teklatam-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-teklatam-gray-600">Gestiona el contenido de tu plataforma educativa.</p>
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="cursos">Programas</TabsTrigger>
              <TabsTrigger value="instructores">Instructores</TabsTrigger>
              <TabsTrigger value="testimonios">Testimonios</TabsTrigger>
              <TabsTrigger value="contenido" className="hidden sm:block">Contenido</TabsTrigger>
            </TabsList>
            
            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Programas Totales</CardTitle>
                    <BookOpen className="h-4 w-4 text-teklatam-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25</div>
                    <p className="text-xs text-teklatam-gray-500 mt-1">+2 este mes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
                    <Users className="h-4 w-4 text-teklatam-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">30,251</div>
                    <p className="text-xs text-teklatam-gray-500 mt-1">+1,234 este mes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Instructores</CardTitle>
                    <Users className="h-4 w-4 text-teklatam-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">104</div>
                    <p className="text-xs text-teklatam-gray-500 mt-1">+3 este mes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Testimonios</CardTitle>
                    <MessageSquare className="h-4 w-4 text-teklatam-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">235</div>
                    <p className="text-xs text-teklatam-gray-500 mt-1">+18 este mes</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas actualizaciones en la plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-72">
                    <div className="space-y-4">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{["Nuevo programa creado", "Instructor actualizado", "Testimonio añadido", "Contenido modificado"][i % 4]}</p>
                            <p className="text-sm text-teklatam-gray-500">Hace {i + 1} {i === 0 ? "hora" : "horas"}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-teklatam-gray-400" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Programas */}
            <TabsContent value="cursos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Programas Formativos</h2>
                <Button className="teklatam-btn-primary">
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
                        {[
                          { title: "Desarrollo Full Stack con MERN", instructor: "Carlos Mendoza", level: "Intermedio", students: 3420 },
                          { title: "Ciencia de Datos y Machine Learning", instructor: "Ana María Valencia", level: "Avanzado", students: 2874 },
                          { title: "Fundamentos de Desarrollo Web", instructor: "Juan Pérez", level: "Principiante", students: 5932 },
                          { title: "Ciberseguridad Aplicada", instructor: "Gabriela Rojas", level: "Intermedio", students: 1853 }
                        ].map((curso, i) => (
                          <tr key={i} className="border-b last:border-b-0">
                            <td className="py-3 px-4">{curso.title}</td>
                            <td className="py-3 px-4">{curso.instructor}</td>
                            <td className="py-3 px-4">{curso.level}</td>
                            <td className="py-3 px-4">{curso.students}</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <PenSquare className="h-4 w-4 text-teklatam-blue" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Instructores */}
            <TabsContent value="instructores" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Instructores</h2>
                <Button className="teklatam-btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Instructor
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Carlos Mendoza", role: "Desarrollador Full Stack", image: "https://i.pravatar.cc/300?img=60" },
                  { name: "Ana María Valencia", role: "Data Scientist", image: "https://i.pravatar.cc/300?img=32" },
                  { name: "Roberto González", role: "Especialista en Ciberseguridad", image: "https://i.pravatar.cc/300?img=52" },
                  { name: "Laura Martínez", role: "UX/UI Designer", image: "https://i.pravatar.cc/300?img=45" }
                ].map((instructor, i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img src={instructor.image} alt={instructor.name} className="w-full h-48 object-cover" />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                            <PenSquare className="h-4 w-4 text-teklatam-blue" />
                          </Button>
                          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{instructor.name}</h3>
                        <p className="text-teklatam-orange text-sm">{instructor.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Testimonios */}
            <TabsContent value="testimonios" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Testimonios</h2>
                <Button className="teklatam-btn-primary">
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
                          <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Alejandra Vargas", role: "Front-end Developer", company: "Globant" },
                          { name: "Ricardo Montero", role: "Data Scientist", company: "Mercado Libre" },
                          { name: "Camila Rodriguez", role: "UX/UI Designer", company: "Rappi" },
                          { name: "Miguel Ángel Torres", role: "Security Analyst", company: "BBVA" }
                        ].map((testimonio, i) => (
                          <tr key={i} className="border-b last:border-b-0">
                            <td className="py-3 px-4">{testimonio.name}</td>
                            <td className="py-3 px-4">{testimonio.role}</td>
                            <td className="py-3 px-4">{testimonio.company}</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <PenSquare className="h-4 w-4 text-teklatam-blue" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contenido */}
            <TabsContent value="contenido" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Editar Contenido de la Página Principal</CardTitle>
                  <CardDescription>Modifica los textos y configuraciones principales de la web.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Hero Section</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="hero-title" className="block text-sm font-medium mb-1">Título</label>
                        <Input id="hero-title" defaultValue="Formación tecnológica de clase mundial para Latinoamérica" />
                      </div>
                      <div>
                        <label htmlFor="hero-description" className="block text-sm font-medium mb-1">Descripción</label>
                        <Textarea id="hero-description" defaultValue="Programas de especialización diseñados por expertos de la industria para formar los profesionales tecnológicos que la región necesita." />
                      </div>
                      <div>
                        <label htmlFor="hero-image" className="block text-sm font-medium mb-1">Imagen</label>
                        <div className="flex items-center space-x-4">
                          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" alt="Hero" className="w-20 h-20 object-cover rounded" />
                          <Button variant="outline" size="sm">
                            <Image className="h-4 w-4 mr-2" />
                            Cambiar imagen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">CTA Section</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cta-title" className="block text-sm font-medium mb-1">Título</label>
                        <Input id="cta-title" defaultValue="Transforma tu futuro con las habilidades más demandadas" />
                      </div>
                      <div>
                        <label htmlFor="cta-description" className="block text-sm font-medium mb-1">Descripción</label>
                        <Textarea id="cta-description" defaultValue="Avanza tu carrera profesional con programas formativos diseñados para el mercado latinoamericano." />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button className="teklatam-btn-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
