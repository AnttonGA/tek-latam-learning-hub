
import { useEffect, useState } from "react";
import { dataService } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HeroSlide, SiteContent } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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
      
      // Ensure heroSlides exists
      if (!siteContent.heroSlides) {
        siteContent.heroSlides = [];
      }
      
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

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    if (content && content.heroSlides) {
      const updatedSlides = [...content.heroSlides];
      updatedSlides[index] = {
        ...updatedSlides[index],
        [field]: value,
      };

      setContent({
        ...content,
        heroSlides: updatedSlides,
      });
    }
  };

  const addHeroSlide = () => {
    if (content) {
      const newSlide: HeroSlide = {
        id: uuidv4(),
        imageUrl: "/placeholder.svg",
        title: "Nuevo título",
        subtitle: "Nueva descripción",
        buttonText: "Ver Más",
        buttonLink: "programas",
      };

      setContent({
        ...content,
        heroSlides: [...(content.heroSlides || []), newSlide],
      });
    }
  };

  const removeHeroSlide = (index: number) => {
    if (content && content.heroSlides) {
      const updatedSlides = [...content.heroSlides];
      updatedSlides.splice(index, 1);

      setContent({
        ...content,
        heroSlides: updatedSlides,
      });
    }
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
        {/* Hero Section Slides */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Hero Section (Carrusel)</h3>
            <Button 
              onClick={addHeroSlide} 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Añadir Slide
            </Button>
          </div>
          
          {content.heroSlides && content.heroSlides.map((slide, index) => (
            <Card key={slide.id} className="p-4 relative">
              <Button
                onClick={() => removeHeroSlide(index)}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
              >
                <Trash className="h-4 w-4" />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">Imagen de fondo (URL)</Label>
                  <Input
                    value={slide.imageUrl}
                    onChange={(e) => handleSlideChange(index, 'imageUrl', e.target.value)}
                    placeholder="URL de la imagen"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Título</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                    placeholder="Título del slide"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">Subtítulo</Label>
                  <Textarea
                    value={slide.subtitle}
                    onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                    placeholder="Subtítulo o descripción"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium mb-1">Texto del botón</Label>
                    <Input
                      value={slide.buttonText || ''}
                      onChange={(e) => handleSlideChange(index, 'buttonText', e.target.value)}
                      placeholder="Texto del botón (opcional)"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-1">Enlace del botón</Label>
                    <Input
                      value={slide.buttonLink || ''}
                      onChange={(e) => handleSlideChange(index, 'buttonLink', e.target.value)}
                      placeholder="ID de la sección (ej: programas)"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="space-y-4 border-t pt-6">
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
