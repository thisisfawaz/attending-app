import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const adminEmail = process.env.ADMIN_EMAIL || 'the4therfirm@gmail.com';
        if (session.user.email === adminEmail) {
          router.push('/admin');
        }
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (signInError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // Check if the logged-in user is the admin
      const adminEmail = process.env.ADMIN_EMAIL || 'the4therfirm@gmail.com';
      if (data.user.email !== adminEmail) {
        await supabase.auth.signOut();
        setError('Access denied. Only admin can login.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e9edf4 100%)'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        padding: '48px 40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#0b1f33', marginBottom: '6px', textAlign: 'center' }}>
          Admin Login
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#4a617a', textAlign: 'center', marginBottom: '32px' }}>
          Enter your credentials
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#1a314b', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourdomain.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #dce5ef',
                borderRadius: '12px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: '#fafcff'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#1a314b', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #dce5ef',
                borderRadius: '12px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: '#fafcff'
              }}
            />
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#fff5f5',
              padding: '12px 16px',
              borderRadius: '10px',
              color: '#E2171D',
              fontSize: '0.9rem',
              border: '1px solid #ffd4d4',
              marginBottom: '16px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#E2171D',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: '0 8px 18px rgba(226, 23, 29, 0.18)'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}