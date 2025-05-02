
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  previewClassName?: string;
}

const ImageUploader = ({ id, value, onChange, label, previewClassName = "h-32 w-auto" }: ImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    
    // Convert the file to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    onChange("");
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="block text-sm font-medium mb-1">{label}</Label>
      <div className="space-y-3">
        {value && (
          <div className="relative inline-block">
            <img 
              src={value} 
              alt="Preview" 
              className={`object-cover rounded ${previewClassName}`}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => document.getElementById(id)?.click()}
            className="flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            {loading ? "Cargando..." : "Subir imagen"}
          </Button>
          <input
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
