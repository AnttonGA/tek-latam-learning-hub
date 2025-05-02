
import { useEffect, useState } from "react";
import { dataService, SiteContent } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "@/components/ui/ImageUploader";

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
        <div className="space-y-4">
          <h3 className="font-medium">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroTitle" className="block text-sm font-medium mb-1">Título</Label>
              <Input 
                id="heroTitle" 
                name="heroTitle" 
                value={content.heroTitle} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label htmlFor="heroDescription" className="block text-sm font-medium mb-1">Descripción</Label>
              <Textarea 
                id="heroDescription" 
                name="heroDescription" 
                value={content.heroDescription} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <ImageUploader
                id="hero-image"
                value={content.heroImage}
                onChange={handleHeroImageChange}
                label="Imagen de la sección Hero"
                previewClassName="w-full sm:w-64 h-32 object-cover"
              />
            </div>
          </div>
        </div>
        
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
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="teklatam-btn-primary">
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentManager;
