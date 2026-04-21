import { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Avatar, AvatarFallback } from './ui/avatar';
import logo from 'figma:asset/d21f49871341f03b8bc983b90e4c69aa87422bbd.png';

interface JobRequestsProps {
  userType: 'client' | 'worker';
}

// Solicitudes enviadas por el cliente a trabajadores
const myJobRequests = [
  {
    id: 1,
    serviceName: 'Reparación de tubería en cocina',
    description: 'Tengo una fuga de agua debajo del fregadero de la cocina. Necesito reparación urgente.',
    category: 'Plomero',
    location: 'Ciudad de México, Del Valle',
    budget: '$500-800',
    postedDate: '2 días',
    applicants: [
      {
        id: 1,
        name: 'Carlos Ramírez',
        initials: 'CR',
        rating: 4.8,
        experience: '10 años',
        phone: '55-1234-5678',
        proposal: 'Puedo resolver la fuga el mismo día. Tengo experiencia en reparaciones de emergencia.',
        proposedBudget: '$600',
        appliedDate: '1 día',
        status: 'pending' as const,
      },
      {
        id: 2,
        name: 'Juan Pérez',
        initials: 'JP',
        rating: 4.6,
        experience: '8 años',
        phone: '55-9876-5432',
        proposal: 'Trabajo rápido y garantizado. Puedo ir mañana temprano.',
        proposedBudget: '$700',
        appliedDate: '2 días',
        status: 'pending' as const,
      },
    ],
  },
  {
    id: 2,
    serviceName: 'Pintar departamento',
    description: 'Casa de 120m2, necesito pintar salas, recámaras y pasillos. Colores claros.',
    category: 'Pintor',
    location: 'Monterrey, San Pedro',
    budget: '$2,500-3,000',
    postedDate: '5 días',
    applicants: [
      {
        id: 3,
        name: 'José Hernández',
        initials: 'JH',
        rating: 4.7,
        experience: '12 años',
        phone: '55-4567-8901',
        proposal: 'Especialista en interiores. Trabajo limpio y profesional con acabados finos.',
        proposedBudget: '$2,800',
        appliedDate: '3 días',
        status: 'accepted' as const,
      },
      {
        id: 4,
        name: 'Roberto Silva',
        initials: 'RS',
        rating: 4.5,
        experience: '9 años',
        phone: '55-2345-6789',
        proposal: 'Puedo empezar la próxima semana. Incluyo materiales de primera calidad.',
        proposedBudget: '$3,000',
        appliedDate: '4 días',
        status: 'rejected' as const,
      },
    ],
  },
  {
    id: 3,
    serviceName: 'Instalación eléctrica departamento nuevo',
    description: 'Necesito instalar tomas, interruptores y lámparas en departamento nuevo.',
    category: 'Electricista',
    location: 'Guadalajara, Providencia',
    budget: '$1,200',
    postedDate: '1 semana',
    applicants: [],
  },
];

// Solicitudes que llegan al trabajador (carpintero)
const incomingRequests = [
  {
    id: 1,
    clientName: 'María González',
    clientInitials: 'MG',
    serviceName: 'Closet a medida',
    description: 'Me interesa tu servicio de closets personalizados. Necesito uno para mi recámara de 3x2.5m.',
    location: 'Roma Norte, CDMX',
    budget: '$18,000',
    requestDate: '2 horas',
    status: 'pending' as const,
    phone: '55-1234-5678',
    email: 'maria.g@email.com',
  },
  {
    id: 2,
    clientName: 'Carlos Ramírez',
    clientInitials: 'CR',
    serviceName: 'Muebles de sala',
    description: 'Vi tu portafolio y me gustó mucho tu trabajo. Necesito fabricar muebles de madera para sala-comedor.',
    location: 'Polanco, CDMX',
    budget: '$25,000-30,000',
    requestDate: '5 horas',
    status: 'pending' as const,
    phone: '55-9876-5432',
    email: 'c.ramirez@email.com',
  },
  {
    id: 3,
    clientName: 'Laura Martínez',
    clientInitials: 'LM',
    serviceName: 'Reparación de puertas',
    description: 'Tengo 3 puertas de madera que necesitan reparación y barnizado. ¿Cuándo podrías venir?',
    location: 'Condesa, CDMX',
    budget: '$3,000',
    requestDate: '1 día',
    status: 'accepted' as const,
    phone: '55-4567-8901',
    email: 'laura.m@email.com',
  },
  {
    id: 4,
    clientName: 'Roberto Silva',
    clientInitials: 'RS',
    serviceName: 'Mueble de baño',
    description: 'Necesito un mueble de baño con diseño minimalista. Tengo las medidas exactas.',
    location: 'Coyoacán, CDMX',
    budget: '$8,500',
    requestDate: '3 días',
    status: 'pending' as const,
    phone: '55-2345-6789',
    email: 'r.silva@email.com',
  },
];

