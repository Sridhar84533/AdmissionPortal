import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Users, Award, Shield, Globe, BookOpen,
  ArrowRight, GraduationCap, Star, CheckCircle, TrendingUp
} from 'lucide-react';

// ── Value Card ────────────────────────────────────────────────────────────────
function ValueCard({ icon: Icon, color, bg, title, desc }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
      padding: '2rem', textAlign: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 16px 40px ${color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
      }}
    >
      <div style={{
        background: bg, borderRadius: 14, width: 60, height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
      }}>
        <Icon size={26} color={color} />
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

// ── Team Member Card ──────────────────────────────────────────────────────────
function TeamCard({ name, role, dept, initials, gradient }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
      overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(37,99,235,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
      }}
    >
      {/* Avatar area */}
      <div style={{
        background: gradient, height: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(10px)',
          border: '3px solid rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', fontWeight: 800, color: '#fff',
        }}>{initials}</div>
      </div>
      <div style={{ padding: '1.25rem', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '0.25rem' }}>{name}</h3>
        <p style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{role}</p>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{dept}</p>
      </div>
    </div>
  );
}

// ── Milestone Item ────────────────────────────────────────────────────────────
function Milestone({ year, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{
        background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
        borderRadius: 10, padding: '0.5rem 0.75rem',
        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
        fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap',
        flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
      }}>{year}</div>
      <div style={{
        borderLeft: '2px solid #e2e8f0', paddingLeft: '1.25rem',
        paddingBottom: '1.5rem', flex: 1,
      }}>
        <h4 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem', fontSize: '0.95rem' }}>{title}</h4>
        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AboutUs() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(165deg, #eff6ff 0%, #f0f9ff 50%, #f8fafc 100%)',
        padding: '4rem 2rem 5rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 720, margin: '0 auto', animation: 'fadeSlideUp 0.7s ease-out both' }}>
          <span style={{
            background: '#eff6ff', color: '#2563eb',
            padding: '0.35rem 1rem', borderRadius: 50,
            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.5px',
          }}>ABOUT US</span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#0f172a',
            marginTop: '1rem', lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            Transforming How Students<br />
            <span style={{
              background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Access Higher Education</span>
          </h1>
          <p style={{
            color: '#475569', fontSize: '1.05rem',
            lineHeight: 1.8, marginTop: '1.25rem', maxWidth: 580, margin: '1.25rem auto 0',
          }}>
            We built AdmitPortal to eliminate the friction in university admissions —
            making it faster, fairer, and fully digital for every aspiring student.
          </p>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2.5rem', alignItems: 'center',
        }}>
          {/* Left - story */}
          <div>
            <span style={{
              background: '#eff6ff', color: '#2563eb',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700,
            }}>OUR STORY</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', lineHeight: 1.3,
              letterSpacing: '-0.5px',
            }}>Built for Students,<br />Powered by Purpose</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginTop: '1rem', fontSize: '0.95rem' }}>
              AdmitPortal was founded in 2012 by a group of educators and technologists
              who saw how outdated and stressful the traditional admission process was.
              Long queues, paper forms, and zero transparency — we knew there had to be a better way.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8, marginTop: '0.75rem', fontSize: '0.95rem' }}>
              Today, we power admissions for institutions across the country, serving
              over 15,000 applicants every cycle with a platform that is intuitive,
              secure, and genuinely helpful.
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[['15,000+', 'Students Served'], ['42+', 'Programmes'], ['98%', 'Satisfaction']].map(([val, lab]) => (
                <div key={lab}>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{val}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Mission/Vision/Values cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: Target, color: '#2563eb', bg: '#eff6ff',
                label: 'Our Mission',
                text: 'To democratize access to higher education by making the admission process transparent, efficient, and inclusive for every student.' },
              { icon: Eye, color: '#7c3aed', bg: '#f5f3ff',
                label: 'Our Vision',
                text: 'A future where every deserving student gets a fair shot at their dream institution without bureaucracy standing in their way.' },
              { icon: Heart, color: '#e11d48', bg: '#fff1f2',
                label: 'Our Values',
                text: 'Integrity, Accessibility, Innovation, and Student-first thinking guide every feature and decision we make on this platform.' },
            ].map(({ icon: Icon, color, bg, label, text }) => (
              <div key={label} style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 14, padding: '1.5rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = bg; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
              >
                <div style={{
                  background: bg, borderRadius: 10, padding: '0.65rem',
                  flexShrink: 0, border: `1px solid ${color}22`,
                }}>
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.4rem' }}>{label}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: 1.7 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              background: '#f0fdf4', color: '#16a34a',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700,
            }}>WHAT WE STAND FOR</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>Our Core Values</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { icon: Shield,       color: '#2563eb', bg: '#eff6ff', title: 'Integrity',     desc: 'Transparent processes with no hidden steps or surprises in your admission journey.' },
              { icon: Globe,        color: '#7c3aed', bg: '#f5f3ff', title: 'Accessibility', desc: 'Built to work for every student — regardless of device, connectivity, or background.' },
              { icon: TrendingUp,   color: '#0891b2', bg: '#ecfeff', title: 'Innovation',    desc: 'Constantly evolving our platform with the latest technology to serve you better.' },
              { icon: Users,        color: '#16a34a', bg: '#f0fdf4', title: 'Inclusivity',   desc: 'Every feature is designed with every type of student in mind, without compromise.' },
              { icon: Award,        color: '#d97706', bg: '#fffbeb', title: 'Excellence',    desc: 'We hold ourselves to the highest standard so your experience is always first-class.' },
              { icon: BookOpen,     color: '#e11d48', bg: '#fff1f2', title: 'Education First', desc: 'We believe education is a right, not a privilege, and our portal reflects that belief.' },
            ].map(v => <ValueCard key={v.title} {...v} />)}
          </div>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '4rem', alignItems: 'start',
        }}>
          <div>
            <span style={{
              background: '#eff6ff', color: '#2563eb',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700,
            }}>OUR JOURNEY</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', lineHeight: 1.3,
              letterSpacing: '-0.5px',
            }}>12 Years of Making<br />Admissions Better</h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginTop: '1rem', fontSize: '0.93rem' }}>
              Every milestone in our journey has been shaped by feedback from students like you.
            </p>
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            {[
              { year: '2012', title: 'Founded', desc: 'AdmitPortal launched with a pilot programme at 3 institutions.' },
              { year: '2015', title: 'Digital Documents', desc: 'Introduced fully paperless document submission and verification.' },
              { year: '2018', title: 'Mobile-First', desc: 'Redesigned the entire platform for mobile with offline support.' },
              { year: '2020', title: 'Scaled to 10,000+', desc: 'Crossed 10,000 successful admissions during the COVID lockdown year.' },
              { year: '2024', title: 'AI-Powered Review', desc: 'Launched smart document verification and merit ranking features.' },
            ].map(m => <Milestone key={m.year} {...m} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              background: '#fef3c7', color: '#d97706',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700,
            }}>THE TEAM</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>People Who Built This for You</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { name: 'Dr. Ramesh Iyer',    role: 'Founder & CEO',          dept: 'Education Technology',  initials: 'RI', gradient: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
              { name: 'Sunita Verma',        role: 'Head of Product',        dept: 'UX & Student Experience', initials: 'SV', gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)' },
              { name: 'Kiran Das',           role: 'Lead Engineer',          dept: 'Platform & Security',   initials: 'KD', gradient: 'linear-gradient(135deg,#0891b2,#0e7490)' },
              { name: 'Anita Krishnamurthy', role: 'Admissions Specialist',  dept: 'Student Relations',     initials: 'AK', gradient: 'linear-gradient(135deg,#16a34a,#15803d)' },
              { name: 'Mohit Ahuja',         role: 'Data & Analytics',       dept: 'Insights & Reporting',  initials: 'MA', gradient: 'linear-gradient(135deg,#d97706,#b45309)' },
              { name: 'Preethi Nair',        role: 'Student Support Lead',   dept: 'Help & Guidance',       initials: 'PN', gradient: 'linear-gradient(135deg,#e11d48,#be123c)' },
            ].map(t => <TeamCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section style={{
        padding: '3.5rem 2rem',
        background: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px' }}>
            ACCREDITED &amp; RECOGNISED BY
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {['NAAC A+', 'UGC Approved', 'AICTE Affiliated', 'NBA Accredited', 'ISO 9001:2015', 'NIRF Ranked'].map(b => (
              <div key={b} style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10, padding: '0.6rem 1.25rem',
                color: '#fff', fontSize: '0.88rem', fontWeight: 600,
                backdropFilter: 'blur(4px)',
              }}>{b}</div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/register" style={{
              background: '#fff', color: '#1d4ed8',
              padding: '0.9rem 2.5rem', borderRadius: 10,
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}>
              Apply Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
