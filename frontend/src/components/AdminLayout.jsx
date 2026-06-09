import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MessageSquare, LogOut, ShieldCheck, Menu, X } from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.3)',
            backdropFilter: 'blur(2px)',
            zIndex: 990
          }}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{
        width: '240px',
        minWidth: '240px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
        borderRight: '1px solid #e2e8f0'
      }}>
        {/* Close button for mobile */}
        <button
          className="menu-close-btn"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'none'
          }}
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          marginBottom: '2rem',
          paddingLeft: '0.5rem'
        }}>
          <div style={{
            backgroundColor: '#2563eb',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex'
          }}>
            <ShieldCheck size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0f172a', lineHeight: 1.2 }}>
              Admin Portal
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Admissions Management</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1 }}>
          <AdminNavLink to="/admin" icon={<LayoutDashboard size={18} />} label="Applications" />
          <AdminNavLink to="/admin/support" icon={<MessageSquare size={18} />} label="Support Tickets" />
        </nav>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
            Signed in as
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', paddingLeft: '0.5rem', marginBottom: '1rem' }}>
            {user?.name || 'Admin'}
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              width: '100%',
              padding: '0.65rem 0.75rem',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              className="menu-toggle-btn" 
              onClick={() => setIsOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-main)',
                marginRight: '0.75rem',
                padding: '0.25rem',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={22} />
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
              Admissions Admin Dashboard
            </h2>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            padding: '0.35rem 0.85rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <ShieldCheck size={14} />
            Admin
          </div>
        </header>

        <div style={{ padding: '2rem', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

// Helper nav-link component for admin sidebar
const AdminNavLink = ({ to, icon, label }) => {
  const isActive = window.location.pathname === to;
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.65rem 0.75rem',
        borderRadius: '8px',
        color: isActive ? '#ffffff' : '#475569',
        backgroundColor: isActive ? '#2563eb' : 'transparent',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: 500,
        marginBottom: '0.25rem',
        transition: 'all 0.2s ease',
        fontFamily: 'Inter, sans-serif'
      }}
      onMouseOver={e => { if (!isActive) { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; }}}
      onMouseOut={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#475569'; }}}
    >
      {icon}
      {label}
    </Link>
  );
};
