import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, BookOpen, User, GraduationCap,
  UploadCloud, CreditCard, Calendar, TrendingUp,
  Bell, MessageSquare, Settings, LogOut, Menu, X,
  GraduationCap as BrandIcon
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Dashboard',          path: '/dashboard',        icon: LayoutDashboard },
  { label: 'Apply Programme',    path: '/apply',            icon: BookOpen },
  { label: 'Personal Info',      path: '/personal-info',    icon: User },
  { label: 'Academic Info',      path: '/academic-info',    icon: GraduationCap },
  { label: 'Documents',          path: '/upload-documents', icon: UploadCloud },
  { label: 'Payments',           path: '/payments',         icon: CreditCard },
  { label: 'Appointments',       path: '/appointments',     icon: Calendar },
  { label: 'Application Status', path: '/status',           icon: TrendingUp },
  { label: 'Notifications',      path: '/notifications',    icon: Bell, hasCount: true },
  { label: 'Support',            path: '/support',          icon: MessageSquare },
  { label: 'Profile',            path: '/profile',          icon: Settings },
];

const PAGE_TITLES = {
  '/dashboard':        'Dashboard',
  '/apply':            'Apply Programme',
  '/personal-info':    'Personal Information',
  '/academic-info':    'Academic Information',
  '/upload-documents': 'Document Upload',
  '/payments':         'Payments',
  '/appointments':     'Appointments',
  '/status':           'Application Status',
  '/notifications':    'Notifications',
  '/support':          'Support & Feedback',
  '/profile':          'Profile Settings',
};

export const Layout = ({ children }) => {
  const { user, logout, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Poll unread notification count
  useEffect(() => {
    if (!token) return;
    const fetch_ = async () => {
      try {
        const res = await fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const list = await res.json();
          setUnreadCount(list.filter(n => !n.read).length);
        }
      } catch (_) {}
    };
    fetch_();
    const id = setInterval(fetch_, 15000);
    return () => clearInterval(id);
  }, [token]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pageTitle = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <div className="dashboard-layout">
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

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
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
        <div className="sidebar-brand">
          <BrandIcon size={28} strokeWidth={2} />
          <span>AdmissionHub</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ul className="sidebar-menu">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const count = item.hasCount ? unreadCount : 0;
              return (
                <li key={item.path} className={`sidebar-item${isActive ? ' active' : ''}`}>
                  <Link to={item.path}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {count > 0 && (
                      <span style={{
                        marginLeft: 'auto',
                        backgroundColor: '#dc2626',
                        color: '#fff',
                        padding: '1px 7px',
                        borderRadius: '50px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-footer">
            <li className="sidebar-item" style={{ listStyle: 'none' }}>
              <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                <LogOut size={18} />
                <span>Logout</span>
              </a>
            </li>
          </div>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Navbar */}
        <header className="navbar">
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
            <h2 className="navbar-title">{pageTitle}</h2>
          </div>

          <div className="navbar-actions">
            <Link to="/notifications" style={{ color: 'var(--text-muted)', position: 'relative', display: 'flex' }}>
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#dc2626',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%'
                }} />
              )}
            </Link>

            <div className="user-badge">
              <User size={14} />
              <span>{user?.name || 'Applicant'}</span>
            </div>
          </div>
        </header>

        <div className="content-container animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
