
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LayoutDashboard, Book, Users, MessageSquareQuote, FileText, MessageSquare, Newspaper } from 'lucide-react';
import Dashboard from '@/components/admin/Dashboard';
import ProgramsManager from '@/components/admin/ProgramsManager';
import InstructorsManager from '@/components/admin/InstructorsManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import ContentManager from '@/components/admin/ContentManager';
import ContactsManager from '@/components/admin/ContactsManager';
import NewsManager from '@/components/admin/NewsManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Eliminar la información de autenticación
    sessionStorage.removeItem('isAuthenticated');
    
    // Mostrar mensaje de éxito
    toast({
      title: "Sesión cerrada",
      description: "Has salido del panel de administración"
    });
    
    // Redirigir a la página principal
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="teklatam-container flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-teklatam-orange text-white p-2 rounded-md">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">
              <span className="text-teklatam-blue">Admin</span>
              <span className="text-teklatam-orange">Panel</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')} 
              className="text-teklatam-gray-600 hover:text-teklatam-blue"
            >
              Ver sitio
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="flex items-center gap-2 border-teklatam-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-8">
        <div className="teklatam-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-teklatam-gray-800">Panel de Administración</h1>
            <p className="text-teklatam-gray-600">Gestiona el contenido de tu plataforma educativa TekLatam.</p>
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 sm:grid-cols-7 gap-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="cursos" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <Book className="h-4 w-4" /> Programas
              </TabsTrigger>
              <TabsTrigger value="instructores" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <Users className="h-4 w-4" /> Instructores
              </TabsTrigger>
              <TabsTrigger value="testimonios" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <MessageSquareQuote className="h-4 w-4" /> Testimonios
              </TabsTrigger>
              <TabsTrigger value="noticias" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <Newspaper className="h-4 w-4" /> Noticias
              </TabsTrigger>
              <TabsTrigger value="mensajes" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm flex gap-2 items-center">
                <MessageSquare className="h-4 w-4" /> Mensajes
              </TabsTrigger>
              <TabsTrigger value="contenido" className="data-[state=active]:bg-white data-[state=active]:text-teklatam-blue data-[state=active]:shadow-sm hidden sm:flex gap-2 items-center">
                <FileText className="h-4 w-4" /> Contenido
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-white border rounded-lg shadow-sm">
              <TabsContent value="dashboard" className="p-6">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="cursos" className="p-6">
                <ProgramsManager />
              </TabsContent>
              
              <TabsContent value="instructores" className="p-6">
                <InstructorsManager />
              </TabsContent>
              
              <TabsContent value="testimonios" className="p-6">
                <TestimonialsManager />
              </TabsContent>
              
              <TabsContent value="noticias" className="p-6">
                <NewsManager />
              </TabsContent>
              
              <TabsContent value="mensajes" className="p-6">
                <ContactsManager />
              </TabsContent>
              
              <TabsContent value="contenido" className="p-6">
                <ContentManager />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4 mt-8">
        <div className="teklatam-container text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} TekLatam - Panel Administrativo
        </div>
      </footer>
    </div>
  );
};

export default Admin;
