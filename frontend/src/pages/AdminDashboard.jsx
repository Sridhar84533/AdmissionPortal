import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, X, RefreshCw, Eye, Download, Users, Mail, Phone, BookOpen, GraduationCap, ShieldAlert, Calendar } from 'lucide-react';
import { API_BASE } from '../config';

export default function AdminDashboard() {
  const { adminToken: token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Rejection comments state
  const [rejectComment, setRejectComment] = useState('');
  const [activeRejectDoc, setActiveRejectDoc] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Appointment states
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [apptLoading, setApptLoading] = useState(false);
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');
  const [apptMode, setApptMode] = useState('Online');

  const fetchSelectedAppointment = async (userId) => {
    if (!userId) return;
    setApptLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/appointment/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedAppt(data);
        if (data) {
          setApptDate(data.date || '');
          setApptTime(data.time || '');
          setApptMode(data.mode || 'Online');
        } else {
          setApptDate('');
          setApptTime('');
          setApptMode('Online');
        }
      }
    } catch (err) {
      console.error('Error fetching user appointment:', err);
    } finally {
      setApptLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
        // Retain selected app focus if already open
        if (selectedApp) {
          const fresh = data.find(a => a.applicationNumber === selectedApp.applicationNumber);
          if (fresh) setSelectedApp(fresh);
        } else if (data.length > 0) {
          setSelectedApp(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchApplications();
  }, [token]);

  useEffect(() => {
    if (selectedApp && token) {
      fetchSelectedAppointment(selectedApp.userId._id || selectedApp.userId);
    }
  }, [selectedApp, token]);

  const handleDocVerify = async (docName, status, comment = '') => {
    setUpdating(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`${API_BASE}/api/admin/document/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          applicationNumber: selectedApp.applicationNumber,
          docName,
          status,
          comment
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');

      setMessage({ text: `Document "${docName}" set to ${status}.`, type: 'success' });
      setActiveRejectDoc('');
      setRejectComment('');
      fetchApplications();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  const handleAppStatusChange = async (newStatus) => {
    setUpdating(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`${API_BASE}/api/admin/application/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          applicationNumber: selectedApp.applicationNumber,
          status: newStatus
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Status change failed');

      setMessage({ text: `Application status updated to ${newStatus}.`, type: 'success' });
      fetchApplications();
      fetchSelectedAppointment(selectedApp.userId._id || selectedApp.userId);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  const handleScheduleAppt = async (e) => {
    e.preventDefault();
    if (!apptDate || !apptTime) {
      setMessage({ text: 'Please fill date and time.', type: 'error' });
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/appointment/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: selectedApp.userId._id || selectedApp.userId,
          date: apptDate,
          time: apptTime,
          mode: apptMode
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Scheduling failed');
      setMessage({ text: 'Interview scheduled successfully!', type: 'success' });
      fetchSelectedAppointment(selectedApp.userId._id || selectedApp.userId);
      fetchApplications();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelAppt = async () => {
    if (!window.confirm('Are you sure you want to cancel/remove this appointment?')) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/appointment/cancel/${selectedApp.userId._id || selectedApp.userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Cancellation failed');
      setMessage({ text: 'Appointment cancelled/removed successfully.', type: 'success' });
      setSelectedAppt(null);
      setApptDate('');
      setApptTime('');
      fetchApplications();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading applications list...</div>;
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Draft': return 'badge-draft';
      case 'Submitted': return 'badge-submitted';
      case 'Under Review': return 'badge-review';
      case 'Verified': return 'badge-verified';
      case 'Rejected': return 'badge-rejected';
      case 'Admission Approved': return 'badge-verified';
      case 'Offer Letter Generated': return 'badge-verified';
      default: return 'badge-draft';
    }
  };

  // Filter out required reviewable documents
  const reviewableDocs = [
    'Passport Size Photo',
    'Aadhaar Card',
    '10th Marks Card',
    '12th Marks Card',
    'Degree Certificate'
  ];

  return (
    <div className="admin-verification-grid">
      
      {/* Left Column: Applications List */}
      <div className="admin-sidebar-list">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} />
          Submitted Applications
        </h3>

        {applications.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No applicant submissions found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {applications.map((app, idx) => (
              <div 
                key={idx} 
                className={`admin-sidebar-item ${selectedApp?.applicationNumber === app.applicationNumber ? 'active' : ''}`}
                onClick={() => { setSelectedApp(app); setMessage({ text: '', type: '' }); }}
              >
                <h4>{app.personalInfo?.fullName || app.userId?.name || 'Candidate'}</h4>
                <p>App No: {app.applicationNumber}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {app.programmeStream || 'No Stream'}
                  </span>
                  <span className={`badge ${getStatusBadgeClass(app.status)}`} style={{ fontSize: '0.65rem' }}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Detailed Application Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
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

        {selectedApp ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Detail Overview Card */}
            <div className="form-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800 }}>
                    {selectedApp.personalInfo?.fullName || 'N/A'}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Email: {selectedApp.userId?.email || selectedApp.personalInfo?.email || 'N/A'} | Mobile: {selectedApp.personalInfo?.mobile || 'N/A'}
                  </p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span className={`badge ${getStatusBadgeClass(selectedApp.status)}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                    {selectedApp.status}
                  </span>
                </div>
              </div>

              {/* Status Stepper Override Select */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Advance Application Flow:</span>
                <select 
                  className="form-control" 
                  value={selectedApp.status}
                  onChange={(e) => handleAppStatusChange(e.target.value)}
                  disabled={updating}
                  style={{ width: 'fit-content', padding: '0.4rem 1rem' }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Admission Approved">Admission Approved</option>
                  <option value="Offer Letter Generated">Offer Letter Generated</option>
                </select>
              </div>
            </div>

            {/* Interview Schedule Management Card */}
            <div className="form-card">
              <h3 className="form-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} />
                Interview / Appointment Management
              </h3>

              {apptLoading ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loading appointment details...</p>
              ) : selectedAppt ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                        Scheduled Interview: {new Date(selectedAppt.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Time: {selectedAppt.time} | Mode: {selectedAppt.mode} | Status: {selectedAppt.status}
                      </p>
                    </div>
                    <button 
                      onClick={handleCancelAppt}
                      className="btn btn-danger"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      disabled={updating}
                    >
                      Cancel / Remove
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleScheduleAppt} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No interview is scheduled for this applicant. Fill in the details below to schedule an interview.
                  </p>
                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Interview Date *</label>
                      <input 
                        type="date" 
                        className="form-control"
                        required
                        value={apptDate}
                        onChange={(e) => setApptDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        disabled={updating}
                      />
                    </div>
                    <div className="form-group">
                      <label>Interview Time Slot *</label>
                      <select 
                        className="form-control"
                        required
                        value={apptTime}
                        onChange={(e) => setApptTime(e.target.value)}
                        disabled={updating}
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
                        value={apptMode}
                        onChange={(e) => setApptMode(e.target.value)}
                        disabled={updating}
                      >
                        <option value="Online">Online (Video Meet)</option>
                        <option value="Offline">Offline (Campus Visit)</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: 'fit-content', padding: '0.5rem 1.5rem', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    disabled={updating}
                  >
                    Schedule Interview
                  </button>
                </form>
              )}
            </div>

            {/* Document Verification Section */}
            <div className="form-card">
              <h3 className="form-section-title">
                <GraduationCap size={20} />
                Verify Uploaded Documents
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {reviewableDocs.map((docName, idx) => {
                  const uploaded = selectedApp.documents?.find(d => d.name === docName);
                  const isRejecting = activeRejectDoc === docName;

                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-app)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{docName}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {uploaded ? `Status: ${uploaded.status}` : 'Status: Not Uploaded'}
                          </p>
                          {uploaded?.comment && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-rejected)', marginTop: '0.25rem' }}>
                              Comment: {uploaded.comment}
                            </p>
                          )}
                        </div>

                        {uploaded ? (
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <a href={`${API_BASE}${uploaded.path}`} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                              <Eye size={14} />
                              View
                            </a>
                            <a href={`${API_BASE}${uploaded.path}`} download className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                              <Download size={14} />
                            </a>
                            
                            {/* Verification Controls */}
                            <button 
                              onClick={() => handleDocVerify(docName, 'Verified')}
                              className="btn btn-success" 
                              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                              disabled={updating || uploaded.status === 'Verified'}
                              title="Approve Document"
                            >
                              <Check size={14} />
                            </button>
                            
                            <button 
                              onClick={() => {
                                if (isRejecting) {
                                  setActiveRejectDoc('');
                                } else {
                                  setActiveRejectDoc(docName);
                                }
                              }}
                              className="btn btn-danger" 
                              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                              disabled={updating || uploaded.status === 'Rejected'}
                              title="Reject / Request Re-upload"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            Awaiting upload
                          </span>
                        )}
                      </div>

                      {/* Rejection comment text block */}
                      {isRejecting && (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          borderTop: '1px solid var(--border)',
                          paddingTop: '0.75rem',
                          marginTop: '0.5rem'
                        }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            Rejection / Re-upload Comment *
                          </label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                              type="text" 
                              className="form-control"
                              placeholder="Describe why document is invalid or needs re-upload..."
                              value={rejectComment}
                              onChange={(e) => setRejectComment(e.target.value)}
                              required
                              style={{ flexGrow: 1 }}
                            />
                            <button 
                              onClick={() => handleDocVerify(docName, 'Rejected', rejectComment)}
                              className="btn btn-danger"
                              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                              disabled={!rejectComment || updating}
                            >
                              Submit Rejection
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
            <p>Select an applicant from the left column to view files and credentials verification settings.</p>
          </div>
        )}

      </div>

    </div>
  );
}
