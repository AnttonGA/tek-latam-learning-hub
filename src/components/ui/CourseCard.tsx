
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  featured?: boolean;
  slug: string;
}

const CourseCard = ({ 
  id,
  title,
  instructor,
  description,
  image,
  duration,
  students,
  rating,
  level,
  featured = false,
  slug
}: CourseCardProps) => {
  const levelColorMap = {
    'Principiante': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-blue-100 text-blue-800',
    'Avanzado': 'bg-purple-100 text-purple-800'
  };
  
  const levelColor = levelColorMap[level] || 'bg-gray-100 text-gray-800';
  
  return (
    <Link to={`/programas/${slug}`}>
      <div className={`h-full teklatam-card relative overflow-hidden transition-all duration-300 hover:translate-y-[-5px] ${featured ? 'ring-2 ring-teklatam-orange' : ''}`}>
        {featured && (
          <div className="absolute top-0 right-0 bg-teklatam-orange text-white text-xs font-medium px-2 py-1 z-10">
            Destacado
          </div>
        )}
        
        {/* Course Image */}
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-2 left-2">
            <Badge className={`${levelColor} font-medium`}>{level}</Badge>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm text-teklatam-gray-500 mb-3">Por {instructor}</p>
          
          <p className="text-sm text-teklatam-gray-600 mb-4 line-clamp-3">{description}</p>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-teklatam-gray-500 pt-3 border-t border-teklatam-gray-200">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{students.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
