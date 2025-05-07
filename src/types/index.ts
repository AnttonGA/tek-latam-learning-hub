
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  level: string;
  duration: string;
  modules: Module[];
  price: number;
  discount: number;
  rating: number;
  reviews: number;
  students: number;
  category: string;
  tags: string[];
  requirements: string[];
  objectives: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  social: Social[];
}

export interface Social {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

// Update ContactMessage interface to include all needed properties
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
  program?: string;
  date: string;  // Changed from createdAt: Date to match how it's used
  status: 'new' | 'read' | 'replied' | 'archived'; // Added 'archived' status
}

// Actualizamos SiteContent para incluir heroSlides
export interface SiteContent {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroSlides: HeroSlide[]; // Nuevo array de slides para el carrusel
  ctaTitle: string;
  ctaDescription: string;
}
