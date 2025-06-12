
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { dataService } from '@/services/dataService';
import { NewsItem } from '@/types';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = () => {
      try {
        const loadedNews = dataService.getNews();
        // Filtrar solo noticias publicadas y ordenar por fecha
        const publishedNews = loadedNews
          .filter(item => item.status === 'published')
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 6); // Mostrar solo las 6 más recientes

        setNews(publishedNews);
        console.log("Noticias cargadas en home:", publishedNews);
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();

    // Escuchar cambios en storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teklatam_news') {
        console.log("Detectado cambio en noticias desde storage");
        loadNews();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: NewsItem['category']) => {
    const colors = {
      noticias: 'bg-blue-100 text-blue-800',
      eventos: 'bg-green-100 text-green-800',
      anuncios: 'bg-red-100 text-red-800',
      actualizaciones: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || colors.noticias;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="teklatam-container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null; // No mostrar la sección si no hay noticias
  }

  return (
    <section className="py-16 bg-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Newspaper className="h-8 w-8 text-teklatam-orange" />
            <h2 className="text-3xl font-bold">Noticias y Novedades</h2>
          </div>
          <p className="text-teklatam-gray-600 max-w-2xl mx-auto">
            Mantente al día con las últimas noticias, eventos y actualizaciones de TekLatam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <Link to={`/noticia/${item.id}`}>
                <div className="relative">
                  {item.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-teklatam-orange text-white">Destacada</Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-teklatam-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(item.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {item.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-teklatam-orange transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-teklatam-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button variant="ghost" className="w-full justify-between group-hover:text-teklatam-orange">
                    Leer más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {news.length >= 6 && (
          <div className="text-center mt-12">
            <Link to="/noticias">
              <Button variant="outline" size="lg">
                Ver todas las noticias
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
