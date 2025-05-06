
import { useEffect, useState } from 'react';
import { Program, dataService } from '@/services/dataService';
import CourseCard from '@/components/ui/CourseCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const FeaturedCourses = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'curso' | 'diplomado' | 'maestria'>('curso');
  const [filteredCount, setFilteredCount] = useState(3);

  useEffect(() => {
    try {
      const loadedPrograms = dataService.getPrograms();
      setPrograms(loadedPrograms);
    } catch (error) {
      console.error("Error al cargar los programas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
    
    if (showAll) {
      const element = document.getElementById('programas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFilteredPrograms = (category: 'curso' | 'diplomado' | 'maestria') => {
    const filteredByCategory = programs.filter(program => program.category === category);
    return showAll ? filteredByCategory : filteredByCategory.slice(0, filteredCount);
  };

  const getCategoryCount = (category: 'curso' | 'diplomado' | 'maestria') => {
    return programs.filter(program => program.category === category).length;
  };

  const handleFilterChange = (value: number[]) => {
    setFilteredCount(value[0]);
  };

  if (loading) {
    return (
      <section id="programas" className="py-16 bg-white">
        <div className="teklatam-container">
          <p className="text-center text-lg">Cargando programas...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="programas" className="py-16 bg-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Programas Educativos</h2>
          <p className="text-teklatam-gray-600 max-w-2xl mx-auto">
            Descubre nuestros programas formativos diseñados para potenciar tu carrera en tecnología.
          </p>
        </div>
        
        <Tabs defaultValue="curso" value={activeTab} onValueChange={(value) => setActiveTab(value as 'curso' | 'diplomado' | 'maestria')} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="curso" className="text-center">
              Cursos <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-teklatam-orange text-white">{getCategoryCount('curso')}</span>
            </TabsTrigger>
            <TabsTrigger value="diplomado" className="text-center">
              Diplomados <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-teklatam-orange text-white">{getCategoryCount('diplomado')}</span>
            </TabsTrigger>
            <TabsTrigger value="maestria" className="text-center">
              Maestrías <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-teklatam-orange text-white">{getCategoryCount('maestria')}</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-teklatam-gray-600">
              Mostrar: <span className="font-medium">{filteredCount}</span> programas
            </div>
            <div className="w-full md:w-1/3">
              <Slider
                defaultValue={[3]}
                max={10}
                min={1}
                step={1}
                value={[filteredCount]}
                onValueChange={handleFilterChange}
                className="w-full"
              />
            </div>
          </div>
          
          <TabsContent value="curso" className="mt-0 animate-fade-in">
            {getFilteredPrograms('curso').length === 0 ? (
              <p className="text-center text-teklatam-gray-600 py-10">No hay cursos disponibles en este momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredPrograms('curso').map((program) => (
                  <CourseCard 
                    key={program.id}
                    id={program.id}
                    title={program.title}
                    instructor={program.instructor}
                    level={program.level}
                    students={program.students}
                    description={program.description}
                    imageUrl={program.image}
                  />
                ))}
              </div>
            )}
            
            {getCategoryCount('curso') > filteredCount && !showAll && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                >
                  Ver todos los cursos ({getCategoryCount('curso')})
                </Button>
              </div>
            )}
            {showAll && getCategoryCount('curso') > 3 && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  variant="outline"
                >
                  Mostrar menos
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="diplomado" className="mt-0 animate-fade-in">
            {getFilteredPrograms('diplomado').length === 0 ? (
              <p className="text-center text-teklatam-gray-600 py-10">No hay diplomados disponibles en este momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredPrograms('diplomado').map((program) => (
                  <CourseCard 
                    key={program.id}
                    id={program.id}
                    title={program.title}
                    instructor={program.instructor}
                    level={program.level}
                    students={program.students}
                    description={program.description}
                    imageUrl={program.image}
                  />
                ))}
              </div>
            )}
            
            {getCategoryCount('diplomado') > filteredCount && !showAll && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                >
                  Ver todos los diplomados ({getCategoryCount('diplomado')})
                </Button>
              </div>
            )}
            {showAll && getCategoryCount('diplomado') > 3 && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  variant="outline"
                >
                  Mostrar menos
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="maestria" className="mt-0 animate-fade-in">
            {getFilteredPrograms('maestria').length === 0 ? (
              <p className="text-center text-teklatam-gray-600 py-10">No hay maestrías disponibles en este momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredPrograms('maestria').map((program) => (
                  <CourseCard 
                    key={program.id}
                    id={program.id}
                    title={program.title}
                    instructor={program.instructor}
                    level={program.level}
                    students={program.students}
                    description={program.description}
                    imageUrl={program.image}
                  />
                ))}
              </div>
            )}
            
            {getCategoryCount('maestria') > filteredCount && !showAll && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  className="bg-teklatam-orange hover:bg-teklatam-orange/90 text-white"
                >
                  Ver todas las maestrías ({getCategoryCount('maestria')})
                </Button>
              </div>
            )}
            {showAll && getCategoryCount('maestria') > 3 && (
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleShowAll}
                  variant="outline"
                >
                  Mostrar menos
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedCourses;
