import { Search, Plus, Wrench, Briefcase, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CreateJobRequest } from './CreateJobRequest';
import { CreateServiceOffer } from './CreateServiceOffer';
import logo from 'figma:asset/d21f49871341f03b8bc983b90e4c69aa87422bbd.png';

interface HomeProps {
  onNavigate: (tab: 'home' | 'requests' | 'services' | 'profile') => void;
  userType: 'client' | 'worker';
}

const categories = [
  { id: 'plomero', name: 'Plomero', icon: '🔧' },
  { id: 'electricista', name: 'Electricista', icon: '⚡' },
  { id: 'pintor', name: 'Pintor', icon: '🎨' },
  { id: 'carpintero', name: 'Carpintero', icon: '🪚' },
  { id: 'jardinero', name: 'Jardinero', icon: '🌿' },
  { id: 'limpieza', name: 'Limpieza', icon: '🧹' },
];

const recentJobs = [
  {
    id: 1,
    title: 'Reparación de tubería',
    category: 'Plomero',
    location: 'Ciudad de México',
    budget: '$500-800',
    posted: '2 horas',
  },
  {
    id: 2,
    title: 'Instalación eléctrica',
    category: 'Electricista',
    location: 'Guadalajara',
    budget: '$1,200',
    posted: '5 horas',
  },
  {
    id: 3,
    title: 'Pintar departamento',
    category: 'Pintor',
    location: 'Monterrey',
    budget: '$2,500-3,000',
    posted: '1 día',
  },
];

// Ejemplo: Trabajos para carpintero
const carpentryJobs = [
  {
    id: 1,
    title: 'Fabricación de muebles para sala',
    description: 'Necesito diseñar y fabricar muebles de madera para sala comedor',
    location: 'Polanco, CDMX',
    budget: '$8,000-12,000',
    posted: '3 horas',
    urgent: true,
  },
  {
    id: 2,
    title: 'Reparación de puertas de madera',
    description: 'Tengo 3 puertas que necesitan reparación y barnizado',
    location: 'Condesa, CDMX',
    budget: '$2,500-3,500',
    posted: '1 día',
    urgent: false,
  },
  {
    id: 3,
    title: 'Closet a medida',
    description: 'Necesito un closet de madera con diseño moderno para recámara',
    location: 'Roma Norte, CDMX',
    budget: '$15,000-20,000',
    posted: '2 días',
    urgent: false,
  },
  {
    id: 4,
    title: 'Acabados en madera para oficina',
    description: 'Instalación de paneles de madera decorativos en oficina',
    location: 'Santa Fe, CDMX',
    budget: '$25,000+',
    posted: '5 horas',
    urgent: true,
  },
];

export function Home({ onNavigate, userType }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState<'request' | 'service'>('request');

  // Vista para clientes
  if (userType === 'client') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 pb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-3">
              <img 
                src={logo} 
                alt="Find Your Work" 
                className="w-40 h-auto"
              />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar servicios u oficios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 -mt-4 mb-6 flex gap-3">
          <Dialog open={showCreateDialog && createType === 'request'} onOpenChange={(open) => {
            if (!open) setShowCreateDialog(false);
          }}>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 bg-white text-blue-600 hover:bg-gray-50 shadow-md h-auto py-4"
                onClick={() => {
                  setCreateType('request');
                  setShowCreateDialog(true);
                }}
              >
                <Briefcase className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div>Necesito un</div>
                  <div className="text-xs">Servicio</div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Publicar Solicitud de Servicio</DialogTitle>
              </DialogHeader>
              <CreateJobRequest onClose={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDialog && createType === 'service'} onOpenChange={(open) => {
            if (!open) setShowCreateDialog(false);
          }}>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 bg-white text-green-600 hover:bg-gray-50 shadow-md h-auto py-4"
                onClick={() => {
                  setCreateType('service');
                  setShowCreateDialog(true);
                }}
              >
                <Wrench className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div>Ofrezco</div>
                  <div className="text-xs">Servicios</div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Publicar Oferta de Servicio</DialogTitle>
              </DialogHeader>
              <CreateServiceOffer onClose={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <h2 className="mb-3">Categorías</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2>Solicitudes Recientes</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('requests')}
            >
              Ver todas
            </Button>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <Card key={job.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="mb-1">{job.title}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {job.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📍 {job.location}</span>
                  <span>{job.budget}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Publicado hace {job.posted}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vista para trabajadores (ejemplo: carpintero)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white p-6 pb-8">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-3">
            <img 
              src={logo} 
              alt="Find Your Work" 
              className="w-40 h-auto"
            />
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar trabajos de carpintería..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-4 mb-6 grid grid-cols-3 gap-3">
        <Card className="p-3 bg-white shadow-md text-center">
          <TrendingUp className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <div className="text-xs text-gray-600">Activas</div>
          <div className="text-orange-600">8</div>
        </Card>
        <Card className="p-3 bg-white shadow-md text-center">
          <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xs text-gray-600">Pendientes</div>
          <div className="text-blue-600">3</div>
        </Card>
        <Card className="p-3 bg-white shadow-md text-center">
          <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-xs text-gray-600">Completados</div>
          <div className="text-green-600">24</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-4 text-white shadow-md">
          <h3 className="mb-3">Gestiona tu negocio</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="secondary" 
              className="bg-white text-orange-700 hover:bg-gray-100"
              onClick={() => onNavigate('profile')}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Mi Perfil
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary"
                  className="bg-white text-orange-700 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Servicio
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
        </div>
      </div>

      {/* Available Carpentry Jobs */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2>Trabajos de Carpintería</h2>
            <p className="text-sm text-gray-600">Clientes buscando carpinteros</p>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            {carpentryJobs.length} nuevos
          </Badge>
        </div>
        <div className="space-y-3">
          {carpentryJobs.map((job) => (
            <Card key={job.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-orange-600">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3>{job.title}</h3>
                    {job.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgente
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      🪚 Carpintería
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                <span>📍 {job.location}</span>
                <span className="text-orange-700">{job.budget}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">
                  Hace {job.posted}
                </span>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Postularme
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
