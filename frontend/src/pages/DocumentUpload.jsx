import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, CheckCircle, AlertTriangle, XCircle, FileText, Trash2, Eye, Download } from 'lucide-react';
import { API_BASE } from '../config';

export default function DocumentUpload() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [appStatus, setAppStatus] = useState('Draft');
  const [selectedDocName, setSelectedDocName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // List of all possible document slots
  const documentSlots = [
    { key: 'passportPhoto', label: 'Passport Size Photo', section: 'Personal Documents' },
    { key: 'signature', label: 'Signature', section: 'Personal Documents' },
    { key: 'aadhaarCard', label: 'Aadhaar Card', section: 'Personal Documents' },
    { key: 'panCard', label: 'PAN Card (Optional)', section: 'Personal Documents' },
    { key: 'marks10', label: '10th Marks Card', section: '10th Documents' },
    { key: 'passing10', label: '10th Passing Certificate', section: '10th Documents' },
    { key: 'marks12', label: '12th Marks Card', section: '12th Documents' },
    { key: 'passing12', label: '12th Passing Certificate', section: '12th Documents' },
    { key: 'degreeMarks', label: 'Degree Marks Cards', section: 'Degree Documents' },
    { key: 'degreeProvisional', label: 'Degree Provisional Certificate', section: 'Degree Documents' },
    { key: 'degreeCertificate', label: 'Degree Certificate', section: 'Degree Documents' },
    { key: 'consolidatedMarks', label: 'Consolidated Marks Card', section: 'Degree Documents' },
    { key: 'transferCertificate', label: 'Transfer Certificate', section: 'Additional Documents' },
    { key: 'migrationCertificate', label: 'Migration Certificate', section: 'Additional Documents' },
    { key: 'casteCertificate', label: 'Caste Certificate', section: 'Additional Documents' },
    { key: 'incomeCertificate', label: 'Income Certificate', section: 'Additional Documents' },
    { key: 'studyCertificate', label: 'Study Certificate', section: 'Additional Documents' },
    { key: 'experienceCertificate', label: 'Experience Certificate', section: 'Additional Documents' }
  ];

  const fetchAppDetails = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/application`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const app = await res.json();
        setDocuments(app.documents || []);
        setAppStatus(app.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAppDetails();
  }, [token]);

  const handleFileUpload = async (e, docName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ text: 'Invalid file type. Only PDF, JPG, and PNG are allowed.', type: 'error' });
      return;
    }

    // Validate size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: 'File size exceeds maximum limit of 5 MB.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('docName', docName);

    try {
      const res = await fetch(`${API_BASE}/api/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setDocuments(data.documents);
      if (data.status) setAppStatus(data.status);
      setMessage({ text: `"${docName}" uploaded successfully!`, type: 'success' });
      fetchAppDetails();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (docName) => {
    if (!window.confirm(`Are you sure you want to delete "${docName}"?`)) return;

    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`${API_BASE}/api/documents/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ docName })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Deletion failed');

      setDocuments(data.documents);
      setMessage({ text: `"${docName}" deleted successfully.`, type: 'success' });
      fetchAppDetails();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const getDocStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircle size={18} style={{ color: 'var(--color-verified)' }} />;
      case 'Rejected': return <XCircle size={18} style={{ color: 'var(--color-rejected)' }} />;
      case 'Pending': return <AlertTriangle size={18} style={{ color: 'var(--color-review)' }} />;
      case 'Uploaded': return <CheckCircle size={18} style={{ color: 'var(--color-submitted)' }} />;
      default: return null;
    }
  };

  const getDocStatusText = (status) => {
    switch (status) {
      case 'Verified': return 'Verified';
      case 'Rejected': return 'Rejected';
      case 'Pending': return 'Pending Review';
      case 'Uploaded': return 'Uploaded';
      default: return 'Not Uploaded';
    }
  };

  const getDocBadgeClass = (status) => {
    switch (status) {
      case 'Verified': return 'badge-verified';
      case 'Rejected': return 'badge-rejected';
      case 'Pending': return 'badge-review';
      case 'Uploaded': return 'badge-submitted';
      default: return 'badge-draft';
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading documents checklist...</div>;
  }

  // Group slots by section
  const sections = {};
  documentSlots.forEach(slot => {
    if (!sections[slot.section]) {
      sections[slot.section] = [];
    }
    sections[slot.section].push(slot);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
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

      {/* Overview Status Grid */}
      <div className="form-card">
        <h3 className="form-section-title">Verification Dashboard Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {documentSlots.slice(0, 6).map((slot, idx) => {
            const doc = documents.find(d => d.name === slot.label);
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{slot.label.split(' ')[0]} ...</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {getDocStatusIcon(doc?.status)}
                  <span className={`badge ${getDocBadgeClass(doc?.status)}`} style={{ fontSize: '0.75rem' }}>
                    {getDocStatusText(doc?.status)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Upload Grid by Category */}
      {Object.keys(sections).map((sectionName, sIdx) => (
        <div key={sIdx} className="form-card">
          <h3 className="form-section-title">{sectionName}</h3>
          
          <div className="document-list-grid">
            {sections[sectionName].map((slot, slotIdx) => {
              const uploadedDoc = documents.find(d => d.name === slot.label);
              
              return (
                <div key={slotIdx} className="document-item-card">
                  <div className="document-header">
                    <div className="document-info">
                      <h4>{slot.label}</h4>
                      <p>Allowed: PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                    {uploadedDoc && (
                      <span className={`badge ${getDocBadgeClass(uploadedDoc.status)}`}>
                        {getDocStatusText(uploadedDoc.status)}
                      </span>
                    )}
                  </div>

                  {uploadedDoc?.comment && (
                    <div className="document-comment">
                      <strong>Rejection Comment:</strong> {uploadedDoc.comment}
                    </div>
                  )}

                  {uploadedDoc ? (
                    // Display uploaded doc status & action items
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <FileText size={16} />
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                          {uploadedDoc.filename}
                        </span>
                      </div>
                      
                      <div className="document-actions">
                        <a href={`${API_BASE}${uploadedDoc.path}`} target="_blank" rel="noopener noreferrer">
                          <Eye size={14} />
                          View
                        </a>
                        <a href={`${API_BASE}${uploadedDoc.path}`} download>
                          <Download size={14} />
                          Download
                        </a>
                        {uploadedDoc.status !== 'Verified' && (
                          <button type="button" onClick={() => handleDelete(slot.label)} style={{ color: 'var(--color-rejected)' }}>
                            <Trash2 size={14} />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // File selector zone
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="file" 
                          id={`file-${slot.key}`}
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(e, slot.label)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          disabled={isUploading || appStatus === 'Admission Approved'}
                        />
                        <label 
                          htmlFor={`file-${slot.key}`}
                          className="btn btn-secondary"
                          style={{
                            width: '100%',
                            padding: '0.65rem',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '0.5rem'
                          }}
                        >
                          <UploadCloud size={16} />
                          Choose File
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
