import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, Check } from 'lucide-react';
import { API_BASE } from '../config';

export default function ApplyProgramme() {
  const { token } = useAuth();
  const [category, setCategory] = useState('');
  const [stream, setStream] = useState('');
  const [currentApp, setCurrentApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!token) return;
    const fetchApp = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const app = await res.json();
          setCurrentApp(app);
          if (app.programmeCategory) setCategory(app.programmeCategory);
          if (app.programmeStream) setStream(app.programmeStream);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [token]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!category || !stream) {
      setMessage({ text: 'Please select both Category and Stream', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${API_BASE}/api/application/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          programmeCategory: category,
          programmeStream: stream
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save programme selections');

      setCurrentApp(data);
      setMessage({ text: 'Programme selections updated successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading application details...</div>;
  }

  const streams = {
    Postgraduate: ['MCA', 'MBA', 'M.Sc Data Science', 'M.Sc AI', 'M.Com', 'MA English'],
    Research: ['Ph.D Computer Science', 'Ph.D Management Studies', 'Ph.D Biotechnology'],
    'Professional Courses': ['Digital Marketing PG Diploma', 'Data Analytics Boot Camp', 'Cybersecurity Certification']
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="form-card">
        <h3 className="form-section-title">
          <Award size={20} />
          Select Programme & Stream
        </h3>

        {message.text && (
          <div style={{
            backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
            color: message.type === 'success' ? 'var(--color-verified)' : 'var(--color-rejected)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="form-group">
            <label>Programme Category</label>
            <select 
              className="form-control"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setStream(''); // Reset stream on category change
              }}
              required
              disabled={currentApp?.status !== 'Draft'}
            >
              <option value="">-- Choose Category --</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Research">Research</option>
              <option value="Professional Courses">Professional Courses</option>
            </select>
          </div>

          <div className="form-group">
            <label>Programme Stream</label>
            <select 
              className="form-control"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              required
              disabled={!category || currentApp?.status !== 'Draft'}
            >
              <option value="">-- Choose Stream --</option>
              {category && streams[category]?.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Fee Section */}
          <div style={{
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem'
          }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Application Fee</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Non-refundable application processing fee</p>
            </div>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Outfit' }}>
              ₹1500
            </span>
          </div>

          {currentApp?.status === 'Draft' ? (
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
              style={{ marginTop: '1rem', width: 'fit-content', alignSelf: 'flex-start' }}
            >
              {submitting ? 'Applying...' : 'Apply Now'}
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-verified)',
              fontWeight: 700,
              fontSize: '0.95rem',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginTop: '1rem'
            }}>
              <Check size={18} />
              <span>You have already applied for this stream. Current status: {currentApp?.status}</span>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
