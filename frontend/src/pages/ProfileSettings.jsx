import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Lock, Eye, Key } from 'lucide-react';

export default function ProfileSettings() {
  const { user, changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters', type: 'error' });
      return;
    }

    if (!newPassword.includes('#')) {
      setMessage({ text: 'New password must contain the "#" symbol (e.g. Pass#word1)', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      await changePassword(oldPassword, newPassword);
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Account Info Card */}
      <div className="form-card">
        <h3 className="form-section-title">
          <Settings size={20} />
          Profile Credentials
        </h3>
        
        <div className="profile-grid">
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>FULL NAME</p>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.25rem' }}>{user?.name}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>EMAIL ADDRESS</p>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.25rem' }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="form-card">
        <h3 className="form-section-title">
          <Lock size={20} />
          Change Password
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="form-group">
            <label>Current Password *</label>
            <input 
              type="password" 
              className="form-control"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label>New Password *</label>
            <input 
              type="password" 
              className="form-control"
              required
              placeholder="Min. 6 chars, must include #"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={submitting}
            />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.35rem' }}>
              💡 Password must include the <strong>#</strong> symbol (e.g. <em>MyPass#1</em>)
            </p>
          </div>

          <div className="form-group">
            <label>Confirm New Password *</label>
            <input 
              type="password" 
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
            style={{ width: 'fit-content', marginTop: '0.5rem' }}
          >
            Update Password
          </button>

        </form>
      </div>

    </div>
  );
}
