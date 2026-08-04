import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Home from './index';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session) {
      try {
        const data = JSON.parse(session);
        if (data.isAdmin && Date.now() - data.loginTime < 3600000) {
          setIsAdmin(true);
          return;
        }
      } catch (e) {}
    }
    router.push('/login');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/login');
  };

  if (!isAdmin) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Checking credentials...</p>
        </div>
      </div>
    );
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