
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  courses: number;
  students: number;
}

const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    role: 'Desarrollador Full Stack',
    bio: 'Especialista en desarrollo web con más de 10 años de experiencia en empresas como Google y Microsoft.',
    image: 'https://i.pravatar.cc/300?img=60',
    courses: 4,
    students: 3820
  },
  {
    id: '2',
    name: 'Ana María Valencia',
    role: 'Data Scientist',
    bio: 'PhD en Ciencias Computacionales con especialización en Machine Learning y análisis de datos.',
    image: 'https://i.pravatar.cc/300?img=32',
    courses: 3,
    students: 2750
  },
  {
    id: '3',
    name: 'Roberto González',
    role: 'Especialista en Ciberseguridad',
    bio: 'Consultor de seguridad informática certificado con experiencia en protección de sistemas bancarios.',
    image: 'https://i.pravatar.cc/300?img=52',
    courses: 2,
    students: 1950
  },
  {
    id: '4',
    name: 'Laura Martínez',
    role: 'UX/UI Designer',
    bio: 'Diseñadora de experiencia de usuario con un enfoque centrado en la accesibilidad y usabilidad.',
    image: 'https://i.pravatar.cc/300?img=45',
    courses: 3,
    students: 2340
  }
];

const InstructorsSection = () => {
  return (
    <section id="instructores" className="teklatam-section bg-white">
      <div className="teklatam-container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Nuestro Equipo Docente</h2>
          <p className="text-teklatam-gray-600 text-lg max-w-3xl mx-auto">
            Conoce a los profesionales de la industria que lideran nuestros programas formativos y comparten su experiencia real.
          </p>
        </div>
        
        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="teklatam-card overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                <p className="text-teklatam-orange font-medium text-sm mb-3">{instructor.role}</p>
                <p className="text-sm text-teklatam-gray-600 mb-4 line-clamp-3">{instructor.bio}</p>
                
                <div className="flex items-center justify-between text-sm text-teklatam-gray-500 pt-3 border-t border-teklatam-gray-200">
                  <span>{instructor.courses} Cursos</span>
                  <span>{instructor.students.toLocaleString()} Estudiantes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="teklatam-btn-outline inline-flex items-center">
            Ver todos los instructores
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
