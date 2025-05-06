
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ContactMessage } from "@/types";
import { dataService } from '@/services/dataService';
import { useToast } from "@/hooks/use-toast";
import { Mail, Trash, Check, X, Clock, Archive } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ContactsManager = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const loadedContacts = dataService.getContactMessages();
      // Sort by date (newest first)
      loadedContacts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setContacts(loadedContacts);
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes de contacto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setOpenDialog(true);
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      updateContactStatus(contact, 'read');
    }
  };

  const updateContactStatus = async (contact: ContactMessage, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      const updatedContact = { ...contact, status: newStatus };
      await dataService.updateContactMessage(updatedContact);
      
      // Update the local state
      setContacts(contacts.map(c => c.id === contact.id ? updatedContact : c));
      
      if (selectedContact && selectedContact.id === contact.id) {
        setSelectedContact(updatedContact);
      }
      
      toast({
        title: "Estado actualizado",
        description: `El mensaje ha sido marcado como ${getStatusLabel(newStatus)}`,
      });
    } catch (error) {
      console.error("Error al actualizar el estado del mensaje:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del mensaje",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.")) {
      try {
        await dataService.deleteContactMessage(id);
        setContacts(contacts.filter(contact => contact.id !== id));
        
        if (selectedContact && selectedContact.id === id) {
          setOpenDialog(false);
          setSelectedContact(null);
        }
        
        toast({
          title: "Mensaje eliminado",
          description: "El mensaje se ha eliminado correctamente",
        });
      } catch (error) {
        console.error("Error al eliminar el mensaje:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el mensaje",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'new': return 'Nuevo';
      case 'read': return 'Leído';
      case 'replied': return 'Respondido';
      case 'archived': return 'Archivado';
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new': return <Badge className="bg-blue-500">Nuevo</Badge>;
      case 'read': return <Badge variant="outline" className="text-teklatam-gray-600">Leído</Badge>;
      case 'replied': return <Badge className="bg-green-500">Respondido</Badge>;
      case 'archived': return <Badge variant="outline" className="text-teklatam-gray-600">Archivado</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'new': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'read': return <Check className="h-4 w-4 text-teklatam-gray-600" />;
      case 'replied': return <Check className="h-4 w-4 text-green-500" />;
      case 'archived': return <Archive className="h-4 w-4 text-teklatam-gray-600" />;
      default: return null;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    // Filter by tab
    const tabMatch = activeTab === 'all' || contact.status === activeTab;
    
    // Filter by search
    const searchMatch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return tabMatch && searchMatch;
  });

  const getTabCount = (status: 'all' | 'new' | 'read' | 'replied' | 'archived') => {
    if (status === 'all') return contacts.length;
    return contacts.filter(contact => contact.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Mensajes de Contacto</h2>
          <p className="text-teklatam-gray-600">Gestiona los mensajes recibidos a través del formulario de contacto.</p>
        </div>
        <Button 
          onClick={loadContacts} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <Clock className="h-4 w-4" /> Actualizar
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar por nombre, email o mensaje..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'all' | 'new' | 'read' | 'replied' | 'archived')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all" className="flex gap-2">
            Todos <span className="text-xs bg-teklatam-gray-200 rounded-full px-2 py-0.5">{getTabCount('all')}</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="flex gap-2">
            Nuevos <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">{getTabCount('new')}</span>
          </TabsTrigger>
          <TabsTrigger value="read" className="flex gap-2">
            Leídos <span className="text-xs bg-teklatam-gray-200 rounded-full px-2 py-0.5">{getTabCount('read')}</span>
          </TabsTrigger>
          <TabsTrigger value="replied" className="flex gap-2">
            Respondidos <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">{getTabCount('replied')}</span>
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex gap-2">
            Archivados <span className="text-xs bg-teklatam-gray-200 rounded-full px-2 py-0.5">{getTabCount('archived')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {loading ? (
            <div className="text-center py-8">
              <p>Cargando mensajes...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 border rounded-md">
              <p className="text-teklatam-gray-600">No hay mensajes para mostrar.</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${contact.status === 'new' ? 'font-medium bg-blue-50' : ''}`}
                      onClick={() => handleViewContact(contact)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(contact.status)}
                          <span className="ml-2">{getStatusBadge(contact.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.program || 'No especificado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(contact.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContact(contact.id);
                            }}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Dialog for viewing contact details */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalle del mensaje</DialogTitle>
            <DialogDescription>
              Mensaje recibido el {selectedContact ? new Date(selectedContact.date).toLocaleDateString() + ' a las ' + new Date(selectedContact.date).toLocaleTimeString() : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-teklatam-gray-500">Nombre</Label>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-teklatam-gray-500">Email</Label>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-teklatam-gray-500">Teléfono</Label>
                  <p className="font-medium">{selectedContact.phone || 'No especificado'}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-teklatam-gray-500">Programa de interés</Label>
                  <p className="font-medium">{selectedContact.program || 'No especificado'}</p>
                </div>
                
                <div className="sm:col-span-2">
                  <Label className="text-sm text-teklatam-gray-500">Estado actual</Label>
                  <p className="font-medium flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedContact.status)}
                    <span>{getStatusLabel(selectedContact.status)}</span>
                  </p>
                </div>
                
                <div className="sm:col-span-2">
                  <Label className="text-sm text-teklatam-gray-500">Mensaje</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => updateContactStatus(selectedContact, 'read')}
                  disabled={selectedContact.status === 'read'}
                >
                  <Check className="h-4 w-4" /> Marcar como leído
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => updateContactStatus(selectedContact, 'replied')}
                  disabled={selectedContact.status === 'replied'}
                >
                  <Mail className="h-4 w-4" /> Marcar como respondido
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => updateContactStatus(selectedContact, 'archived')}
                  disabled={selectedContact.status === 'archived'}
                >
                  <Archive className="h-4 w-4" /> Archivar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2 ml-auto"
                  onClick={() => {
                    handleDeleteContact(selectedContact.id);
                    setOpenDialog(false);
                  }}
                >
                  <Trash className="h-4 w-4" /> Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsManager;
