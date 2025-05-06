
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  program: string;
  date: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}
