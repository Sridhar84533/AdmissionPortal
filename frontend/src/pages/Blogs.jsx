import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, Search, BookOpen, TrendingUp, Users, FileText } from 'lucide-react';

// ── Blog Data ─────────────────────────────────────────────────────────────────
const posts = [
  {
    id: 1,
    category: 'Admission Tips',
    categoryColor: '#2563eb',
    categoryBg: '#eff6ff',
    title: 'How to Write a Winning Statement of Purpose in 2025',
    excerpt: 'Your SOP is the most personal part of your application. Learn how to craft a compelling narrative that gets noticed by admission committees.',
    readTime: '6 min read',
    date: 'Jun 5, 2025',
    author: 'Sunita Verma',
    authorInitials: 'SV',
    authorGradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    featured: true,
    gradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    icon: FileText,
    iconColor: '#2563eb',
  },
  {
    id: 2,
    category: 'Scholarships',
    categoryColor: '#16a34a',
    categoryBg: '#f0fdf4',
    title: 'Top 10 Merit Scholarships You Can Apply For Right Now',
    excerpt: 'Funding your education shouldn\'t be a mystery. Here are 10 merit-based scholarships with open applications this season — with eligibility and deadlines.',
    readTime: '8 min read',
    date: 'May 28, 2025',
    author: 'Anita Krishnamurthy',
    authorInitials: 'AK',
    authorGradient: 'linear-gradient(135deg,#16a34a,#15803d)',
    featured: false,
    gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    icon: TrendingUp,
    iconColor: '#16a34a',
  },
  {
    id: 3,
    category: 'Entrance Exams',
    categoryColor: '#d97706',
    categoryBg: '#fffbeb',
    title: 'JEE, NEET, CAT 2025 — Complete Exam Calendar & Prep Guide',
    excerpt: 'All major entrance exam dates, syllabus highlights, and week-by-week preparation strategies consolidated in one detailed guide.',
    readTime: '10 min read',
    date: 'May 20, 2025',
    author: 'Mohit Ahuja',
    authorInitials: 'MA',
    authorGradient: 'linear-gradient(135deg,#d97706,#b45309)',
    featured: false,
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    icon: BookOpen,
    iconColor: '#d97706',
  },
  {
    id: 4,
    category: 'Career Guidance',
    categoryColor: '#7c3aed',
    categoryBg: '#f5f3ff',
    title: 'Engineering vs Management: Which Postgraduate Path is Right for You?',
    excerpt: 'Choosing between an M.Tech and an MBA is one of the biggest decisions of your career. This guide breaks down ROI, growth, and opportunities for each.',
    readTime: '7 min read',
    date: 'May 14, 2025',
    author: 'Dr. Ramesh Iyer',
    authorInitials: 'RI',
    authorGradient: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
    featured: false,
    gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    icon: Users,
    iconColor: '#7c3aed',
  },
  {
    id: 5,
    category: 'Student Life',
    categoryColor: '#0891b2',
    categoryBg: '#ecfeff',
    title: 'How to Prepare for Your First Day at University',
    excerpt: 'From packing your hostel room to making friends in the first week — a practical guide for new undergraduates heading to campus life.',
    readTime: '5 min read',
    date: 'May 8, 2025',
    author: 'Preethi Nair',
    authorInitials: 'PN',
    authorGradient: 'linear-gradient(135deg,#e11d48,#be123c)',
    featured: false,
    gradient: 'linear-gradient(135deg, #ecfeff, #cffafe)',
    icon: BookOpen,
    iconColor: '#0891b2',
  },
  {
    id: 6,
    category: 'Admission Tips',
    categoryColor: '#2563eb',
    categoryBg: '#eff6ff',
    title: 'Documents You Must Have Ready Before Applying',
    excerpt: 'Missing even one document can delay your entire application. Here is the definitive checklist of every certificate, ID, and record you\'ll need.',
    readTime: '4 min read',
    date: 'Apr 30, 2025',
    author: 'Kiran Das',
    authorInitials: 'KD',
    authorGradient: 'linear-gradient(135deg,#0891b2,#0e7490)',
    featured: false,
    gradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    icon: FileText,
    iconColor: '#2563eb',
  },
  {
    id: 7,
    category: 'Scholarships',
    categoryColor: '#16a34a',
    categoryBg: '#f0fdf4',
    title: 'Government Scholarship Schemes for OBC and EWS Students',
    excerpt: 'A complete overview of state and central government scholarship programmes available specifically for OBC, SC, ST, and EWS category students.',
    readTime: '9 min read',
    date: 'Apr 22, 2025',
    author: 'Anita Krishnamurthy',
    authorInitials: 'AK',
    authorGradient: 'linear-gradient(135deg,#16a34a,#15803d)',
    featured: false,
    gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    icon: TrendingUp,
    iconColor: '#16a34a',
  },
  {
    id: 8,
    category: 'Career Guidance',
    categoryColor: '#7c3aed',
    categoryBg: '#f5f3ff',
    title: 'Top 5 Emerging Programmes to Apply for in 2025',
    excerpt: 'From AI & ML to Sustainable Engineering and Data Journalism — explore the newest high-growth programmes now accepting applications.',
    readTime: '6 min read',
    date: 'Apr 15, 2025',
    author: 'Sunita Verma',
    authorInitials: 'SV',
    authorGradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    featured: false,
    gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    icon: TrendingUp,
    iconColor: '#7c3aed',
  },
];

