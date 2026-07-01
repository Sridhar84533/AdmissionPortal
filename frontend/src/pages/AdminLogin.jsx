import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedUser = await adminLogin(email, password);
      if (loggedUser.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        // Remove the wrongly-stored admin session
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center' }}>
          <div style={{
            backgroundColor: '#1e293b',
            color: '#fff',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#1e293b' }}>
              Admin Portal
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Restricted access — authorized personnel only
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="admin-email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="admin-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#1e293b',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.backgroundColor = '#0f172a'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
          >
            {loading ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
          Are you an applicant?{' '}
          <a href="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            Go to Applicant Login
          </a>
        </p>
      </div>
    </div>
  );
}
