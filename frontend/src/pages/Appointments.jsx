import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Video, MapPin, RefreshCw, XCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { API_BASE } from '../config';

export default function Appointments() {
  const { token } = useAuth();
  const [apptData, setApptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Form values
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('Online');
  const [isRescheduling, setIsRescheduling] = useState(false);

  const fetchAppointment = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApptData(data);
        if (data) {
          setDate(data.date);
          setTime(data.time);
          setMode(data.mode);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAppointment();
  }, [token]);

  const handleBook = async (e) => {
    e.preventDefault();
    setBooking(true);
    setMessage({ text: '', type: '' });

    const endpoint = isRescheduling ? '/api/appointments/reschedule' : '/api/appointments/book';
    const method = isRescheduling ? 'PUT' : 'POST';

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, time, mode })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Operation failed');

      setApptData(data.appointment);
      setMessage({ text: isRescheduling ? 'Appointment rescheduled successfully!' : 'Appointment booked successfully!', type: 'success' });
      setIsRescheduling(false);
      fetchAppointment();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your upcoming appointment?')) return;

    setBooking(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`${API_BASE}/api/appointments/cancel`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Cancellation failed');
      }

      setApptData(null);
      setDate('');
      setTime('');
      setMessage({ text: 'Appointment cancelled successfully.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setBooking(false);
    }
  };

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

      {/* Appointment Information Card if scheduled */}
      {apptData && !isRescheduling ? (
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
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

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsRescheduling(true)}
              disabled={booking}
            >
              <RefreshCw size={16} />
              Reschedule
            </button>
            <button 
              className="btn btn-danger" 
              onClick={handleCancel}
              disabled={booking}
            >
              <XCircle size={16} />
              Cancel Appointment
            </button>
          </div>
        </div>
      ) : (
        /* Booking / Rescheduling Form */
        <div className="form-card">
          <h3 className="form-section-title">
            <Calendar size={20} />
            {isRescheduling ? 'Reschedule Interview Slot' : 'Book Interview Appointment'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Select your preferred slot from available dates. Entrance interviews will help verify eligibility.
          </p>

          <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-grid">
              <div className="form-group">
                <label>Interview Date *</label>
                <input 
                  type="date" 
                  className="form-control"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={booking}
                />
              </div>

              <div className="form-group">
                <label>Interview Time *</label>
                <select 
                  className="form-control"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={booking}
                >
                  <option value="">-- Choose Slot --</option>
                  <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                  <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                  <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                  <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Interview Mode *</label>
                <select 
                  className="form-control"
                  required
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  disabled={booking}
                >
                  <option value="Online">Online (Video Meet)</option>
                  <option value="Offline">Offline (Campus Visit)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={booking}
              >
                {booking ? 'Scheduling...' : isRescheduling ? 'Confirm Reschedule' : 'Book Appointment'}
              </button>
              
              {isRescheduling && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsRescheduling(false)}
                  disabled={booking}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
