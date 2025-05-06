// Tipos de datos para nuestra aplicación
import { ContactMessage } from '@/types';

export interface Program {
  id: string;
  title: string;
  instructor: string;
  level: string;
  students: number;
  description: string;
  image: string;
  category: 'curso' | 'diplomado' | 'maestria'; // Nueva propiedad para categorizar los programas
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

export interface SiteContent {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  ctaTitle: string;
  ctaDescription: string;
}

// Datos iniciales por defecto
const defaultPrograms: Program[] = [
  { 
    id: "1", 
    title: "Desarrollo Full Stack con MERN", 
    instructor: "Carlos Mendoza", 
    level: "Intermedio", 
    students: 3420,
    description: "Aprende a desarrollar aplicaciones web completas utilizando MongoDB, Express, React y Node.js.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "curso"
  },
  { 
    id: "2", 
    title: "Ciencia de Datos y Machine Learning", 
    instructor: "Ana María Valencia", 
    level: "Avanzado", 
    students: 2874,
    description: "Domina técnicas avanzadas de análisis de datos y algoritmos de aprendizaje automático.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "diplomado"
  },
  { 
    id: "3", 
    title: "Fundamentos de Desarrollo Web", 
    instructor: "Juan Pérez", 
    level: "Principiante", 
    students: 5932,
    description: "Iníciate en el mundo del desarrollo web con HTML, CSS y JavaScript.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "curso"
  },
  { 
    id: "4", 
    title: "Ciberseguridad Aplicada", 
    instructor: "Gabriela Rojas", 
    level: "Intermedio", 
    students: 1853,
    description: "Aprende a proteger sistemas y redes contra amenazas informáticas.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "diplomado"
  },
  { 
    id: "5", 
    title: "Maestría en Inteligencia Artificial", 
    instructor: "Roberto González", 
    level: "Avanzado", 
    students: 1245,
    description: "Programa de maestría especializado en las últimas técnicas y aplicaciones de la IA.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    category: "maestria"
  },
  { 
    id: "6", 
    title: "Maestría en Gestión de Proyectos Tecnológicos", 
    instructor: "Laura Martínez", 
    level: "Avanzado", 
    students: 987,
    description: "Aprende metodologías ágiles y tradicionales para liderar proyectos tecnológicos exitosos.",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83",
    category: "maestria"
  }
];

const defaultInstructors: Instructor[] = [
  { 
    id: "1", 
    name: "Carlos Mendoza", 
    role: "Desarrollador Full Stack", 
    image: "https://i.pravatar.cc/300?img=60",
    bio: "Desarrollador con más de 10 años de experiencia en tecnologías web y móviles. Especialista en arquitecturas MERN y JAMstack."
  },
  { 
    id: "2", 
    name: "Ana María Valencia", 
    role: "Data Scientist", 
    image: "https://i.pravatar.cc/300?img=32",
    bio: "PhD en Ciencias Computacionales con enfoque en Machine Learning e Inteligencia Artificial. Investigadora y consultora para empresas Fortune 500."
  },
  { 
    id: "3", 
    name: "Roberto González", 
    role: "Especialista en Ciberseguridad", 
    image: "https://i.pravatar.cc/300?img=52",
    bio: "Experto en seguridad informática con certificaciones CISSP y CEH. Experiencia en auditorías de seguridad y respuesta a incidentes."
  },
  { 
    id: "4", 
    name: "Laura Martínez", 
    role: "UX/UI Designer", 
    image: "https://i.pravatar.cc/300?img=45",
    bio: "Diseñadora de experiencia de usuario con enfoque en accesibilidad e interfaces intuitivas. Especializada en Design Thinking y metodologías ágiles."
  }
];

const defaultTestimonials: Testimonial[] = [
  { 
    id: "1", 
    name: "Alejandra Vargas", 
    role: "Front-end Developer", 
    company: "Globant",
    text: "Los cursos de TekLatam transformaron mi carrera. En menos de 6 meses, pasé de principiante a conseguir un trabajo como desarrolladora frontend en una empresa reconocida.",
    image: "https://i.pravatar.cc/300?img=5"
  },
  { 
    id: "2", 
    name: "Ricardo Montero", 
    role: "Data Scientist", 
    company: "Mercado Libre",
    text: "La formación en ciencia de datos me dio las herramientas que necesitaba para hacer la transición desde mi antiguo trabajo. El enfoque práctico y el apoyo de los instructores fueron excepcionales.",
    image: "https://i.pravatar.cc/300?img=12"
  },
  { 
    id: "3", 
    name: "Camila Rodriguez", 
    role: "UX/UI Designer", 
    company: "Rappi",
    text: "Como diseñadora, encontré exactamente lo que necesitaba para complementar mis habilidades con conocimientos técnicos. Los proyectos prácticos me ayudaron a construir un portafolio sólido.",
    image: "https://i.pravatar.cc/300?img=25"
  },
  { 
    id: "4", 
    name: "Miguel Ángel Torres", 
    role: "Security Analyst", 
    company: "BBVA",
    text: "El programa de ciberseguridad está al día con las amenazas más recientes. Los laboratorios prácticos y simulaciones me prepararon perfectamente para mi rol actual en el sector financiero.",
    image: "https://i.pravatar.cc/300?img=20"
  }
];

const defaultSiteContent: SiteContent = {
  heroTitle: "Formación tecnológica de clase mundial para Latinoamérica",
  heroDescription: "Programas de especialización diseñados por expertos de la industria para formar los profesionales tecnológicos que la región necesita.",
  heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  ctaTitle: "Transforma tu futuro con las habilidades más demandadas",
  ctaDescription: "Avanza tu carrera profesional con programas formativos diseñados para el mercado latinoamericano."
};

// Funciones para obtener los datos
const getPrograms = (): Program[] => {
  const storedData = localStorage.getItem('teklatam_programs');
  if (storedData) {
    return JSON.parse(storedData);
  }
  // Si no hay datos guardados, guardar los datos por defecto
  localStorage.setItem('teklatam_programs', JSON.stringify(defaultPrograms));
  return defaultPrograms;
};

const getInstructors = (): Instructor[] => {
  const storedData = localStorage.getItem('teklatam_instructors');
  if (storedData) {
    return JSON.parse(storedData);
  }
  localStorage.setItem('teklatam_instructors', JSON.stringify(defaultInstructors));
  return defaultInstructors;
};

const getTestimonials = (): Testimonial[] => {
  const storedData = localStorage.getItem('teklatam_testimonials');
  if (storedData) {
    return JSON.parse(storedData);
  }
  localStorage.setItem('teklatam_testimonials', JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
};

const getSiteContent = (): SiteContent => {
  const storedData = localStorage.getItem('teklatam_site_content');
  if (storedData) {
    return JSON.parse(storedData);
  }
  localStorage.setItem('teklatam_site_content', JSON.stringify(defaultSiteContent));
  return defaultSiteContent;
};

// Funciones para guardar datos
const savePrograms = (programs: Program[]): void => {
  localStorage.setItem('teklatam_programs', JSON.stringify(programs));
};

const saveInstructors = (instructors: Instructor[]): void => {
  localStorage.setItem('teklatam_instructors', JSON.stringify(instructors));
};

const saveTestimonials = (testimonials: Testimonial[]): void => {
  localStorage.setItem('teklatam_testimonials', JSON.stringify(testimonials));
};

const saveSiteContent = (content: SiteContent): void => {
  localStorage.setItem('teklatam_site_content', JSON.stringify(content));
};

// Funciones para gestionar datos (CRUD)
// Programs
const addProgram = (program: Omit<Program, "id">): Program => {
  const programs = getPrograms();
  const newProgram = {
    ...program,
    id: Date.now().toString()
  };
  programs.push(newProgram);
  savePrograms(programs);
  return newProgram;
};

const updateProgram = (program: Program): Program => {
  const programs = getPrograms();
  const index = programs.findIndex(p => p.id === program.id);
  if (index !== -1) {
    programs[index] = program;
    savePrograms(programs);
  }
  return program;
};

const deleteProgram = (id: string): boolean => {
  const programs = getPrograms();
  const filteredPrograms = programs.filter(p => p.id !== id);
  if (filteredPrograms.length < programs.length) {
    savePrograms(filteredPrograms);
    return true;
  }
  return false;
};

// Instructors
const addInstructor = (instructor: Omit<Instructor, "id">): Instructor => {
  const instructors = getInstructors();
  const newInstructor = {
    ...instructor,
    id: Date.now().toString()
  };
  instructors.push(newInstructor);
  saveInstructors(instructors);
  return newInstructor;
};

const updateInstructor = (instructor: Instructor): Instructor => {
  const instructors = getInstructors();
  const index = instructors.findIndex(i => i.id === instructor.id);
  if (index !== -1) {
    instructors[index] = instructor;
    saveInstructors(instructors);
  }
  return instructor;
};

const deleteInstructor = (id: string): boolean => {
  const instructors = getInstructors();
  const filteredInstructors = instructors.filter(i => i.id !== id);
  if (filteredInstructors.length < instructors.length) {
    saveInstructors(filteredInstructors);
    return true;
  }
  return false;
};

// Testimonials
const addTestimonial = (testimonial: Omit<Testimonial, "id">): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial = {
    ...testimonial,
    id: Date.now().toString()
  };
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
};

const updateTestimonial = (testimonial: Testimonial): Testimonial => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === testimonial.id);
  if (index !== -1) {
    testimonials[index] = testimonial;
    saveTestimonials(testimonials);
  }
  return testimonial;
};

