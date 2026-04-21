import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Briefcase, Users } from 'lucide-react';
import logo from 'figma:asset/d21f49871341f03b8bc983b90e4c69aa87422bbd.png';

interface AuthProps {
  onLogin: (userType: 'client' | 'worker') => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [userType, setUserType] = useState<'client' | 'worker' | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType) {
      onLogin(userType);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="bg-white rounded-3xl p-6 inline-block mx-auto mb-6">
              <img 
                src={logo} 
                alt="Find Your Work" 
                className="w-56 h-auto"
              />
            </div>
            <p className="text-blue-100 text-lg">Conectamos oficios con oportunidades</p>
          </div>

          <div className="space-y-4">
            <Card 
              className="p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setUserType('client')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Soy Cliente</h3>
                  <p className="text-sm text-gray-600">Necesito contratar servicios</p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setUserType('worker')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Soy Trabajador</h3>
                  <p className="text-sm text-gray-600">Ofrezco mis servicios profesionales</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-white rounded-3xl p-5 inline-block mx-auto mb-4">
            <img 
              src={logo} 
              alt="Find Your Work" 
              className="w-48 h-auto"
            />
          </div>
          <p className="text-blue-100 text-lg">
            {userType === 'client' ? 'Acceso para Clientes' : 'Acceso para Trabajadores'}
          </p>
        </div>

        <Card className="p-6">
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email-register">Correo Electrónico</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 555 123 4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password-register">Contraseña</Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Registrarse
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <Button 
            variant="ghost" 
            className="w-full mt-4"
            onClick={() => setUserType(null)}
          >
            ← Volver atrás
          </Button>
        </Card>
      </div>
    </div>
  );
}
