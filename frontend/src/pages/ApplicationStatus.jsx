import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, ClipboardList, FileUp, CreditCard, ShieldCheck, UserCheck, CalendarCheck, Award } from 'lucide-react';
import { API_BASE } from '../config';

export default function ApplicationStatus() {
  const { token } = useAuth();
  const [appData, setAppData] = useState(null);
  const [apptData, setApptData] = useState(null);
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDownloadOfferLetter = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/application/offer-letter/${appData.applicationNumber}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to download offer letter');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Offer_Letter_${appData.applicationNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading timeline status...</div>;
  }

  // Calculate active statuses
  const isSubmitted = appData?.status !== 'Draft';
  const isDocsUploaded = appData?.documents && appData.documents.length >= 3; // at least 3 uploaded
  const isFeePaid = appData?.paymentStatus === 'Paid';
  const isVerified = appData?.status === 'Verified' || appData?.status === 'Admission Approved' || appData?.status === 'Offer Letter Generated';
  const isAdmissionApproved = appData?.status === 'Admission Approved' || appData?.status === 'Offer Letter Generated';
  const isOfferLetterGenerated = appData?.status === 'Offer Letter Generated';
  const isInterviewScheduled = apptData !== null || isAdmissionApproved || isOfferLetterGenerated;

  // Stepper steps configuration
  const steps = [
    { label: 'Application Submitted', completed: isSubmitted, icon: ClipboardList, desc: 'Candidate forms saved and sent' },
    { label: 'Documents Uploaded', completed: isDocsUploaded, icon: FileUp, desc: 'Required certificates submitted' },
    { label: 'Fee Paid', completed: isFeePaid, icon: CreditCard, desc: 'INR 1500 processing paid' },
    { label: 'Document Verification', completed: isVerified, icon: ShieldCheck, desc: 'Office team credential check' },
    { label: 'Interview Scheduled', completed: isInterviewScheduled, icon: CalendarCheck, desc: 'Admission panel interview' },
    { label: 'Admission Approved', completed: isAdmissionApproved, icon: UserCheck, desc: 'Candidate accepted for course' },
    { label: 'Offer Letter Generated', completed: isOfferLetterGenerated, icon: Award, desc: 'Download provisional offer letter' }
  ];

  // Calculate percentage width for timeline progress line
  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = completedCount > 0 ? ((completedCount - 1) / (steps.length - 1)) * 100 : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Current Lifecycle: <span style={{ color: 'var(--primary)' }}>{appData?.status || 'Draft'}</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Check your registration path tracking. You will receive email/alert updates as details advance.
        </p>
      </div>

      {/* Stepper Timeline Box */}
      <div className="timeline-container">
        <div className="timeline">
          <div 
            className="timeline-progress-bar" 
            style={{ width: `${progressPercent}%` }}
          />

          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            let stepClass = 'timeline-step';
            if (step.completed) stepClass += ' completed';
            // Mark as active if it's the current pending milestone
            const isActive = !step.completed && (idx === 0 || steps[idx - 1].completed);
            if (isActive) stepClass += ' active';

            return (
              <div key={idx} className={stepClass}>
                <div className="timeline-step-circle">
                  {step.completed ? <Check size={18} /> : <StepIcon size={16} />}
                </div>
                <div className="timeline-step-label">
                  <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{step.label}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.15rem' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offer Letter Box if generated */}
      {isOfferLetterGenerated && (
        <div className="form-card" style={{
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--primary)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '2.5rem 2rem'
        }}>
          <Award size={48} style={{ color: 'var(--primary)' }} />
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800 }}>Offer Letter Available!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Your application has successfully passed all verification gates. Your provisional admission letter is ready.
            </p>
          </div>
          <button 
            onClick={handleDownloadOfferLetter}
            className="btn btn-primary"
            style={{ padding: '0.85rem 2.5rem' }}
          >
            Download Offer Letter
          </button>
        </div>
      )}

    </div>
  );
}
