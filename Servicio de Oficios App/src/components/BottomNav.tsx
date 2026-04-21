import { Home, Briefcase, Users, User, ClipboardList, Wrench } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'requests' | 'services' | 'profile';
  onTabChange: (tab: 'home' | 'requests' | 'services' | 'profile') => void;
  userType: 'client' | 'worker';
}

export function BottomNav({ activeTab, onTabChange, userType }: BottomNavProps) {
  const tabs = userType === 'client' 
    ? [
        { id: 'home' as const, icon: Home, label: 'Inicio' },
        { id: 'requests' as const, icon: Briefcase, label: 'Solicitudes' },
        { id: 'services' as const, icon: Users, label: 'Servicios' },
        { id: 'profile' as const, icon: User, label: 'Perfil' },
      ]
    : [
        { id: 'home' as const, icon: Home, label: 'Trabajos' },
        { id: 'requests' as const, icon: ClipboardList, label: 'Solicitudes' },
        { id: 'services' as const, icon: Wrench, label: 'Mis Servicios' },
        { id: 'profile' as const, icon: User, label: 'Perfil' },
      ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const activeColor = userType === 'client' ? 'text-blue-600' : 'text-orange-600';
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive ? activeColor : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
