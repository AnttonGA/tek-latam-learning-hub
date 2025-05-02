
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from 'lucide-react';
import Dashboard from '@/components/admin/Dashboard';
import ProgramsManager from '@/components/admin/ProgramsManager';
import InstructorsManager from '@/components/admin/InstructorsManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import ContentManager from '@/components/admin/ContentManager';

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
      description: "Has salido del panel de administración",
    });
    
    // Redirigir a la página principal
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="teklatam-container flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-teklatam-blue">Panel de Administración <span className="text-teklatam-orange">TekLatam</span></h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </header>
      
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
            
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="cursos">
              <ProgramsManager />
            </TabsContent>
            
            <TabsContent value="instructores">
              <InstructorsManager />
            </TabsContent>
            
            <TabsContent value="testimonios">
              <TestimonialsManager />
            </TabsContent>
            
            <TabsContent value="contenido">
              <ContentManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="teklatam-container text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} TekLatam - Panel Administrativo
        </div>
      </footer>
    </div>
  );
};

export default Admin;
