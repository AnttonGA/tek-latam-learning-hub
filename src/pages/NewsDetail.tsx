
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dataService } from '@/services/dataService';
import { NewsItem } from '@/types';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/noticias');
      return;
    }

    const loadNews = () => {
      try {
        const allNews = dataService.getNews();
        const currentNews = allNews.find(item => item.id === id && item.status === 'published');
        
        if (!currentNews) {
          navigate('/noticias');
          return;
        }

        setNewsItem(currentNews);

        // Cargar noticias relacionadas (misma categoría, excluyendo la actual)
        const related = allNews
          .filter(item => 
            item.status === 'published' && 
            item.id !== id && 
            item.category === currentNews.category
          )
          .slice(0, 3);
        
        setRelatedNews(related);
        console.log("Noticia cargada:", currentNews);
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
        navigate('/noticias');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id, navigate]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem?.title,
        text: newsItem?.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="py-16 bg-white">
          <div className="teklatam-container max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-300 rounded mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!newsItem) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="py-16 bg-white">
        <div className="teklatam-container max-w-4xl">
          <div className="mb-8">
            <Link to="/noticias">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a noticias
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className={getCategoryColor(newsItem.category)}>
                {newsItem.category}
              </Badge>
              {newsItem.featured && (
                <Badge className="bg-teklatam-orange text-white">
                  Destacada
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4 text-teklatam-gray-800">
              {newsItem.title}
            </h1>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6 text-teklatam-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDate(newsItem.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {newsItem.author}
                </div>
              </div>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>

            <p className="text-xl text-teklatam-gray-600 mb-8 leading-relaxed">
              {newsItem.excerpt}
            </p>
          </div>

          {newsItem.image && (
            <div className="mb-8">
              <img 
                src={newsItem.image} 
                alt={newsItem.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-teklatam-gray-700 leading-relaxed whitespace-pre-line">
              {newsItem.content}
            </div>
          </div>

          {newsItem.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {newsItem.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className="py-16 bg-teklatam-gray-50">
          <div className="teklatam-container">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Noticias relacionadas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <Link key={item.id} to={`/noticia/${item.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {item.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-teklatam-gray-600 mb-3">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.publishedAt)}
                      </div>
                      
                      <h3 className="font-bold mb-2 group-hover:text-teklatam-orange transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-teklatam-gray-600 text-sm line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetail;