const categories = ['All', 'Admission Tips', 'Scholarships', 'Entrance Exams', 'Career Guidance', 'Student Life'];

// ── Blog Card ─────────────────────────────────────────────────────────────────
function BlogCard({ post, featured }) {
  const Icon = post.icon;
  if (featured) {
    return (
      <div style={{
        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
        overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        transition: 'all 0.3s ease',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(37,99,235,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'; }}
      >
        {/* Visual side */}
        <div style={{
          background: post.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 220, padding: '3rem',
          position: 'relative',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 20, padding: '2rem',
            textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}>
            <div style={{
              background: post.categoryBg, borderRadius: 14, width: 60, height: 60,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <Icon size={26} color={post.iconColor} />
            </div>
            <span style={{
              background: post.categoryBg, color: post.categoryColor,
              padding: '0.3rem 0.8rem', borderRadius: 50,
              fontSize: '0.75rem', fontWeight: 700,
            }}>FEATURED</span>
          </div>
        </div>
        {/* Content side */}
        <div style={{ padding: '2.5rem' }}>
          <span style={{
            background: post.categoryBg, color: post.categoryColor,
            padding: '0.3rem 0.8rem', borderRadius: 50,
            fontSize: '0.75rem', fontWeight: 700,
          }}>{post.category}</span>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.4rem', fontWeight: 800, color: '#0f172a',
            margin: '1rem 0 0.75rem', lineHeight: 1.3,
            letterSpacing: '-0.3px',
          }}>{post.title}</h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: post.authorGradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.8rem', fontWeight: 800,
              }}>{post.authorInitials}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{post.author}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.78rem' }}>
                  <span>{post.date}</span> · <Clock size={11} /> <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <button style={{
              background: '#2563eb', color: '#fff', border: 'none',
              borderRadius: 8, padding: '0.5rem 1.1rem',
              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            >
              Read More <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16,
      overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = post.categoryColor; e.currentTarget.style.boxShadow = `0 16px 40px ${post.categoryColor}18`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
    >
      {/* Top visual */}
      <div style={{
        background: post.gradient, height: 120,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.85)', borderRadius: 14, padding: '1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}>
          <Icon size={28} color={post.iconColor} />
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{
          background: post.categoryBg, color: post.categoryColor,
          padding: '0.25rem 0.7rem', borderRadius: 50,
          fontSize: '0.72rem', fontWeight: 700,
          display: 'inline-block', marginBottom: '0.85rem',
        }}>{post.category}</span>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.05rem', fontWeight: 800, color: '#0f172a',
          lineHeight: 1.35, marginBottom: '0.75rem',
          letterSpacing: '-0.2px',
        }}>{post.title}</h3>
        <p style={{
          color: '#64748b', fontSize: '0.87rem', lineHeight: 1.75,
          marginBottom: '1.25rem', flex: 1,
        }}>{post.excerpt}</p>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #f1f5f9', paddingTop: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: post.authorGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '0.7rem', fontWeight: 800,
            }}>{post.authorInitials}</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0f172a' }}>{post.author}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8', fontSize: '0.72rem' }}>
                <Clock size={10} /> {post.readTime}
              </div>
            </div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{post.date}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const featured = posts.find(p => p.featured);
  const filtered = posts
    .filter(p => !p.featured)
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p =>
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-btn { transition: all 0.2s ease; }
        .cat-btn:hover { background: #eff6ff !important; color: #2563eb !important; border-color: #bfdbfe !important; }
        .search-input { transition: all 0.2s ease; outline: none; }
        .search-input:focus { border-color: #2563eb !important; background: #fff !important; box-shadow: 0 0 0 4px rgba(37,99,235,0.08) !important; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(165deg, #eff6ff 0%, #f0f9ff 50%, #f8fafc 100%)',
        padding: '4rem 2rem 5rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, left: -60,
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 640, margin: '0 auto', animation: 'fadeSlideUp 0.7s ease-out both' }}>
          <span style={{
            background: '#eff6ff', color: '#2563eb',
            padding: '0.35rem 1rem', borderRadius: 50,
            fontSize: '0.82rem', fontWeight: 700,
          }}>ADMISSIONS BLOG</span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, color: '#0f172a',
            marginTop: '1rem', lineHeight: 1.2, letterSpacing: '-0.5px',
          }}>
            Insights, Tips &{' '}
            <span style={{
              background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Guidance</span>
            <br />for Every Applicant
          </h1>
          <p style={{
            color: '#475569', fontSize: '1.05rem',
            lineHeight: 1.8, marginTop: '1rem',
          }}>
            Expert advice on applications, scholarships, entrance exams, and student life
            — all in one place.
          </p>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: '#fff', border: '1.5px solid #e2e8f0',
            borderRadius: 12, padding: '0.6rem 1rem',
            maxWidth: 460, margin: '2rem auto 0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            <Search size={18} color="#94a3b8" />
            <input
              className="search-input"
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                border: 'none', background: 'none', flex: 1,
                fontFamily: 'Inter, sans-serif', fontSize: '0.93rem',
                color: '#0f172a',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem', position: 'sticky', top: 68, zIndex: 80,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Tag size={15} color="#94a3b8" style={{ marginRight: '0.25rem' }} />
          {categories.map(cat => (
            <button
              key={cat}
              className="cat-btn"
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 50,
                border: `1.5px solid ${activeCategory === cat ? '#2563eb' : '#e2e8f0'}`,
                background: activeCategory === cat ? '#2563eb' : '#fff',
                color: activeCategory === cat ? '#fff' : '#475569',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
              }}
            >{cat}</button>
          ))}
          <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.83rem' }}>
            {filtered.length + (activeCategory === 'All' && search === '' ? 1 : 0)} articles
          </span>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section style={{ padding: '3rem 2rem 5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Featured */}
          {featured && activeCategory === 'All' && search === '' && (
            <div style={{ marginBottom: '2.5rem' }}>
              <BlogCard post={featured} featured={true} />
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}>
              {filtered.map(post => <BlogCard key={post.id} post={post} featured={false} />)}
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '4rem 2rem',
              background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0',
            }}>
              <BookOpen size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem' }}>No articles found</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Try a different search term or category.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div style={{
            marginTop: '3.5rem',
            background: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)',
            borderRadius: 20, padding: '3rem 2rem',
            textAlign: 'center', color: '#fff',
          }}>
            <h3 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800,
              fontSize: '1.5rem', marginBottom: '0.6rem',
            }}>Never Miss an Update</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem', fontSize: '0.93rem' }}>
              Get the latest admission tips and scholarship alerts straight to your inbox.
            </p>
            <div style={{
              display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap',
              maxWidth: 480, margin: '0 auto',
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1, minWidth: 220, padding: '0.8rem 1.1rem',
                  borderRadius: 10, border: 'none', fontFamily: 'Inter, sans-serif',
                  fontSize: '0.93rem', outline: 'none',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              />
              <button style={{
                background: '#fff', color: '#1d4ed8',
                border: 'none', borderRadius: 10,
                padding: '0.8rem 1.5rem',
                fontWeight: 700, fontSize: '0.93rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}>
                Subscribe <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