export function JobRequests({ userType }: JobRequestsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<typeof myJobRequests[0] | null>(null);
  const [selectedIncoming, setSelectedIncoming] = useState<typeof incomingRequests[0] | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof myJobRequests[0]['applicants'][0] | null>(null);

  const handleAcceptApplicant = (requestId: number, applicantId: number) => {
    toast.success('¡Propuesta aceptada! El trabajador será notificado.');
    setSelectedApplicant(null);
  };

  const handleRejectApplicant = (requestId: number, applicantId: number) => {
    toast.info('Propuesta rechazada.');
    setSelectedApplicant(null);
  };

  const handleAcceptRequest = (requestId: number) => {
    toast.success('¡Solicitud aceptada! El cliente será notificado.');
    setSelectedIncoming(null);
  };

  const handleDeclineRequest = (requestId: number) => {
    toast.info('Solicitud rechazada.');
    setSelectedIncoming(null);
  };

  const filteredRequests = myJobRequests.filter((request) => {
    const matchesSearch = request.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredIncoming = incomingRequests.filter((request) => {
    const matchesSearch = request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Vista para clientes - mis solicitudes enviadas a trabajadores
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
              placeholder="Buscar mis solicitudes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Info Header */}
        <div className="px-4 pt-4 mb-4">
          <h2 className="mb-1">Mis Solicitudes</h2>
          <p className="text-sm text-gray-600">Solicitudes que has publicado y propuestas recibidas</p>
        </div>

        {/* Request List */}
        <div className="px-4 pb-4 space-y-3">
          {filteredRequests.map((request) => (
            <Card 
              key={request.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRequest(request)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="mb-2">{request.serviceName}</h3>
                  <Badge variant="secondary" className="mb-2">
                    {request.category}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {request.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{request.budget}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Publicado hace {request.postedDate}
                </span>
                <Badge 
                  variant={request.applicants.length > 0 ? 'default' : 'secondary'}
                  className={request.applicants.length > 0 ? 'bg-blue-100 text-blue-700' : ''}
                >
                  {request.applicants.length} {request.applicants.length === 1 ? 'propuesta' : 'propuestas'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Request Detail Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRequest?.serviceName}</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary">{selectedRequest.category}</Badge>
                </div>

                <div>
                  <h4 className="mb-2">Descripción</h4>
                  <p className="text-sm text-gray-600">{selectedRequest.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedRequest.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>{selectedRequest.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Publicado hace {selectedRequest.postedDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3">Propuestas Recibidas ({selectedRequest.applicants.length})</h4>
                  {selectedRequest.applicants.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">Aún no has recibido propuestas</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedRequest.applicants.map((applicant) => (
                        <Card 
                          key={applicant.id} 
                          className="p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApplicant(applicant);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {applicant.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5>{applicant.name}</h5>
                                {applicant.status === 'accepted' && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Aceptado
                                  </Badge>
                                )}
                                {applicant.status === 'rejected' && (
                                  <Badge variant="secondary" className="text-xs">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Rechazado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                ⭐ {applicant.rating} • {applicant.experience}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">{applicant.proposal}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-600">{applicant.proposedBudget}</span>
                                <span className="text-xs text-gray-500">Hace {applicant.appliedDate}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Applicant Detail Dialog */}
        <Dialog open={!!selectedApplicant} onOpenChange={() => setSelectedApplicant(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Detalles de la Propuesta</DialogTitle>
            </DialogHeader>
            {selectedApplicant && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {selectedApplicant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>{selectedApplicant.name}</h3>
                    <p className="text-sm text-gray-600">
                      ⭐ {selectedApplicant.rating} • {selectedApplicant.experience}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2">Propuesta</h4>
                  <p className="text-sm text-gray-600">{selectedApplicant.proposal}</p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Presupuesto propuesto</span>
                    <span className="text-blue-600">{selectedApplicant.proposedBudget}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <h4 className="text-sm">Información de Contacto</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{selectedApplicant.phone}</span>
                  </div>
                </div>

                {selectedApplicant.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRejectApplicant(0, selectedApplicant.id)}
                    >
                      Rechazar
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAcceptApplicant(0, selectedApplicant.id)}
                    >
                      Aceptar Propuesta
                    </Button>
                  </div>
                )}
                {selectedApplicant.status === 'accepted' && (
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-green-700">
                      ✓ Propuesta aceptada. Contacta al trabajador para coordinar.
                    </p>
                  </div>
                )}
                {selectedApplicant.status === 'rejected' && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      Esta propuesta fue rechazada
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

  // Vista para trabajadores - Solicitudes que le llegan
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
            placeholder="Buscar solicitudes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="px-4 pt-4">
        <TabsList className="w-full">
          <TabsTrigger value="pending" className="flex-1">
            Pendientes ({incomingRequests.filter(r => r.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex-1">
            Aceptadas ({incomingRequests.filter(r => r.status === 'accepted').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4 space-y-3">
          {filteredIncoming.filter(r => r.status === 'pending').map((request) => (
            <Card 
              key={request.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-orange-500"
              onClick={() => setSelectedIncoming(request)}
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar>
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {request.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1">{request.clientName}</h3>
                  <p className="text-sm text-gray-600">Interesado en: <span className="text-orange-700">{request.serviceName}</span></p>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Nueva
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {request.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-orange-700">{request.budget}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Hace {request.requestDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="mt-4 space-y-3">
          {filteredIncoming.filter(r => r.status === 'accepted').map((request) => (
            <Card 
              key={request.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-orange-600"
              onClick={() => setSelectedIncoming(request)}
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar>
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {request.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="mb-1">{request.clientName}</h3>
                  <p className="text-sm text-gray-600">Servicio: <span className="text-orange-700">{request.serviceName}</span></p>
                </div>
                <Badge className="bg-orange-100 text-orange-700">
                  Aceptada
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {request.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-orange-700">{request.budget}</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={!!selectedIncoming} onOpenChange={() => setSelectedIncoming(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitud de Servicio</DialogTitle>
          </DialogHeader>
          {selectedIncoming && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {selectedIncoming.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedIncoming.clientName}</h3>
                  <p className="text-sm text-gray-600">Cliente</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Servicio Solicitado</h4>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {selectedIncoming.serviceName}
                </Badge>
              </div>

              <div>
                <h4 className="mb-2">Descripción</h4>
                <p className="text-sm text-gray-600">{selectedIncoming.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedIncoming.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-orange-700">{selectedIncoming.budget}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <h4 className="text-sm">Información de Contacto</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{selectedIncoming.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{selectedIncoming.email}</span>
                </div>
              </div>

              {selectedIncoming.status === 'pending' ? (
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleDeclineRequest(selectedIncoming.id)}
                  >
                    Rechazar
                  </Button>
                  <Button 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleAcceptRequest(selectedIncoming.id)}
                  >
                    Aceptar
                  </Button>
                </div>
              ) : (
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-orange-700">
                    ✓ Ya aceptaste esta solicitud. Contacta al cliente para coordinar.
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
