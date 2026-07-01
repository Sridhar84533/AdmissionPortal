import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Video, MapPin, RefreshCw, XCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { API_BASE } from '../config';

export default function Appointments() {
  const { token } = useAuth();
  const [apptData, setApptData] = useState(null);
  const [appStatus, setAppStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchData = async () => {
    try {
      const appRes = await fetch(`${API_BASE}/api/application`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (appRes.ok) {
        const app = await appRes.json();
        setAppStatus(app.status);
      }

      const res = await fetch(`${API_BASE}/api/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApptData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading interview schedule...</div>;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle size={20} style={{ color: 'var(--color-verified)' }} />;
      case 'Pending': return <AlertCircle size={20} style={{ color: 'var(--color-review)' }} />;
      case 'Rescheduled': return <RefreshCw size={20} style={{ color: 'var(--color-review)' }} />;
      default: return null;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {message.text && (
        <div style={{
          backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
          color: message.type === 'success' ? 'var(--color-verified)' : 'var(--color-rejected)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {message.text}
        </div>
      )}

      {/* Admission Process Completed Screen */}
      {(appStatus === 'Admission Approved' || appStatus === 'Offer Letter Generated') ? (
        <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <CheckCircle size={48} style={{ color: 'var(--color-verified)', marginBottom: '1rem' }} />
          <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Admission Process Completed!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
            Congratulations! Your admission process has been successfully completed and approved. You no longer have any pending entrance interview slots.
          </p>
        </div>
      ) : apptData && !isRescheduling ? (
        /* Appointment Information Card if scheduled */
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800 }}>Upcoming Interview</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Your scheduled entrance verification meeting</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-app)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid var(--border)' }}>
              {getStatusIcon(apptData.status)}
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{apptData.status}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <Calendar size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>INTERVIEW DATE</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>{new Date(apptData.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <Clock size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>INTERVIEW TIME</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>{apptData.time}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                {apptData.mode === 'Online' ? <Video size={20} /> : <MapPin size={20} />}
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>INTERVIEW MODE</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>{apptData.mode}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
              * This interview has been scheduled by the Admissions Admin. If you need to make changes, please contact the support desk.
            </p>
          </div>
        </div>
      ) : (
        /* Read-only No Appointment Message */
        <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            No Interview Scheduled Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
            Your entrance verification interview will be scheduled by the Admissions Team once your submitted details and certificates have been reviewed. You will receive an alert and notification once scheduled.
          </p>
        </div>
      )}

    </div>
  );
}
