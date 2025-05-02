
import { useEffect, useState } from "react";
import { dataService } from "@/services/dataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, BookOpen, Users, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Stats {
  totalPrograms: number;
  totalInstructors: number;
  totalTestimonials: number;
  totalStudents: number;
  recentActivity: Array<{
    id: string;
    description: string;
    timestamp: string;
  }>;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtenemos las estadísticas cuando el componente se monta
    const fetchStats = () => {
      try {
        const stats = dataService.getStats();
        setStats(stats);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-40">Cargando estadísticas...</div>;
  }

  if (!stats) {
    return <div className="text-center text-red-500">Error al cargar las estadísticas</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Programas Totales</CardTitle>
            <BookOpen className="h-4 w-4 text-teklatam-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrograms}</div>
            <p className="text-xs text-teklatam-gray-500 mt-1">
              Programas activos en la plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-teklatam-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-teklatam-gray-500 mt-1">
              Estudiantes matriculados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Instructores</CardTitle>
            <Users className="h-4 w-4 text-teklatam-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInstructors}</div>
            <p className="text-xs text-teklatam-gray-500 mt-1">
              Expertos en la plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Testimonios</CardTitle>
            <MessageSquare className="h-4 w-4 text-teklatam-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
            <p className="text-xs text-teklatam-gray-500 mt-1">
              Valoraciones de estudiantes
            </p>
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
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-teklatam-gray-500">
                      {format(new Date(activity.timestamp), "dd 'de' MMMM, HH:mm", { locale: es })}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-teklatam-gray-400" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
