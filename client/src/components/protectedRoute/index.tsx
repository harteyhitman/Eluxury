import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && adminOnly && user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, loading]);

  if (loading || !user || (adminOnly && user.role !== 'admin')) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}