const deleteTestimonial = (id: string): boolean => {
  const testimonials = getTestimonials();
  const filteredTestimonials = testimonials.filter(t => t.id !== id);
  if (filteredTestimonials.length < testimonials.length) {
    saveTestimonials(filteredTestimonials);
    return true;
  }
  return false;
};

// Estadísticas para el dashboard
const getStats = () => {
  const programs = getPrograms();
  const instructors = getInstructors();
  const testimonials = getTestimonials();
  
  // Calcula el total de estudiantes sumando los estudiantes de todos los programas
  const totalStudents = programs.reduce((sum, program) => sum + program.students, 0);
  
  return {
    totalPrograms: programs.length,
    totalInstructors: instructors.length,
    totalTestimonials: testimonials.length,
    totalStudents,
    recentActivity: generateRecentActivity() // Función auxiliar para generar actividad reciente
  };
};

// Función para generar actividad reciente simulada
const generateRecentActivity = () => {
  const activities = [
    "Nuevo programa creado: Desarrollo de Aplicaciones Móviles",
    "Instructor actualizado: Carlos Mendoza",
    "Testimonio añadido: Miguel Torres",
    "Contenido modificado: Sección Hero",
    "Programa actualizado: Ciberseguridad Aplicada",
    "Nueva imagen subida para el programa de Ciencia de Datos",
    "Instructor eliminado: Laura Castillo",
    "Nuevas estadísticas de estudiantes actualizadas"
  ];
  
  // Devuelve actividades con timestamps aleatorios recientes
  return activities.map((activity, index) => ({
    id: index.toString(),
    description: activity,
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() // Dentro de las últimas 24 horas
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Ordena por más reciente
};

// Get contact messages from localStorage
export const getContactMessages = (): ContactMessage[] => {
  try {
    const storedMessages = localStorage.getItem('contactMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  } catch (error) {
    console.error('Error loading contact messages:', error);
    return [];
  }
};

// Save a new contact message
export const saveContactMessage = (message: ContactMessage): void => {
  try {
    const messages = getContactMessages();
    messages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw new Error('Failed to save contact message');
  }
};

// Update an existing contact message
export const updateContactMessage = (updatedMessage: ContactMessage): void => {
  try {
    const messages = getContactMessages();
    const index = messages.findIndex(message => message.id === updatedMessage.id);
    if (index !== -1) {
      messages[index] = updatedMessage;
      localStorage.setItem('contactMessages', JSON.stringify(messages));
    } else {
      throw new Error('Message not found');
    }
  } catch (error) {
    console.error('Error updating contact message:', error);
    throw new Error('Failed to update contact message');
  }
};

// Delete a contact message
export const deleteContactMessage = (id: string): void => {
  try {
    const messages = getContactMessages();
    const filtered = messages.filter(message => message.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw new Error('Failed to delete contact message');
  }
};

// Exportar todas las funciones
export const dataService = {
  // Getters
  getPrograms,
  getInstructors,
  getTestimonials,
  getSiteContent,
  getStats,
  
  // CRUD para programas
  addProgram,
  updateProgram,
  deleteProgram,
  
  // CRUD para instructores
  addInstructor,
  updateInstructor,
  deleteInstructor,
  
  // CRUD para testimonios
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  
  // Actualizar contenido del sitio
  saveSiteContent,
  
  // Get contact messages
  getContactMessages,
  
  // Save a new contact message
  saveContactMessage,
  
  // Update an existing contact message
  updateContactMessage,
  
  // Delete a contact message
  deleteContactMessage
};
