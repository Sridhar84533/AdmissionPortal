import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckSquare, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function Notifications() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const list = await res.json();
        setNotifications(list);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchNotifications();
  }, [token]);

  const handleMarkRead = async () => {
    setMarking(true);
    try {
      const res = await fetch('/api/notifications/read', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(false);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'error': return <XCircle size={18} />;
      case 'warning': return <AlertTriangle size={18} />;
      default: return <Info size={18} />;
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading alerts...</div>;
  }

  const unreadExist = notifications.some(n => !n.read);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="form-section-title" style={{ border: 'none', marginBottom: 0 }}>
          Notification History
        </h3>
        {unreadExist && (
          <button 
            onClick={handleMarkRead}
            disabled={marking}
            className="btn btn-secondary" 
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', display: 'flex', gap: '0.25rem' }}
          >
            <CheckSquare size={14} />
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
          <Bell size={36} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
          <p>No notifications yet. You will see alerts here when documents are reviewed or milestones are reached.</p>
        </div>
      ) : (
        <div className="notification-list animate-fade-in">
          {notifications.map((n, idx) => (
            <div key={idx} className={`notification-item ${!n.read ? 'unread' : ''}`}>
              <div className={`notification-icon-container ${n.type || 'info'}`}>
                {getNotifIcon(n.type)}
              </div>
              <div className="notification-text" style={{ flexGrow: 1 }}>
                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.text}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
