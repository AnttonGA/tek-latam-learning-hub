
import { useEffect, useState } from "react";
import { dataService } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Move } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "@/components/ui/ImageUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from 'uuid';
import { SiteContent, HeroSlide } from "@/types";

const ContentManager = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    try {
      const siteContent = dataService.getSiteContent();
      setContent(siteContent);
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el contenido del sitio.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (content) {
      const { name, value } = e.target;
      setContent({
        ...content,
        [name]: value,
      });
    }
  };

  const handleHeroImageChange = (value: string) => {
    if (content) {
      setContent({
        ...content,
        heroImage: value
      });
    }
  };

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    if (!content) return;
    
    const updatedSlides = [...content.heroSlides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value
    };
    
    setContent({
      ...content,
      heroSlides: updatedSlides
    });
  };

  const handleSlideImageChange = (index: number, imageUrl: string) => {
    handleSlideChange(index, 'imageUrl', imageUrl);
  };

  const addNewSlide = () => {
    if (!content) return;
    
    const newSlide: HeroSlide = {
      id: uuidv4(),
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      title: 'Nueva Diapositiva',
      subtitle: 'Descripción de la nueva diapositiva',
      buttonText: 'Ver Más',
      buttonLink: '#programas'
    };
    
    setContent({
      ...content,
      heroSlides: [...content.heroSlides, newSlide]
    });
    
    toast({
      title: "Diapositiva añadida",
      description: "Se ha añadido una nueva diapositiva al carrusel.",
    });
  };

  const removeSlide = (index: number) => {
    if (!content || content.heroSlides.length <= 1) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe haber al menos una diapositiva en el carrusel.",
      });
      return;
    }
    
    const updatedSlides = content.heroSlides.filter((_, i) => i !== index);
    setContent({
      ...content,
      heroSlides: updatedSlides
    });
    
    toast({
      title: "Diapositiva eliminada",
      description: "Se ha eliminada la diapositiva del carrusel.",
    });
  };

  const handleSave = () => {
    if (content) {
      try {
        dataService.saveSiteContent(content);
        toast({
          title: "Contenido actualizado",
          description: "El contenido del sitio ha sido actualizado correctamente.",
        });
      } catch (error) {
        console.error("Error al guardar el contenido:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo guardar el contenido del sitio.",
        });
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando contenido...</div>;
  }

  if (!content) {
    return <div className="text-center text-red-500 py-8">Error al cargar el contenido</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Contenido de la Página Principal</CardTitle>
        <CardDescription>Modifica los textos y configuraciones principales de la web.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="hero">Hero Carrusel</TabsTrigger>
            <TabsTrigger value="cta">Sección CTA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero" className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Diapositivas del Carrusel</h3>
                <Button 
                  onClick={addNewSlide}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Añadir diapositiva
                </Button>
              </div>
              
              {content.heroSlides.map((slide, index) => (
                <div key={slide.id} className="border rounded-md p-4 mb-4 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Diapositiva {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8"
                      onClick={() => removeSlide(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`slide-title-${index}`} className="block text-sm font-medium mb-1">Título</Label>
                        <Input 
                          id={`slide-title-${index}`}
                          value={slide.title} 
                          onChange={(e) => handleSlideChange(index, 'title', e.target.value)} 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`slide-subtitle-${index}`} className="block text-sm font-medium mb-1">Subtítulo</Label>
                        <Textarea 
                          id={`slide-subtitle-${index}`}
                          value={slide.subtitle} 
                          onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                          rows={3} 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`slide-btn-text-${index}`} className="block text-sm font-medium mb-1">Texto del botón</Label>
                          <Input 
                            id={`slide-btn-text-${index}`}
                            value={slide.buttonText || ''} 
                            onChange={(e) => handleSlideChange(index, 'buttonText', e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor={`slide-btn-link-${index}`} className="block text-sm font-medium mb-1">Enlace del botón</Label>
                          <Input 
                            id={`slide-btn-link-${index}`}
                            value={slide.buttonLink || ''} 
                            onChange={(e) => handleSlideChange(index, 'buttonLink', e.target.value)} 
                            placeholder="#seccion o /pagina"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <ImageUploader
                        id={`hero-slide-image-${index}`}
                        value={slide.imageUrl}
                        onChange={(value) => handleSlideImageChange(index, value)}
                        label="Imagen de fondo"
                        previewClassName="w-full h-32 object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cta" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">CTA Section</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ctaTitle" className="block text-sm font-medium mb-1">Título</Label>
                  <Input 
                    id="ctaTitle" 
                    name="ctaTitle" 
                    value={content.ctaTitle} 
                    onChange={handleChange} 
                  />
                </div>
                <div>
                  <Label htmlFor="ctaDescription" className="block text-sm font-medium mb-1">Descripción</Label>
                  <Textarea 
                    id="ctaDescription" 
                    name="ctaDescription" 
                    value={content.ctaDescription} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} className="flex items-center gap-2 bg-teklatam-blue hover:bg-teklatam-blue/90">
            <Save className="h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentManager;
