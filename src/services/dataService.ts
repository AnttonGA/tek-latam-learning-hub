// Tipos de datos para nuestra aplicación
import { ContactMessage, SiteContent, NewsItem } from '@/types';

export interface Program {
  id: string;
  title: string;
  instructor: string;
  level: string;
  students: number;
  description: string;
  image: string;
  category: 'curso' | 'diplomado' | 'maestria';
  duration?: string;
  schedule?: string;
  startDate?: string;
  detailedDescription?: string;
  learningObjectives?: string[];
  requirements?: string[];
  targetAudience?: string;
  modules?: ProgramModule[];
  faqs?: ProgramFAQ[];
}

export interface ProgramModule {
  title: string;
  content: string;
}

export interface ProgramFAQ {
  question: string;
  answer: string;
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
    category: "curso",
    duration: "6 meses",
    schedule: "Flexible, 8-10 horas por semana",
    startDate: "Próximo inicio: 15 de junio, 2025",
    detailedDescription: "Este programa está diseñado para proporcionar una formación completa que te permitirá desarrollarte profesionalmente en esta área, adquiriendo conocimientos prácticos y teóricos demandados por el mercado laboral actual.",
    learningObjectives: [
      "Dominio de las técnicas y herramientas fundamentales",
      "Aplicación práctica en proyectos reales",
      "Desarrollo de un portfolio profesional",
      "Acceso a una comunidad de expertos y estudiantes",
      "Mentoría personalizada durante todo el programa",
      "Certificación reconocida en la industria"
    ],
    requirements: [
      "Conocimientos básicos en el área (para niveles intermedio y avanzado)",
      "Computadora con acceso a internet",
      "Dedicación de 8-10 horas semanales"
    ],
    targetAudience: "Este programa está dirigido a profesionales que buscan especializarse, estudiantes que desean complementar su formación académica, y entusiastas que quieren iniciar una carrera en este campo.",
    modules: [
      {
        title: "Módulo 1: Fundamentos",
        content: "Introducción a los conceptos básicos de la materia. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: Desarrollo de habilidades",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Aplicación real",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      },
      {
        title: "Módulo 4: Especialización",
        content: "Profundización en áreas específicas y desarrollo de portfolio."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "Depende del nivel del programa. Los cursos de nivel principiante no requieren conocimientos previos, mientras que los intermedios y avanzados sí requieren una base."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
  },
  { 
    id: "2", 
    title: "Ciencia de Datos y Machine Learning", 
    instructor: "Ana María Valencia", 
    level: "Avanzado", 
    students: 2874,
    description: "Domina técnicas avanzadas de análisis de datos y algoritmos de aprendizaje automático.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "diplomado",
    duration: "8 meses",
    schedule: "Flexible, 10-12 horas por semana",
    startDate: "Próximo inicio: 1 de julio, 2025",
    modules: [
      {
        title: "Módulo 1: Fundamentos de Ciencias de Datos",
        content: "Introducción a los conceptos básicos del análisis de datos y estadísticas."
      },
      {
        title: "Módulo 2: Machine Learning",
        content: "Algoritmos de aprendizaje supervisado y no supervisado."
      }
    ],
    faqs: [
      {
        question: "¿Necesito saber programar?",
        answer: "Se recomienda tener conocimientos básicos de Python para aprovechar al máximo el curso."
      },
      {
        question: "¿Qué herramientas utilizaremos?",
        answer: "Trabajaremos con Python, Pandas, NumPy, Scikit-learn, TensorFlow, entre otras."
      }
    ]
  },
  { 
    id: "3", 
    title: "Fundamentos de Desarrollo Web", 
    instructor: "Juan Pérez", 
    level: "Principiante", 
    students: 5932,
    description: "Iníciate en el mundo del desarrollo web con HTML, CSS y JavaScript.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "curso",
    duration: "4 meses",
    schedule: "Flexible, 6-8 horas por semana",
    startDate: "Próximo inicio: 10 de agosto, 2025",
    detailedDescription: "Este programa te brindará una formación sólida en el desarrollo web, desde los fundamentos hasta la creación de aplicaciones web completas.",
    learningObjectives: [
      "Conocimientos básicos de HTML, CSS y JavaScript",
      "Práctica en proyectos reales",
      "Desarrollo de un portfolio profesional",
      "Acceso a una comunidad de expertos y estudiantes",
      "Mentoría personalizada durante todo el programa",
      "Certificación reconocida en la industria"
    ],
    requirements: [
      "Computadora con acceso a internet",
      "Dedicación de 6-8 horas semanales"
    ],
    targetAudience: "Este programa está dirigido a estudiantes que desean comenzar su carrera en desarrollo web, profesionales que buscan especializarse en este campo, y entusiastas que quieren iniciar una carrera en este campo.",
    modules: [
      {
        title: "Módulo 1: Fundamentos de HTML y CSS",
        content: "Introducción a los conceptos básicos de HTML y CSS. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: JavaScript",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Desarrollo de aplicaciones web",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "No, este programa es ideal para principiantes."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
  },
  { 
    id: "4", 
    title: "Ciberseguridad Aplicada", 
    instructor: "Gabriela Rojas", 
    level: "Intermedio", 
    students: 1853,
    description: "Aprende a proteger sistemas y redes contra amenazas informáticas.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "diplomado",
    duration: "10 meses",
    schedule: "Flexible, 12-14 horas por semana",
    startDate: "Próximo inicio: 1 de septiembre, 2025",
    detailedDescription: "Este programa te brindará una formación sólida en la ciberseguridad, desde los fundamentos hasta la implementación de soluciones de seguridad avanzadas.",
    learningObjectives: [
      "Conocimientos básicos de ciberseguridad",
      "Práctica en proyectos reales",
      "Desarrollo de un portfolio profesional",
      "Acceso a una comunidad de expertos y estudiantes",
      "Mentoría personalizada durante todo el programa",
      "Certificación reconocida en la industria"
    ],
    requirements: [
      "Computadora con acceso a internet",
      "Dedicación de 12-14 horas semanales"
    ],
    targetAudience: "Este programa está dirigido a profesionales que buscan especializarse en ciberseguridad, estudiantes que desean complementar su formación académica, y entusiastas que quieren iniciar una carrera en este campo.",
    modules: [
      {
        title: "Módulo 1: Fundamentos de ciberseguridad",
        content: "Introducción a los conceptos básicos de ciberseguridad. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: Implementación de soluciones de seguridad",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Desarrollo de aplicaciones de seguridad",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "No, este programa es ideal para profesionales con experiencia en ciberseguridad."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
  },
  { 
    id: "5", 
    title: "Maestría en Inteligencia Artificial", 
    instructor: "Roberto González", 
    level: "Avanzado", 
    students: 1245,
    description: "Programa de maestría especializado en las últimas técnicas y aplicaciones de la IA.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    category: "maestria",
    duration: "24 meses",
    schedule: "Flexible, 16-18 horas por semana",
    startDate: "Próximo inicio: 1 de octubre, 2025",
    detailedDescription: "Este programa te brindará una formación sólida en la inteligencia artificial, desde los fundamentos hasta la implementación de soluciones avanzadas.",
    learningObjectives: [
      "Conocimientos avanzados en inteligencia artificial",
      "Práctica en proyectos reales",
      "Desarrollo de un portfolio profesional",
      "Acceso a una comunidad de expertos y estudiantes",
      "Mentoría personalizada durante todo el programa",
      "Certificación reconocida en la industria"
    ],
    requirements: [
      "Computadora con acceso a internet",
      "Dedicación de 16-18 horas semanales"
    ],
    targetAudience: "Este programa está dirigido a profesionales que buscan especializarse en inteligencia artificial, estudiantes que desean complementar su formación académica, y entusiastas que quieren iniciar una carrera en este campo.",
    modules: [
      {
        title: "Módulo 1: Fundamentos de inteligencia artificial",
        content: "Introducción a los conceptos básicos de inteligencia artificial. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: Implementación de algoritmos de aprendizaje",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Desarrollo de soluciones avanzadas",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "No, este programa es ideal para profesionales con experiencia en inteligencia artificial."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
  },
  { 
    id: "6", 
    title: "Maestría en Gestión de Proyectos Tecnológicos", 
    instructor: "Laura Martínez", 
    level: "Avanzado", 
    students: 987,
    description: "Aprende metodologías ágiles y tradicionales para liderar proyectos tecnológicos exitosos.",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83",
    category: "maestria",
    duration: "24 meses",
    schedule: "Flexible, 16-18 horas por semana",
    startDate: "Próximo inicio: 1 de octubre, 2025",
    detailedDescription: "Este programa te brindará una formación sólida en la gestión de proyectos tecnológicos, desde los fundamentos hasta la implementación de soluciones avanzadas.",
    learningObjectives: [
      "Conocimientos avanzados en gestión de proyectos tecnológicos",
      "Práctica en proyectos reales",
      "Desarrollo de un portfolio profesional",
      "Acceso a una comunidad de expertos y estudiantes",
      "Mentoría personalizada durante todo el programa",
      "Certificación reconocida en la industria"
    ],
    requirements: [
      "Computadora con acceso a internet",
      "Dedicación de 16-18 horas semanales"
    ],
    targetAudience: "Este programa está dirigido a profesionales que buscan especializarse en gestión de proyectos tecnológicos, estudiantes que desean complementar su formación académica, y entusiastas que quieren iniciar una carrera en este campo.",
    modules: [
      {
        title: "Módulo 1: Fundamentos de gestión de proyectos tecnológicos",
        content: "Introducción a los conceptos básicos de gestión de proyectos tecnológicos. Teoría y práctica inicial."
      },
      {
        title: "Módulo 2: Implementación de metodologías ágiles",
        content: "Implementación de los conceptos aprendidos en ejercicios prácticos."
      },
      {
        title: "Módulo 3: Desarrollo de soluciones avanzadas",
        content: "Desarrollo de proyectos con aplicación en escenarios reales."
      }
    ],
    faqs: [
      {
        question: "¿Necesito conocimientos previos?",
        answer: "No, este programa es ideal para profesionales con experiencia en gestión de proyectos tecnológicos."
      },
      {
        question: "¿Cómo son las clases?",
        answer: "Las clases combinan teoría con práctica. Incluyen videos explicativos, material de lectura, ejercicios prácticos y proyectos reales."
      },
      {
        question: "¿Recibo alguna certificación?",
        answer: "Sí, al finalizar el programa recibirás un certificado digital que acredita tu participación y aprendizaje."
      },
      {
        question: "¿Hay soporte durante el curso?",
        answer: "Contamos con un equipo de mentores que te apoyarán durante todo el proceso de aprendizaje, respondiendo dudas y brindando retroalimentación."
      }
    ]
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
  heroTitle: 'Formación especializada para el sector tecnológico en Latinoamérica',
  heroDescription: 'Programa de alta calidad para desarrolladores y profesionales IT que quieren especializarse y avanzar en su carrera profesional',
  heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  heroSlides: [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      title: 'Formación tecnológica especializada',
      subtitle: 'Aprende con expertos del sector y obtén certificaciones reconocidas a nivel internacional',
      buttonText: 'Ver Programas',
      buttonLink: '#programas'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      title: 'Impulsa tu carrera profesional',
      subtitle: 'Programas diseñados para las demandas actuales del mercado tecnológico en Latinoamérica',
      buttonText: 'Conoce Más',
      buttonLink: '#nosotros'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      title: 'Aprendizaje flexible y práctico',
      subtitle: 'Metodología que combina teoría y práctica con horarios compatibles con tu vida profesional',
      buttonText: 'Contactar',
      buttonLink: '#contacto'
    }
  ],
  ctaTitle: 'Transforma tu futuro profesional',
  ctaDescription: 'Únete a nuestra comunidad de estudiantes y profesionales que están cambiando el panorama tecnológico en Latinoamérica.'
};

// Datos por defecto para noticias
const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Nueva Maestría en Inteligencia Artificial disponible",
    excerpt: "Lanzamos nuestro programa más avanzado en IA con enfoque en aplicaciones empresariales y machine learning.",
    content: "Estamos emocionados de anunciar el lanzamiento de nuestra nueva Maestría en Inteligencia Artificial, un programa de 24 meses diseñado para profesionales que buscan liderar la transformación digital en sus organizaciones...",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    author: "Equipo TekLatam",
    publishedAt: new Date().toISOString(),
    category: "anuncios",
    featured: true,
    status: "published",
    tags: ["inteligencia artificial", "maestría", "nuevo programa"]
  },
  {
    id: "2", 
    title: "Webinar gratuito: Tendencias en Ciberseguridad 2025",
    excerpt: "Únete a nuestro webinar gratuito donde expertos analizan las principales amenazas y tecnologías de seguridad.",
    content: "El próximo 25 de junio realizaremos un webinar gratuito sobre las tendencias más importantes en ciberseguridad para 2025. Nuestros expertos compartirán insights sobre las nuevas amenazas y las tecnologías emergentes...",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    author: "Gabriela Rojas",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: "eventos",
    featured: false,
    status: "published",
    tags: ["webinar", "ciberseguridad", "gratuito"]
  },
  {
    id: "3",
    title: "Actualización de plataforma: Nuevas funcionalidades",
    excerpt: "Hemos mejorado nuestra plataforma de aprendizaje con nuevas herramientas interactivas y mejor experiencia de usuario.",
    content: "Como parte de nuestro compromiso con la excelencia educativa, hemos implementado importantes mejoras en nuestra plataforma de aprendizaje...",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    author: "Equipo Técnico",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "actualizaciones",
    featured: false,
    status: "published",
    tags: ["plataforma", "mejoras", "funcionalidades"]
  }
];

// Funciones para obtener los datos
const getPrograms = (): Program[] => {
  try {
    const storedData = localStorage.getItem('teklatam_programs');
    if (storedData) {
      return JSON.parse(storedData);
    }
    // Si no hay datos guardados, guardar los datos por defecto
    localStorage.setItem('teklatam_programs', JSON.stringify(defaultPrograms));
    return defaultPrograms;
  } catch (error) {
    console.error("Error loading programs data:", error);
    return defaultPrograms;
  }
};

const getInstructors = (): Instructor[] => {
  try {
    const storedData = localStorage.getItem('teklatam_instructors');
    if (storedData) {
      return JSON.parse(storedData);
    }
    localStorage.setItem('teklatam_instructors', JSON.stringify(defaultInstructors));
    return defaultInstructors;
  } catch (error) {
    console.error("Error loading instructors data:", error);
    return defaultInstructors;
  }
};

const getTestimonials = (): Testimonial[] => {
  try {
    const storedData = localStorage.getItem('teklatam_testimonials');
    if (storedData) {
      return JSON.parse(storedData);
    }
    localStorage.setItem('teklatam_testimonials', JSON.stringify(defaultTestimonials));
    return defaultTestimonials;
  } catch (error) {
    console.error("Error loading testimonials data:", error);
    return defaultTestimonials;
  }
};

const getSiteContent = (): SiteContent => {
  try {
    const storedContent = localStorage.getItem('siteContent');
    if (storedContent) {
      return JSON.parse(storedContent);
    } else {
      // Contenido por defecto
      const defaultContent: SiteContent = {
        heroTitle: 'Formación especializada para el sector tecnológico en Latinoamérica',
        heroDescription: 'Programa de alta calidad para desarrolladores y profesionales IT que quieren especializarse y avanzar en su carrera profesional',
        heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        heroSlides: [
          {
            id: '1',
            imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
            title: 'Formación tecnológica especializada',
            subtitle: 'Aprende con expertos del sector y obtén certificaciones reconocidas a nivel internacional',
            buttonText: 'Ver Programas',
            buttonLink: '#programas'
          },
          {
            id: '2',
            imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            title: 'Impulsa tu carrera profesional',
            subtitle: 'Programas diseñados para las demandas actuales del mercado tecnológico en Latinoamérica',
            buttonText: 'Conoce Más',
            buttonLink: '#nosotros'
          },
          {
            id: '3',
            imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
            title: 'Aprendizaje flexible y práctico',
            subtitle: 'Metodología que combina teoría y práctica con horarios compatibles con tu vida profesional',
            buttonText: 'Contactar',
            buttonLink: '#contacto'
          }
        ],
        ctaTitle: 'Transforma tu futuro profesional',
        ctaDescription: 'Únete a nuestra comunidad de estudiantes y profesionales que están cambiando el panorama tecnológico en Latinoamérica.'
      };
      return defaultContent;
    }
  } catch (error) {
    console.error("Error al cargar el contenido del sitio:", error);
    throw error;
  }
};

// Funciones para guardar datos
const savePrograms = (programs: Program[]): void => {
  try {
    localStorage.setItem('teklatam_programs', JSON.stringify(programs));
    // Disparar un evento para notificar cambios
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("Error saving programs:", error);
  }
};

const saveInstructors = (instructors: Instructor[]): void => {
  try {
    localStorage.setItem('teklatam_instructors', JSON.stringify(instructors));
    // Disparar un evento para notificar cambios
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("Error saving instructors:", error);
  }
};

const saveTestimonials = (testimonials: Testimonial[]): void => {
  try {
    localStorage.setItem('teklatam_testimonials', JSON.stringify(testimonials));
    // Disparar un evento para notificar cambios
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("Error saving testimonials:", error);
  }
};

const saveSiteContent = (content: SiteContent): void => {
  localStorage.setItem('siteContent', JSON.stringify(content));
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
  try {
    const instructors = getInstructors();
    const newInstructor = {
      ...instructor,
      id: Date.now().toString()
    };
    instructors.push(newInstructor);
    saveInstructors(instructors);
    console.log("Instructor added successfully:", newInstructor);
    return newInstructor;
  } catch (error) {
    console.error("Error adding instructor:", error);
    throw new Error("Failed to add instructor");
  }
};

const updateInstructor = (instructor: Instructor): Instructor => {
  try {
    const instructors = getInstructors();
    const index = instructors.findIndex(i => i.id === instructor.id);
    if (index !== -1) {
      instructors[index] = instructor;
      saveInstructors(instructors);
      console.log("Instructor updated successfully:", instructor);
    } else {
      console.warn("Instructor not found:", instructor.id);
    }
    return instructor;
  } catch (error) {
    console.error("Error updating instructor:", error);
    throw new Error("Failed to update instructor");
  }
};

const deleteInstructor = (id: string): boolean => {
  try {
    const instructors = getInstructors();
    const filteredInstructors = instructors.filter(i => i.id !== id);
    if (filteredInstructors.length < instructors.length) {
      saveInstructors(filteredInstructors);
      console.log("Instructor deleted successfully:", id);
      return true;
    }
    console.warn("Instructor not found for deletion:", id);
    return false;
  } catch (error) {
    console.error("Error deleting instructor:", error);
    return false;
  }
};

// Testimonials
const addTestimonial = (testimonial: Omit<Testimonial, "id">): Testimonial => {
  try {
    const testimonials = getTestimonials();
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString()
    };
    testimonials.push(newTestimonial);
    saveTestimonials(testimonials);
    console.log("Testimonial added successfully:", newTestimonial);
    return newTestimonial;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw new Error("Failed to add testimonial");
  }
};

const updateTestimonial = (testimonial: Testimonial): Testimonial => {
  try {
    const testimonials = getTestimonials();
    const index = testimonials.findIndex(t => t.id === testimonial.id);
    if (index !== -1) {
      testimonials[index] = testimonial;
      saveTestimonials(testimonials);
      console.log("Testimonial updated successfully:", testimonial);
    } else {
      console.warn("Testimonial not found:", testimonial.id);
    }
    return testimonial;
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw new Error("Failed to update testimonial");
  }
};

const deleteTestimonial = (id: string): boolean => {
  try {
    const testimonials = getTestimonials();
    const filteredTestimonials = testimonials.filter(t => t.id !== id);
    if (filteredTestimonials.length < testimonials.length) {
      saveTestimonials(filteredTestimonials);
      console.log("Testimonial deleted successfully:", id);
      return true;
    }
    console.warn("Testimonial not found for deletion:", id);
    return false;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
};

// Función para obtener noticias
const getNews = (): NewsItem[] => {
  try {
    const storedData = localStorage.getItem('teklatam_news');
    if (storedData) {
      return JSON.parse(storedData);
    }
    localStorage.setItem('teklatam_news', JSON.stringify(defaultNews));
    return defaultNews;
  } catch (error) {
    console.error("Error loading news data:", error);
    return defaultNews;
  }
};

// Función para guardar noticias
const saveNews = (news: NewsItem[]): void => {
  try {
    localStorage.setItem('teklatam_news', JSON.stringify(news));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("Error saving news:", error);
  }
};

// CRUD para noticias
const addNewsItem = (newsItem: Omit<NewsItem, "id">): NewsItem => {
  try {
    const news = getNews();
    const newNewsItem = {
      ...newsItem,
      id: Date.now().toString()
    };
    news.push(newNewsItem);
    saveNews(news);
    console.log("News item added successfully:", newNewsItem);
    return newNewsItem;
  } catch (error) {
    console.error("Error adding news item:", error);
    throw new Error("Failed to add news item");
  }
};

const updateNewsItem = (newsItem: NewsItem): NewsItem => {
  try {
    const news = getNews();
    const index = news.findIndex(n => n.id === newsItem.id);
    if (index !== -1) {
      news[index] = newsItem;
      saveNews(news);
      console.log("News item updated successfully:", newsItem);
    } else {
      console.warn("News item not found:", newsItem.id);
    }
    return newsItem;
  } catch (error) {
    console.error("Error updating news item:", error);
    throw new Error("Failed to update news item");
  }
};

const deleteNewsItem = (id: string): boolean => {
  try {
    const news = getNews();
    const filteredNews = news.filter(n => n.id !== id);
    if (filteredNews.length < news.length) {
      saveNews(filteredNews);
      console.log("News item deleted successfully:", id);
      return true;
    }
    console.warn("News item not found for deletion:", id);
    return false;
  } catch (error) {
    console.error("Error deleting news item:", error);
    return false;
  }
};

// Estadísticas para el dashboard
const getStats = () => {
  const programs = getPrograms();
  const instructors = getInstructors();
  const testimonials = getTestimonials();
  const news = getNews();
  
  // Calcula el total de estudiantes sumando los estudiantes de todos los programas
  const totalStudents = programs.reduce((sum, program) => sum + program.students, 0);
  
  return {
    totalPrograms: programs.length,
    totalInstructors: instructors.length,
    totalTestimonials: testimonials.length,
    totalNews: news.length,
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
  getNews,
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
  
  // CRUD para noticias
  addNewsItem,
  updateNewsItem,
  deleteNewsItem,
  
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
