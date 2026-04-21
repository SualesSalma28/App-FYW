import { useState } from 'react';
import { Home } from './components/Home';
import { JobRequests } from './components/JobRequests';
import { ServiceOffers } from './components/ServiceOffers';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';
import { Auth } from './components/Auth';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'services' | 'profile'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'client' | 'worker' | null>(null);

  const handleLogin = (type: 'client' | 'worker') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Auth onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {activeTab === 'home' && <Home onNavigate={setActiveTab} userType={userType!} />}
      {activeTab === 'requests' && <JobRequests userType={userType!} />}
      {activeTab === 'services' && <ServiceOffers userType={userType!} />}
      {activeTab === 'profile' && <Profile userType={userType!} />}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} userType={userType!} />
      <Toaster />
    </div>
  );
}
