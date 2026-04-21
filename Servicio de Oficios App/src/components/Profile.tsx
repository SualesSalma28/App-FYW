import { Settings, LogOut, Briefcase, Star, MapPin, Phone, Mail, Award, TrendingUp, Clock, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/d21f49871341f03b8bc983b90e4c69aa87422bbd.png';

interface ProfileProps {
  userType: 'client' | 'worker';
}

export function Profile({ userType }: ProfileProps) {
  // Vista para clientes
  if (userType === 'client') {
    const stats = [
      { label: 'Solicitudes', value: '3', icon: Briefcase },
      { label: 'Contrataciones', value: '8', icon: CheckCircle },
      { label: 'Calificación', value: '4.8', icon: Star },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 pb-12">
          <div className="flex items-center justify-center mb-4 relative">
            <div className="bg-white rounded-2xl p-3">
              <img 
                src={logo} 
                alt="Find Your Work" 
                className="w-32 h-auto"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700 absolute right-0">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 -mt-8 mb-6">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-24 h-24 mb-3">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  JP
                </AvatarFallback>
              </Avatar>
              <h2 className="mb-1">Juan Pérez</h2>
              <p className="text-sm text-gray-600 mb-2">juan.perez@email.com</p>
              <Badge variant="secondary">Cliente</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-blue-50 rounded-full">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" className="w-full">
              Editar perfil
            </Button>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="px-4 mb-6">
          <h3 className="mb-3">Información de Contacto</h3>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>+52 555 123 4567</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>juan.perez@email.com</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>Ciudad de México, CDMX</span>
            </div>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="px-4 mb-6">
          <h3 className="mb-3">Métodos de Pago</h3>
          <Card className="divide-y">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm">Tarjetas guardadas</h4>
                    <p className="text-xs text-gray-600">2 tarjetas activas</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Ver
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Agregar Método de Pago
              </Button>
            </div>
            <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span className="text-sm">Historial de pagos</span>
              <span className="text-gray-400">›</span>
            </button>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="px-4 pb-6">
          <h3 className="mb-3">Configuración</h3>
          <Card className="divide-y">
            <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>Notificaciones</span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>Privacidad y seguridad</span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>Ayuda y soporte</span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between text-red-600">
              <div className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </div>
            </button>
          </Card>
        </div>
      </div>
    );
  }

  // Vista para trabajadores - Perfil profesional (carpintero)
  const workerStats = [
    { label: 'Trabajos Activos', value: '8', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Completados', value: '24', icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Calificación', value: '4.9', icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  ];

  const previousWork = [
    {
      id: 1,
      title: 'Closet empotrado a medida',
      client: 'María González',
      location: 'Roma Norte, CDMX',
      date: 'Noviembre 2024',
      rating: 5,
      review: 'Excelente trabajo, muy detallista y profesional. El closet quedó perfecto.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9zZXQlMjB3b29kfGVufDF8fHx8MTc2MjQzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Muebles de sala comedor',
      client: 'Carlos Ramírez',
      location: 'Polanco, CDMX',
      date: 'Octubre 2024',
      rating: 5,
      review: 'Increíble calidad de los muebles. Superó todas mis expectativas.',
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmUlMjB3b29kfGVufDF8fHx8MTc2MjQzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Restauración de muebles antiguos',
      client: 'Laura Martínez',
      location: 'Condesa, CDMX',
      date: 'Septiembre 2024',
      rating: 5,
      review: 'Devolvió la vida a mis muebles antiguos. Trabajo impecable.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcmVwYWlyJTIwZnVybml0dXJlfGVufDF8fHx8MTc2MjQzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white p-6 pb-12">
        <div className="flex items-center justify-center mb-4 relative">
          <div className="bg-white rounded-2xl p-3">
            <img 
              src={logo} 
              alt="Find Your Work" 
              className="w-32 h-auto"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-orange-700 absolute right-0">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Professional Profile Card */}
      <div className="px-4 -mt-8 mb-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-24 h-24 mb-3">
              <AvatarFallback className="bg-orange-600 text-white text-2xl">
                RM
              </AvatarFallback>
            </Avatar>
            <h2 className="mb-1">Roberto Mendoza</h2>
            <p className="text-sm text-gray-600 mb-2">Carpintero Profesional</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-700">
                <Award className="w-3 h-3 mr-1" />
                Verificado
              </Badge>
              <Badge variant="secondary">🪚 Carpintería</Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              Carpintero especializado con más de 12 años de experiencia en diseño y fabricación de muebles a medida, restauración y acabados en madera.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {workerStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className={`flex items-center justify-center w-10 h-10 mx-auto mb-2 ${stat.bgColor} rounded-full`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <Button variant="outline" className="w-full">
            Editar perfil profesional
          </Button>
        </Card>
      </div>

      {/* Contact Info */}
      <div className="px-4 mb-6">
        <h3 className="mb-3">Información de Contacto</h3>
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>+52 555 987 6543</span>
          </div>
          <Separator />
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>roberto.mendoza@email.com</span>
          </div>
          <Separator />
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>Ciudad de México, CDMX</span>
          </div>
          <Separator />
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>Lun - Sáb: 8:00 AM - 6:00 PM</span>
          </div>
        </Card>
      </div>

      {/* Payment Reception */}
      <div className="px-4 mb-6">
        <h3 className="mb-3">Recibir Pagos</h3>
        <Card className="divide-y">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm">Balance disponible</h4>
                  <p className="text-orange-600">$12,450.00</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-orange-600">
                Retirar
              </Button>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Ganancia este mes</span>
                <span className="text-orange-700">$8,200.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pagos pendientes</span>
                <span className="text-blue-600">$4,250.00</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Configurar Cuenta Bancaria
            </Button>
          </div>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-sm">Historial de ingresos</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-sm">Facturas generadas</span>
            <span className="text-gray-400">›</span>
          </button>
        </Card>
      </div>

      {/* Previous Work Portfolio */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3>Portafolio de Trabajos</h3>
            <p className="text-sm text-gray-600">{previousWork.length} proyectos completados</p>
          </div>
        </div>
        <div className="space-y-4">
          {previousWork.map((work) => (
            <Card key={work.id} className="overflow-hidden">
              <ImageWithFallback
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="mb-2">{work.title}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(work.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-3 italic">"{work.review}"</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">Cliente:</span>
                    <span>{work.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{work.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{work.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="px-4 pb-6">
        <h3 className="mb-3">Configuración</h3>
        <Card className="divide-y">
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span>Notificaciones</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span>Horario de disponibilidad</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span>Métodos de pago</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span>Ayuda y soporte</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between text-red-600">
            <div className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </div>
          </button>
        </Card>
      </div>
    </div>
  );
}
