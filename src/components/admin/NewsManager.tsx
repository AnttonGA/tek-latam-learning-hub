import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { dataService } from '@/services/dataService';
import { NewsItem } from '@/types';
import NewsForm from './NewsForm';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewsManager = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | undefined>(undefined);
  const { toast } = useToast();

  const loadNews = () => {
    try {
      const loadedNews = dataService.getNews();
      setNews(loadedNews);
      setFilteredNews(loadedNews);
      console.log("Noticias cargadas:", loadedNews);
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las noticias"
      });
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredNews(filtered);
  }, [searchTerm, filterCategory, filterStatus, news]);

  const handleAddNews = () => {
    setEditingNews(undefined);
    setShowForm(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const handleSubmitNews = async (newsData: NewsItem | Omit<NewsItem, "id">) => {
    try {
      if (editingNews) {
        dataService.updateNewsItem(newsData as NewsItem);
        toast({
          title: "Noticia actualizada",
          description: "La noticia se ha actualizado correctamente"
        });
      } else {
        dataService.addNewsItem(newsData);
        toast({
          title: "Noticia creada",
          description: "La noticia se ha creado correctamente"
        });
      }
      setShowForm(false);
      setEditingNews(undefined);
      loadNews();
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar la noticia"
      });
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      const success = dataService.deleteNewsItem(id);
      if (success) {
        toast({
          title: "Noticia eliminada",
          description: "La noticia se ha eliminado correctamente"
        });
        loadNews();
      } else {
        throw new Error("No se pudo eliminar la noticia");
      }
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la noticia"
      });
    }
  };

  const getCategoryBadge = (category: NewsItem['category']) => {
    const variants = {
      noticias: 'default',
      eventos: 'secondary',
      anuncios: 'destructive',
      actualizaciones: 'outline'
    } as const;
    
    return <Badge variant={variants[category]}>{category}</Badge>;
  };

  const getStatusBadge = (status: NewsItem['status']) => {
    return (
      <Badge variant={status === 'published' ? 'default' : 'secondary'}>
        {status === 'published' ? 'Publicado' : 'Borrador'}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showForm) {
    return (
      <NewsForm
        newsItem={editingNews}
        onSubmit={handleSubmitNews}
        onCancel={() => {
          setShowForm(false);
          setEditingNews(undefined);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Noticias</h2>
          <p className="text-teklatam-gray-600">Administra las noticias y novedades del sitio web</p>
        </div>
        <Button onClick={handleAddNews} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nueva Noticia
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="noticias">Noticias</SelectItem>
            <SelectItem value="eventos">Eventos</SelectItem>
            <SelectItem value="anuncios">Anuncios</SelectItem>
            <SelectItem value="actualizaciones">Actualizaciones</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="published">Publicado</SelectItem>
            <SelectItem value="draft">Borrador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Destacada</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-teklatam-gray-600">
                  No se encontraron noticias
                </TableCell>
              </TableRow>
            ) : (
              filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-teklatam-gray-600 truncate max-w-xs">
                          {item.excerpt}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-teklatam-gray-400" />
                      {item.author}
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(item.category)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-teklatam-gray-400" />
                      {formatDate(item.publishedAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.featured && <Badge variant="outline">Destacada</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditNews(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. La noticia será eliminada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteNews(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewsManager;
