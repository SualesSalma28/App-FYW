import { useState } from 'react';
import { Search, MapPin, Star, Award, MessageCircle, Plus, Edit, Eye, Trash2, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreateServiceOffer } from './CreateServiceOffer';
import logo from 'figma:asset/d21f49871341f03b8bc983b90e4c69aa87422bbd.png';

interface ServiceOffersProps {
  userType: 'client' | 'worker';
}

// Ofertas recibidas por el cliente de trabajadores
const receivedOffers = [
  {
    id: 1,
    jobTitle: 'Reparación de tubería en cocina',
    workerName: 'Carlos Ramírez',
    workerInitials: 'CR',
    workerTitle: 'Plomero Profesional',
    rating: 4.8,
    experience: '10 años',
    proposal: 'Puedo resolver la fuga el mismo día. Tengo todas las herramientas necesarias y experiencia en reparaciones de emergencia.',
    proposedBudget: '$600',
    estimatedTime: '3-4 horas',
    receivedDate: '1 día',
    status: 'pending' as const,
    phone: '55-1234-5678',
    portfolio: [
      {
        id: 1,
        title: 'Instalación sistema completo',
        image: 'https://images.unsplash.com/photo-1650246363606-a2402ec42b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29yayUyMHBpcGVzfGVufDF8fHx8MTc2MjQ2MTg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: 2,
    jobTitle: 'Reparación de tubería en cocina',
    workerName: 'Juan Pérez',
    workerInitials: 'JP',
    workerTitle: 'Plomero Certificado',
    rating: 4.6,
    experience: '8 años',
    proposal: 'Trabajo rápido y garantizado. Puedo ir mañana temprano con todos los materiales.',
    proposedBudget: '$700',
    estimatedTime: '4-5 horas',
    receivedDate: '2 días',
    status: 'pending' as const,
    phone: '55-9876-5432',
    portfolio: [],
  },
  {
    id: 3,
    jobTitle: 'Pintar departamento',
    workerName: 'José Hernández',
    workerInitials: 'JH',
    workerTitle: 'Pintor Profesional',
    rating: 4.7,
    experience: '12 años',
    proposal: 'Especialista en interiores. Trabajo limpio y profesional con acabados finos. Incluyo preparación de superficies.',
    proposedBudget: '$2,800',
    estimatedTime: '3-4 días',
    receivedDate: '3 días',
    status: 'accepted' as const,
    phone: '55-4567-8901',
    portfolio: [
      {
        id: 1,
        title: 'Pintura departamento completo',
        image: 'https://images.unsplash.com/photo-1629941633816-a1d688cb2d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwcGFpbnRpbmclMjB3YWxsfGVufDF8fHx8MTc2MjQxNDMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    id: 4,
    jobTitle: 'Pintar departamento',
    workerName: 'Roberto Silva',
    workerInitials: 'RS',
    workerTitle: 'Pintor',
    rating: 4.5,
    experience: '9 años',
    proposal: 'Puedo empezar la próxima semana. Incluyo materiales de primera calidad.',
    proposedBudget: '$3,000',
    estimatedTime: '4 días',
    receivedDate: '4 días',
    status: 'rejected' as const,
    phone: '55-2345-6789',
    portfolio: [],
  },
];

// Servicios del carpintero (ejemplo para trabajador)
const myServices = [
  {
    id: 1,
    title: 'Muebles a medida',
    description: 'Diseño y fabricación de muebles personalizados en madera fina. Closets, libreros, mesas, sillas.',
    rate: '$350/hora',
    views: 124,
    inquiries: 18,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmUlMjB3b29kfGVufDF8fHx8MTc2MjQzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Reparación de muebles',
    description: 'Restauración y reparación de muebles de madera. Barnizado, pulido y acabados.',
    rate: '$200/hora',
    views: 89,
    inquiries: 12,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcmVwYWlyJTIwZnVybml0dXJlfGVufDF8fHx8MTc2MjQzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Instalación de pisos de madera',
    description: 'Instalación profesional de pisos laminados y de madera sólida.',
    rate: '$180/m²',
    views: 56,
    inquiries: 8,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZmxvb3IlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzYyNDMzNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Acabados en madera decorativos',
    description: 'Paneles decorativos, revestimientos y detalles en madera para interiores.',
    rate: '$280/hora',
    views: 42,
    inquiries: 5,
    status: 'paused' as const,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwd2FsbCUyMHBhbmVsc3xlbnwxfHx8fDE3NjI0MzM2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ServiceOffers({ userType }: ServiceOffersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<typeof receivedOffers[0] | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleAcceptOffer = (offerId: number) => {
    toast.success('¡Oferta aceptada! El trabajador será notificado.');
    setSelectedOffer(null);
  };

  const handleRejectOffer = (offerId: number) => {
    toast.info('Oferta rechazada.');
    setSelectedOffer(null);
  };

  const handleDeleteService = (serviceId: number) => {
    toast.success('Servicio eliminado correctamente');
  };

  const filteredOffers = receivedOffers.filter((offer) => {
    const matchesSearch = offer.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.workerTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredMyServices = myServices.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Vista para clientes - ofertas recibidas de trabajadores
  if (userType === 'client') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-2xl p-3">
              <img 
                src={logo} 
                alt="Find Your Work" 
                className="w-32 h-auto"
              />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar ofertas recibidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Info Header */}
        <div className="px-4 pt-4 mb-4">
          <h2 className="mb-1">Ofertas Recibidas</h2>
          <p className="text-sm text-gray-600">Propuestas de trabajadores para tus solicitudes</p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="px-4">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              Todas ({receivedOffers.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Pendientes ({receivedOffers.filter(o => o.status === 'pending').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Offers List */}
        <div className="px-4 pb-4 space-y-3">
          {filteredOffers.map((offer) => (
            <Card 
              key={offer.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedOffer(offer)}
            >
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Para: {offer.jobTitle}</p>
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {offer.workerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3>{offer.workerName}</h3>
                      {offer.status === 'accepted' && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aceptada
                        </Badge>
                      )}
                      {offer.status === 'rejected' && (
                        <Badge variant="secondary" className="text-xs">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rechazada
                        </Badge>
                      )}
                      {offer.status === 'pending' && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">
                          Nueva
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{offer.workerTitle}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{offer.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{offer.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {offer.proposal}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-blue-600">{offer.proposedBudget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{offer.estimatedTime}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Hace {offer.receivedDate}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Offer Detail Dialog */}
        <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles de la Oferta</DialogTitle>
            </DialogHeader>
            {selectedOffer && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Para tu solicitud:</p>
                  <p className="">{selectedOffer.jobTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {selectedOffer.workerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>{selectedOffer.workerName}</h3>
                    <p className="text-sm text-gray-600">{selectedOffer.workerTitle}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedOffer.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedOffer.experience}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2">Propuesta</h4>
                  <p className="text-sm text-gray-600">{selectedOffer.proposal}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Presupuesto</p>
                    <p className="text-blue-600">{selectedOffer.proposedBudget}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Tiempo estimado</p>
                    <p className="">{selectedOffer.estimatedTime}</p>
                  </div>
                </div>

                {selectedOffer.portfolio.length > 0 && (
                  <div>
                    <h4 className="mb-2">Trabajos Anteriores</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedOffer.portfolio.map((work) => (
                        <div key={work.id} className="rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={work.image}
                            alt={work.title}
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm mb-2">Contacto</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span>{selectedOffer.phone}</span>
                  </div>
                </div>

                {selectedOffer.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRejectOffer(selectedOffer.id)}
                    >
                      Rechazar
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAcceptOffer(selectedOffer.id)}
                    >
                      Aceptar Oferta
                    </Button>
                  </div>
                )}
                {selectedOffer.status === 'accepted' && (
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-green-700">
                      ✓ Oferta aceptada. Contacta al trabajador para coordinar.
                    </p>
                  </div>
                )}
                {selectedOffer.status === 'rejected' && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      Esta oferta fue rechazada
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Vista para trabajadores - gestionar sus servicios
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white p-6 pb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-2xl p-3">
            <img 
              src={logo} 
              alt="Find Your Work" 
              className="w-32 h-auto"
            />
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar en mis servicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Add Service Button */}
      <div className="px-4 -mt-4 mb-4">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-white text-orange-600 hover:bg-gray-50 shadow-md h-auto py-4">
              <Plus className="w-5 h-5 mr-2" />
              <div>Agregar Nuevo Servicio</div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Publicar Nuevo Servicio</DialogTitle>
            </DialogHeader>
            <CreateServiceOffer onClose={() => setShowCreateDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-orange-100">
          <h3 className="mb-3">Resumen de Servicios</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-orange-600">
                {myServices.filter(s => s.status === 'active').length}
              </div>
              <p className="text-xs text-gray-600">Activos</p>
            </div>
            <div>
              <div className="text-blue-600">
                {myServices.reduce((sum, s) => sum + s.views, 0)}
              </div>
              <p className="text-xs text-gray-600">Visitas</p>
            </div>
            <div>
              <div className="text-green-600">
                {myServices.reduce((sum, s) => sum + s.inquiries, 0)}
              </div>
              <p className="text-xs text-gray-600">Consultas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* My Services List */}
      <div className="px-4 pb-4">
        <h2 className="mb-3">Mis Servicios de Carpintería</h2>
        <div className="space-y-3">
          {filteredMyServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="flex">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="mb-1">{service.title}</h3>
                      <Badge 
                        variant={service.status === 'active' ? 'default' : 'secondary'}
                        className={service.status === 'active' ? 'bg-orange-100 text-orange-700' : ''}
                      >
                        {service.status === 'active' ? 'Activo' : 'Pausado'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-orange-700">{service.rate}</span>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {service.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {service.inquiries}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t px-3 py-2 flex items-center justify-between bg-gray-50">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteService(service.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
