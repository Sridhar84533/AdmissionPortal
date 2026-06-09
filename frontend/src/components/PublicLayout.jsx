import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Home',    path: '/' },
  { label: 'About',   path: '/about' },
  { label: 'Blogs',   path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

export default function PublicLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* ── Sticky Navbar ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 2rem',
          height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Brand */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              borderRadius: 10, padding: '0.45rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={20} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem',
              color: '#0f172a', letterSpacing: '-0.3px',
            }}>
              Admit<span style={{ color: '#2563eb' }}>Portal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="pub-nav-desktop">
            {navLinks.map(({ label, path }) => (
              <Link key={path} to={path} style={{
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.92rem',
                color: location.pathname === path ? '#2563eb' : '#475569',
                background: location.pathname === path ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s ease',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="pub-nav-desktop">
            <Link to="/login" style={{
              textDecoration: 'none', padding: '0.5rem 1.25rem',
              borderRadius: 8, fontWeight: 600, fontSize: '0.92rem',
              color: '#2563eb', border: '1.5px solid #2563eb',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.target.style.background = '#eff6ff'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; }}
            >
              Sign In
            </Link>
            <Link to="/register" style={{
              textDecoration: 'none', padding: '0.5rem 1.25rem',
              borderRadius: 8, fontWeight: 600, fontSize: '0.92rem',
              background: '#2563eb', color: '#fff',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
            }}
              onMouseEnter={e => { e.target.style.background = '#1d4ed8'; }}
              onMouseLeave={e => { e.target.style.background = '#2563eb'; }}
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="pub-nav-mobile"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.5rem', borderRadius: 8,
              color: '#0f172a',
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: '#fff', borderTop: '1px solid #e2e8f0',
            padding: '1rem 2rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out',
          }}>
            {navLinks.map(({ label, path }) => (
              <Link key={path} to={path} style={{
                textDecoration: 'none', padding: '0.75rem 1rem',
                borderRadius: 8, fontWeight: 600, fontSize: '0.95rem',
                color: location.pathname === path ? '#2563eb' : '#0f172a',
                background: location.pathname === path ? '#eff6ff' : 'transparent',
              }}>
                {label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link to="/login" style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '0.75rem', borderRadius: 8, fontWeight: 600,
                color: '#2563eb', border: '1.5px solid #2563eb',
              }}>Sign In</Link>
              <Link to="/register" style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '0.75rem', borderRadius: 8, fontWeight: 600,
                background: '#2563eb', color: '#fff',
              }}>Apply Now</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Page Content ── */}
      <main style={{ flex: 1, paddingTop: 68 }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        background: '#0f172a',
        color: '#94a3b8',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}>
            {/* Brand col */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  borderRadius: 10, padding: '0.45rem',
                  display: 'flex', alignItems: 'center',
                }}>
                  <GraduationCap size={20} color="#fff" />
                </div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                  Admit<span style={{ color: '#3b82f6' }}>Portal</span>
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#64748b' }}>
                Streamlining admissions for modern universities. Apply smarter, get admitted faster.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {navLinks.map(({ label, path }) => (
                  <Link key={path} to={path} style={{
                    textDecoration: 'none', color: '#64748b', fontSize: '0.88rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#3b82f6'}
                    onMouseLeave={e => e.target.style.color = '#64748b'}
                  >
                    <ChevronRight size={13} /> {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Apply col */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Applicants</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[['Apply Now', '/register'], ['Sign In', '/login'], ['Check Status', '/login']].map(([label, path]) => (
                  <Link key={label} to={path} style={{
                    textDecoration: 'none', color: '#64748b', fontSize: '0.88rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#3b82f6'}
                    onMouseLeave={e => e.target.style.color = '#64748b'}
                  >
                    <ChevronRight size={13} /> {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact col */}
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#64748b' }}>
                <p>📍 123 University Ave, Campus City</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ admissions@admitportal.edu</p>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '1.5rem',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: '1rem', fontSize: '0.83rem',
          }}>
            <span>© {new Date().getFullYear()} AdmitPortal. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(t => (
                <span key={t} style={{ cursor: 'pointer', color: '#64748b' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .pub-nav-desktop { display: none !important; }
          .pub-nav-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .pub-nav-mobile { display: none !important; }
          .pub-nav-desktop { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
