
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir a la página de login
      toast({
        variant: "destructive",
        title: "Acceso restringido",
        description: "Debes iniciar sesión para acceder a esta sección",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  // Solo renderizar el contenido si hay un token en sessionStorage
  return sessionStorage.getItem('isAuthenticated') ? <>{children}</> : null;
};

export default ProtectedRoute;
