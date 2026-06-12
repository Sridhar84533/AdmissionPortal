import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';
import { 
  FileText, Award, CreditCard, UploadCloud, 
  Calendar, CheckCircle, AlertTriangle, Info, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeDashboard() {
  const { token } = useAuth();
  const [appData, setAppData] = useState(null);
  const [apptData, setApptData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const appRes = await fetch(`${API_BASE}/api/application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (appRes.ok) {
          const app = await appRes.json();
          setAppData(app);
        }

        const apptRes = await fetch(`${API_BASE}/api/appointments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (apptRes.ok) {
          const appt = await apptRes.json();
          setApptData(appt);
        }

        const notifRes = await fetch(`${API_BASE}/api/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (notifRes.ok) {
          const notifs = await notifRes.json();
          setNotifications(notifs.slice(0, 5)); // show latest 5
        }
      } catch (err) {
        console.error('Error loading dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Loading your dashboard...</p>
      </div>
    );
  }

  // Helper for status classes
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

  const getDocStatusText = () => {
    if (!appData || !appData.documents || appData.documents.length === 0) {
      return 'Not Uploaded';
    }
    const verifiedCount = appData.documents.filter(d => d.status === 'Verified').length;
    const totalCount = appData.documents.length;
    if (verifiedCount === totalCount) return 'All Verified';
    
    const rejectedCount = appData.documents.filter(d => d.status === 'Rejected').length;
    if (rejectedCount > 0) return `${rejectedCount} Document(s) Rejected`;
    
    return 'Verification Pending';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Banner / Header */}
      <div className="glass-panel" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '5px solid var(--primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800 }}>
          Welcome, {appData?.personalInfo?.fullName || 'Applicant'}!
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          {appData?.status === 'Draft' 
            ? 'Get started by choosing a programme stream and completing your profile.'
            : 'Track the status of your application, book appointments, or view uploaded certificates below.'}
        </p>
      </div>

      {/* Cards Section */}
      <div className="card-grid">
        {/* Card 1: Application Number */}
        <div className="stat-card">
          <div className="stat-details">
            <h4>Application Number</h4>
            <p style={{ fontSize: '1.25rem' }}>{appData?.applicationNumber || 'N/A'}</p>
          </div>
          <div className="stat-icon">
            <FileText size={24} />
          </div>
        </div>

        {/* Card 2: Application Status */}
        <div className="stat-card">
          <div className="stat-details">
            <h4>Application Status</h4>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`badge ${getStatusBadgeClass(appData?.status)}`}>
                {appData?.status || 'Draft'}
              </span>
            </div>
          </div>
          <div className="stat-icon">
            <Award size={24} />
          </div>
        </div>

        {/* Card 3: Payment Status */}
        <div className="stat-card">
          <div className="stat-details">
            <h4>Payment Status</h4>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`badge ${appData?.paymentStatus === 'Paid' ? 'badge-verified' : 'badge-draft'}`}>
                {appData?.paymentStatus || 'Pending'}
              </span>
            </div>
          </div>
          <div className="stat-icon">
            <CreditCard size={24} />
          </div>
        </div>

        {/* Card 4: Documents Status */}
        <div className="stat-card">
          <div className="stat-details">
            <h4>Documents Status</h4>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '0.5rem' }}>
              {getDocStatusText()}
            </p>
          </div>
          <div className="stat-icon">
            <UploadCloud size={24} />
          </div>
        </div>

        {/* Card 5: Interview Status */}
        <div className="stat-card">
          <div className="stat-details">
            <h4>Interview Status</h4>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`badge ${
                apptData 
                  ? apptData.status === 'Approved' ? 'badge-verified' : 'badge-review'
                  : 'badge-draft'
              }`}>
                {apptData ? apptData.status : 'Not Scheduled'}
              </span>
            </div>
          </div>
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        
        {/* Quick Actions & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-card">
            <h3 className="form-section-title" style={{ border: 'none' }}>Quick Steps Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: appData?.programmeStream ? 'var(--color-verified)' : 'var(--text-muted)' }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Choose Programme</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {appData?.programmeStream ? `Selected: ${appData.programmeStream}` : 'Select postgraduate or professional streams'}
                  </p>
                </div>
                {!appData?.programmeStream && (
                  <Link to="/apply" className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>Apply Now</Link>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: appData?.personalInfo?.mobile ? 'var(--color-verified)' : 'var(--text-muted)' }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Personal & Academic Info</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {appData?.personalInfo?.mobile ? 'Profile fields updated' : 'Provide father name, address, and degree history'}
                  </p>
                </div>
                {!appData?.personalInfo?.mobile && (
                  <Link to="/personal-info" className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>Fill Profile</Link>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: (appData?.documents && appData.documents.length > 0) ? 'var(--color-verified)' : 'var(--text-muted)' }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Upload Required Documents</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Upload photo, Aadhaar card, and marks sheets
                  </p>
                </div>
                {(!appData?.documents || appData.documents.length === 0) && (
                  <Link to="/upload-documents" className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>Upload</Link>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: appData?.paymentStatus === 'Paid' ? 'var(--color-verified)' : 'var(--text-muted)' }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Complete Payment</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {appData?.paymentStatus === 'Paid' ? 'Receipt is ready' : 'Pay ₹1500 application submission fee'}
                  </p>
                </div>
                {appData?.paymentStatus !== 'Paid' && (
                  <Link to="/payments" className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>Pay Fee</Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Notifications column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="form-section-title" style={{ border: 'none', marginBottom: 0 }}>
              Recent Alerts
            </h3>
            
            {notifications.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem', textAlign: 'center', gap: '0.5rem' }}>
                <Bell size={32} style={{ color: 'var(--text-muted)' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recent alerts found.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1, overflowY: 'auto' }}>
                {notifications.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{
                      color: item.type === 'success' ? 'var(--color-verified)' : 
                             item.type === 'error' ? 'var(--color-rejected)' : 
                             item.type === 'warning' ? 'var(--color-review)' : 'var(--primary)',
                      marginTop: '0.15rem'
                    }}>
                      <Info size={16} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{item.text}</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link to="/notifications" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
              View All Notifications
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
