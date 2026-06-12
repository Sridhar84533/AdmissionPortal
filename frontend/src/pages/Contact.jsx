import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageSquare, ArrowRight, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';

// ── Contact Info Card ─────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, color, bg, title, lines }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
      padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 32px ${color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
      }}
    >
      <div style={{
        background: bg, borderRadius: 12, padding: '0.75rem',
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.4rem' }}>{title}</h3>
        {lines.map((l, i) => (
          <p key={i} style={{ color: '#64748b', fontSize: '0.87rem', lineHeight: 1.7 }}>{l}</p>
        ))}
      </div>
    </div>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      marginBottom: '0.75rem',
      transition: 'border-color 0.2s',
      borderColor: open ? '#2563eb' : '#e2e8f0',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '1.1rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', gap: '1rem',
          textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{q}</span>
        <div style={{
          flexShrink: 0, color: open ? '#2563eb' : '#94a3b8',
          transition: 'color 0.2s',
        }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      {open && (
        <div style={{
          padding: '0 1.5rem 1.1rem',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  const faqs = [
    {
      q: 'How do I start my application?',
      a: 'Click "Apply Now" or "Register" on the top of any page to create your free account. Once registered, you can start your application form immediately.',
    },
    {
      q: 'What documents do I need to upload?',
      a: 'Typically: 10th & 12th mark sheets, Transfer Certificate, Conduct Certificate, Passport-size photograph, and any programme-specific documents. The portal will list exactly what is needed.',
    },
    {
      q: 'How long does the verification take?',
      a: 'Document verification usually takes 2-5 business days. You will receive an email and in-app notification once your documents are verified.',
    },
    {
      q: 'Can I edit my application after submitting?',
      a: 'You can edit your application until you make the final payment and submit. After final submission, please contact our support team for any corrections.',
    },
    {
      q: 'Is the application fee refundable?',
      a: 'Application fees are generally non-refundable. Please read the specific programme guidelines carefully before making payment.',
    },
    {
      q: 'How do I check my application status?',
      a: 'Log in to your applicant dashboard and navigate to "Application Status". You can see a real-time timeline of every stage of your application.',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.93rem;
          color: #0f172a;
          background: #f8fafc;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }
        .contact-input:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
        }
        .contact-input::placeholder { color: #94a3b8; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(165deg, #eff6ff 0%, #f0f9ff 50%, #f8fafc 100%)',
        padding: '4rem 2rem 5rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -60,
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 640, margin: '0 auto', animation: 'fadeSlideUp 0.7s ease-out both' }}>
          <span style={{
            background: '#eff6ff', color: '#2563eb',
            padding: '0.35rem 1rem', borderRadius: 50,
            fontSize: '0.82rem', fontWeight: 700,
          }}>CONTACT US</span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: '#0f172a',
            marginTop: '1rem', lineHeight: 1.2, letterSpacing: '-0.5px',
          }}>
            We're Here to{' '}
            <span style={{
              background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Help You</span>
          </h1>
          <p style={{
            color: '#475569', fontSize: '1.05rem',
            lineHeight: 1.8, marginTop: '1rem',
          }}>
            Have a question about your application? Need support? Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section style={{ padding: '3rem 2rem', background: '#fff' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { icon: Mail,    color: '#2563eb', bg: '#eff6ff',   title: 'Email Us',       lines: ['admissions@admitportal.edu', 'support@admitportal.edu'] },
            { icon: Phone,   color: '#16a34a', bg: '#f0fdf4',   title: 'Call Us',        lines: ['+91 98765 43210', '+91 98765 43211', 'Mon–Sat, 9 AM – 6 PM'] },
            { icon: MapPin,  color: '#7c3aed', bg: '#f5f3ff',   title: 'Visit Us',       lines: ['123 University Avenue', 'Campus City – 600001'] },
            { icon: Clock,   color: '#d97706', bg: '#fffbeb',   title: 'Office Hours',   lines: ['Monday – Friday: 9 AM – 6 PM', 'Saturday: 10 AM – 2 PM', 'Sunday: Closed'] },
          ].map(c => <InfoCard key={c.title} {...c} />)}
        </div>
      </section>

      {/* ── CONTACT FORM + MAP ── */}
      <section style={{ padding: '2rem 2rem 5rem', background: '#f8fafc' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem', alignItems: 'start',
        }}>
          {/* Form */}
          <div style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 20, padding: '2.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{
                background: '#eff6ff', borderRadius: 10, padding: '0.6rem',
                display: 'flex', alignItems: 'center',
              }}>
                <MessageSquare size={20} color="#2563eb" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0f172a' }}>
                  Send Us a Message
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.83rem' }}>We'll reply within 24 hours</p>
              </div>
            </div>

            {sent ? (
              <div style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 14, padding: '2.5rem',
                textAlign: 'center',
                animation: 'fadeSlideUp 0.4s ease-out',
              }}>
                <CheckCircle size={48} color="#16a34a" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Thank you, {form.name}. We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {error && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca',
                    borderRadius: 10, padding: '0.75rem 1rem',
                    color: '#dc2626', fontSize: '0.88rem',
                  }}>{error}</div>
                )}

                <div className="contact-grid-two">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      className="contact-input"
                      type="text" name="name"
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      className="contact-input"
                      type="email" name="email"
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Subject
                  </label>
                  <select
                    className="contact-input"
                    name="subject"
                    value={form.subject} onChange={handleChange}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Select a topic</option>
                    <option>Application Status</option>
                    <option>Document Verification</option>
                    <option>Payment Issues</option>
                    <option>Programme Information</option>
                    <option>Technical Support</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Message *
                  </label>
                  <textarea
                    className="contact-input"
                    name="message" rows={5}
                    placeholder="Describe your question or issue in detail..."
                    value={form.message} onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? '#93c5fd' : '#2563eb',
                    color: '#fff', border: 'none',
                    padding: '0.9rem 1.5rem', borderRadius: 10,
                    fontWeight: 700, fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#1d4ed8'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#2563eb'; }}
                >
                  {loading ? 'Sending…' : <><Send size={17} /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Map placeholder + social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Map placeholder */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
              borderRadius: 20, padding: '2.5rem',
              color: '#fff', position: 'relative', overflow: 'hidden',
              minHeight: 220,
            }}>
              <div style={{
                position: 'absolute', bottom: -40, right: -40,
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
              }} />
              <MapPin size={32} color="rgba(255,255,255,0.6)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Admissions Office
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                123 University Avenue<br />
                Campus City – 600001<br />
                Tamil Nadu, India
              </p>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Near City Metro Station', 'Free Parking Available'].map(t => (
                  <span key={t} style={{
                    background: 'rgba(255,255,255,0.12)', borderRadius: 50,
                    padding: '0.3rem 0.85rem', fontSize: '0.78rem', fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Quick response card */}
            <div style={{
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 16, padding: '1.75rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '1rem' }}>
                ⚡ Quick Support Channels
              </h3>
              {[
                { icon: '📧', label: 'Email Support', time: 'Response in 24 hours', color: '#eff6ff', border: '#bfdbfe' },
                { icon: '📞', label: 'Phone Support', time: 'Mon–Sat, 9 AM – 6 PM',  color: '#f0fdf4', border: '#bbf7d0' },
                { icon: '💬', label: 'Portal Help Desk', time: 'After login, 7 days a week', color: '#f5f3ff', border: '#ddd6fe' },
              ].map(({ icon, label, time, color, border }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem', borderRadius: 10, marginBottom: '0.5rem',
                  background: color, border: `1px solid ${border}`,
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{label}</p>
                    <p style={{ color: '#64748b', fontSize: '0.78rem' }}>{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              background: '#f5f3ff', color: '#7c3aed',
              padding: '0.35rem 1rem', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 700,
            }}>FAQ</span>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#0f172a',
              marginTop: '0.75rem', letterSpacing: '-0.5px',
            }}>Frequently Asked Questions</h2>
            <p style={{ color: '#64748b', marginTop: '0.75rem', fontSize: '0.93rem' }}>
              Find quick answers to the most common questions from applicants.
            </p>
          </div>
          {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Still have questions?{' '}
              <a href="mailto:support@admitportal.edu" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                Email us directly
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
