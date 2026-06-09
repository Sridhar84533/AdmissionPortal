import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, X, RefreshCw, Eye, Download, Users, Mail, Phone, BookOpen, GraduationCap, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Rejection comments state
  const [rejectComment, setRejectComment] = useState('');
  const [activeRejectDoc, setActiveRejectDoc] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications', {
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

  const handleDocVerify = async (docName, status, comment = '') => {
    setUpdating(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/admin/document/verify', {
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
      const res = await fetch('/api/admin/application/status', {
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
                            <a href={uploaded.path} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                              <Eye size={14} />
                              View
                            </a>
                            <a href={uploaded.path} download className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
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
