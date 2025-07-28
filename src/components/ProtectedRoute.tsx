import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Safely handle location state with fallbacks
    const safeLocation = {
      pathname: location?.pathname || '/subscribe',
      search: location?.search || '',
      hash: location?.hash || '',
      state: location?.state || null,
      key: location?.key || 'default'
    };
    
    // Redirect to assessment first, preserving the original destination
    return <Navigate to="/assessment" state={{ from: safeLocation }} replace />;
  }

  return <>{children}</>;
};