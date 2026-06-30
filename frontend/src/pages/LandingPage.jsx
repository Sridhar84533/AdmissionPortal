import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, FileText, CheckCircle, Clock, Upload,
  Bell, Star, ArrowRight, ChevronRight, Users, BookOpen,
  Award, Shield, Zap, Globe, TrendingUp, Heart
} from 'lucide-react';

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Floating SVG Illustration ─────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto' }}>
      {/* Main card */}
      <div style={{
        background: '#fff', borderRadius: 20,
        padding: '2rem', boxShadow: '0 20px 60px rgba(37,99,235,0.12)',
        border: '1px solid #e2e8f0', animation: 'float 4s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            borderRadius: 14, width: 52, height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GraduationCap size={26} color="#fff" />
          </div>
          <div>
            <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>Application Status</p>
            <p style={{ color: '#64748b', fontSize: '0.83rem' }}>Engineering Programme 2025</p>
          </div>
          <span style={{
            marginLeft: 'auto', background: '#dcfce7', color: '#16a34a',
            padding: '0.3rem 0.8rem', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700,
          }}>ACTIVE</span>
        </div>
        {/* Progress steps */}
        {[
          { label: 'Personal Info',    done: true  },
          { label: 'Academic Records', done: true  },
          { label: 'Documents Upload', done: true  },
          { label: 'Payment',          done: false },
          { label: 'Submitted',        done: false },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.6rem 0',
            borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: s.done ? '#2563eb' : '#f1f5f9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {s.done
                ? <CheckCircle size={16} color="#fff" />
                : <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>{i + 1}</span>}
            </div>
            <span style={{
              fontSize: '0.88rem', fontWeight: 600,
              color: s.done ? '#0f172a' : '#94a3b8',
            }}>{s.label}</span>
            {s.done && <CheckCircle size={14} color="#16a34a" style={{ marginLeft: 'auto' }} />}
          </div>
        ))}
        {/* CTA */}
        <div style={{
          marginTop: '1.25rem',
          background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
          borderRadius: 12, padding: '0.85rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>Complete Payment →</span>
          <span style={{
            background: 'rgba(255,255,255,0.15)', borderRadius: 8,
            padding: '0.3rem 0.7rem', color: '#fff', fontSize: '0.82rem',
          }}>₹2,500</span>
        </div>
      </div>

      {/* Floating badge 1 */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        background: '#fff', borderRadius: 14, padding: '0.75rem 1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        animation: 'float 4s ease-in-out 1s infinite',
      }}>
        <div style={{ background: '#fef3c7', borderRadius: 8, padding: '0.4rem' }}>
          <Bell size={16} color="#d97706" />
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>New Notification</p>
          <p style={{ fontSize: '0.68rem', color: '#64748b' }}>Document verified!</p>
        </div>
      </div>

      {/* Floating badge 2 */}
      <div style={{
        position: 'absolute', bottom: -16, left: -20,
        background: '#fff', borderRadius: 14, padding: '0.75rem 1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        animation: 'float 4s ease-in-out 2s infinite',
      }}>
        <div style={{ background: '#dcfce7', borderRadius: 8, padding: '0.4rem' }}>
          <Award size={16} color="#16a34a" />
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Merit List</p>
          <p style={{ fontSize: '0.68rem', color: '#64748b' }}>You're ranked #12!</p>
        </div>
      </div>
    </div>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, color, bg, title, desc, delay }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 16, padding: '2rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
      animation: `fadeSlideUp 0.6s ease-out ${delay}s both`,
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(37,99,235,0.1)';
        e.currentTarget.style.borderColor = '#2563eb';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      <div style={{
        background: bg, borderRadius: 12, width: 52, height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.25rem',
      }}>
        <Icon size={24} color={color} />
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

// ── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({ num, title, desc, icon: Icon }) {
  return (
    <div style={{
      textAlign: 'center', padding: '2rem 1.5rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
        }}>
          <Icon size={28} color="#fff" />
        </div>
        <div style={{
          position: 'absolute', top: -8, right: -8,
          background: '#0f172a', color: '#fff', borderRadius: '50%',
          width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.72rem', fontWeight: 800,
        }}>{num}</div>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 220 }}>{desc}</p>
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestiCard({ name, programme, text, avatar }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
      padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
        {[1,2,3,4,5].map(s => <Star key={s} size={15} color="#f59e0b" fill="#f59e0b" />)}
      </div>
      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>"{text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: '1rem',
        }}>{avatar}</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{name}</p>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{programme}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-badge:hover { background: #dbeafe !important; }
        .pub-cta-primary:hover { background: #1d4ed8 !important; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.4) !important; }
        .pub-cta-outline:hover { background: #f8fafc !important; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(165deg, #f0f7ff 0%, #eff6ff 40%, #f8fafc 100%)',
        padding: '5rem 2rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.07), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '4rem', alignItems: 'center',
        }}>
          {/* Left */}
          <div style={{ animation: 'fadeSlideLeft 0.7s ease-out both' }}>
            <div className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#dbeafe', borderRadius: 50,
              padding: '0.4rem 1rem', marginBottom: '1.5rem',
              cursor: 'default', transition: 'background 0.2s',
            }}>
              <Zap size={14} color="#2563eb" />
              <span style={{ color: '#1d4ed8', fontSize: '0.82rem', fontWeight: 700 }}>
                100% Online Admissions — Fast & Secure
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 800, color: '#0f172a',
              lineHeight: 1.15, marginBottom: '1.25rem',
              letterSpacing: '-1px',
            }}>
              Your Journey to{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Higher Education</span>{' '}
              Starts Here
            </h1>

            <p style={{
              fontSize: '1.1rem', color: '#475569',
              lineHeight: 1.8, marginBottom: '2rem', maxWidth: 500,
            }}>
              Apply to your dream programme with ease. Track your application, upload documents,
              make payments, and stay updated — all in one place.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="pub-cta-primary" style={{
                background: '#2563eb', color: '#fff',
                padding: '0.85rem 2rem', borderRadius: 10,
                fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                transition: 'all 0.25s ease',
              }}>
                Start Application <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="pub-cta-outline" style={{
                background: '#fff', color: '#0f172a',
                padding: '0.85rem 2rem', borderRadius: 10,
                fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: '0.5rem',
                border: '1.5px solid #e2e8f0',
                transition: 'all 0.25s ease',
              }}>
                Learn More <ChevronRight size={18} />
              </Link>
            </div>

            {/* Trust logos strip */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '1.5rem', marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>TRUSTED BY</span>
              {['NAAC A+', 'UGC', 'AICTE', 'NBA'].map(badge => (
                <div key={badge} style={{
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: 8, padding: '0.4rem 0.85rem',
                  fontSize: '0.8rem', fontWeight: 700, color: '#475569',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}>{badge}</div>
              ))}
            </div>
          </div>

          {/* Right — Illustration */}
          <div style={{ animation: 'fadeSlideRight 0.7s ease-out 0.2s both' }}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
        padding: '2.5rem 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
          gap: '2rem',
        }}>
          {[
            { value: 15000, suffix: '+', label: 'Applications' },
            { value: 98,    suffix: '%', label: 'Success Rate' },
            { value: 42,    suffix: '+', label: 'Programmes' },
            { value: 12,    suffix: '',  label: 'Years Excellence' },
          ].map(({ value, suffix, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '2.4rem', fontWeight: 800, color: '#fff',
                lineHeight: 1,
              }}>
                <Counter target={value} suffix={suffix} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              background: '#eff6ff', color: '#2563eb',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.5px',
            }}>FEATURES</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>Everything You Need to Apply</h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.75rem', maxWidth: 520, margin: '0.75rem auto 0' }}>
              A complete platform built for students, by education experts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { icon: FileText,    color: '#2563eb', bg: '#eff6ff', title: 'Digital Applications',    desc: 'Fill your application form digitally with smart autosave. No paper, no queues.',                      delay: 0.0 },
              { icon: Upload,      color: '#7c3aed', bg: '#f5f3ff', title: 'Document Upload',          desc: 'Upload all required documents securely. Instant verification status.',                                delay: 0.1 },
              { icon: TrendingUp,  color: '#0891b2', bg: '#ecfeff', title: 'Real-Time Tracking',       desc: 'Monitor every step of your application from submission to enrollment.',                               delay: 0.2 },
              { icon: Shield,      color: '#16a34a', bg: '#f0fdf4', title: 'Secure Payments',          desc: 'Pay application fees securely online. Multiple payment methods supported.',                          delay: 0.3 },
              { icon: Clock,       color: '#d97706', bg: '#fffbeb', title: 'Schedule Appointments',    desc: 'Book counselling sessions and entrance exam slots directly from the portal.',                        delay: 0.4 },
              { icon: Bell,        color: '#dc2626', bg: '#fef2f2', title: 'Smart Notifications',      desc: 'Get instant alerts via email and in-app for every status change.',                                   delay: 0.5 },
              { icon: Globe,       color: '#2563eb', bg: '#eff6ff', title: 'Any Device, Anywhere',     desc: 'Fully responsive portal. Apply on mobile, tablet or desktop seamlessly.',                            delay: 0.6 },
              { icon: Heart,       color: '#e11d48', bg: '#fff1f2', title: 'Dedicated Support',        desc: 'Our team is always ready to help you through every stage of your admission.',                       delay: 0.7 },
            ].map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(165deg, #eff6ff, #f8fafc)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              background: '#eff6ff', color: '#2563eb',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.5px',
            }}>HOW IT WORKS</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>Apply in 4 Simple Steps</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1rem', position: 'relative',
          }}>
            {[
              { num: 1, icon: Users,       title: 'Register',          desc: 'Create your free account with your email and basic details.' },
              { num: 2, icon: FileText,    title: 'Fill Application',  desc: 'Complete your personal and academic information carefully.' },
              { num: 3, icon: Upload,      title: 'Upload Documents',  desc: 'Submit scanned copies of required certificates and IDs.' },
              { num: 4, icon: CheckCircle, title: 'Pay & Submit',      desc: 'Pay the application fee and submit your completed form.' },
            ].map(s => <StepCard key={s.num} {...s} />)}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/register" style={{
              background: '#2563eb', color: '#fff',
              padding: '0.9rem 2.5rem', borderRadius: 10,
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
            }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              background: '#fef3c7', color: '#d97706',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.5px',
            }}>TESTIMONIALS</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>What Students Say</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { name: 'Priya Sharma',   programme: 'B.Tech CSE, 2024',       text: 'The portal made my entire admission process so smooth. I could track everything from my phone!',                 avatar: 'P' },
              { name: 'Arjun Mehta',    programme: 'MBA Finance, 2024',       text: 'Uploading documents was incredibly easy. The status updates kept me stress-free throughout.',                     avatar: 'A' },
              { name: 'Sneha Reddy',    programme: 'M.Sc Data Science, 2024', text: 'The appointment booking feature saved me so much time. Got my counselling slot in just 2 minutes!',             avatar: 'S' },
              { name: 'Rahul Gupta',    programme: 'B.Pharm, 2024',           text: 'Best admission portal I\'ve used. Clean design, fast loading and the support team was very helpful.',             avatar: 'R' },
              { name: 'Kavya Nair',     programme: 'LLB, 2024',               text: 'I loved how everything was in one place. No need to visit the college multiple times. Highly recommended!',       avatar: 'K' },
              { name: 'Dev Patel',      programme: 'B.Com, 2024',             text: 'The payment system was super secure. Got my fee receipt instantly. Great experience overall!',                    avatar: 'D' },
            ].map(t => <TestiCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #2563eb 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 650, margin: '0 auto', position: 'relative' }}>
          <div style={{
            background: 'rgba(255,255,255,0.12)', borderRadius: 50,
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.25rem', marginBottom: '1.5rem',
          }}>
            <BookOpen size={15} color="#fff" />
            <span style={{ color: '#fff', fontSize: '0.83rem', fontWeight: 700 }}>Admissions Open — 2025–26</span>
          </div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800, color: '#fff',
            lineHeight: 1.2, marginBottom: '1rem',
            letterSpacing: '-0.5px',
          }}>
            Ready to Begin Your Academic Journey?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Join thousands of successful students who chose a smarter path to higher education.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              background: '#fff', color: '#1d4ed8',
              padding: '0.9rem 2.5rem', borderRadius: 10,
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}>
              Apply Now — It's Free <ArrowRight size={18} />
            </Link>
            <Link to="/contact" style={{
              background: 'transparent', color: '#fff',
              padding: '0.9rem 2.5rem', borderRadius: 10,
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '2px solid rgba(255,255,255,0.5)',
            }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
