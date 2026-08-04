import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase, isAdmin } from '../lib/supabase';
import Home from './index';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const admin = await isAdmin();
      if (admin) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Checking credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '20px', 
        zIndex: 1000,
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.85rem', color: '#4a617a' }}>Admin</span>
        <button
          onClick={handleLogout}
          style={{
            padding: '6px 16px',
            background: '#E2171D',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Logout
        </button>
      </div>
      <Home isAdmin={true} />
    </div>
  );
}