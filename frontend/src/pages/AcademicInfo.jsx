import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Save } from 'lucide-react';
import { API_BASE } from '../config';

export default function AcademicInfo() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [appStatus, setAppStatus] = useState('Draft');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fields state
  const [tenth, setTenth] = useState({
    boardType: '', schoolName: '', board: '', registerNumber: '', passingYear: '', percentage: '', totalMarks: '', obtainedMarks: ''
  });
  const [twelfth, setTwelfth] = useState({
    puCollegeName: '', boardType: '', board: '', registerNumber: '', passingYear: '', percentage: ''
  });
  const [degree, setDegree] = useState({
    course: '', collegeName: '', universityName: '', degreeType: '', cgpa: '', percentage: '', passingYear: '', degreeStatus: ''
  });

  useEffect(() => {
    if (!token) return;
    const fetchApp = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const app = await res.json();
          setAppStatus(app.status);
          if (app.academicInfo) {
            if (app.academicInfo.tenth) setTenth(prev => ({ ...prev, ...app.academicInfo.tenth }));
            if (app.academicInfo.twelfth) setTwelfth(prev => ({ ...prev, ...app.academicInfo.twelfth }));
            if (app.academicInfo.degree) setDegree(prev => ({ ...prev, ...app.academicInfo.degree }));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [token]);

  const handleTenthChange = (e) => {
    const { name, value } = e.target;
    setTenth(prev => ({ ...prev, [name]: value }));
  };

  const handleTwelfthChange = (e) => {
    const { name, value } = e.target;
    setTwelfth(prev => ({ ...prev, [name]: value }));
  };

  const handleDegreeChange = (e) => {
    const { name, value } = e.target;
    setDegree(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${API_BASE}/api/application/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          academicInfo: { tenth, twelfth, degree }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save academic details');

      setMessage({ text: 'Academic details saved as draft!', type: 'success' });
      window.scrollTo(0, 0);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading academic details...</div>;
  }

  const isFormDisabled = appStatus !== 'Draft';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
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

        {/* 1. 10th Standard Details */}
        <div className="form-card">
          <h3 className="form-section-title">
            <GraduationCap size={20} />
            10th Standard Details
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>School Name *</label>
              <input 
                type="text" name="schoolName" className="form-control"
                value={tenth.schoolName} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Board Type *</label>
              <select 
                name="boardType" className="form-control"
                value={tenth.boardType} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              >
                <option value="">-- Select --</option>
                <option value="State Board">State Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="NIOS">NIOS</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Board Name * (e.g. CBSE)</label>
              <input 
                type="text" name="board" className="form-control"
                value={tenth.board} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Register Number *</label>
              <input 
                type="text" name="registerNumber" className="form-control"
                value={tenth.registerNumber} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Passing Year *</label>
              <input 
                type="number" name="passingYear" className="form-control"
                value={tenth.passingYear} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Percentage *</label>
              <input 
                type="text" name="percentage" className="form-control"
                value={tenth.percentage} onChange={handleTenthChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Total Marks</label>
              <input 
                type="number" name="totalMarks" className="form-control"
                value={tenth.totalMarks} onChange={handleTenthChange}
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Obtained Marks</label>
              <input 
                type="number" name="obtainedMarks" className="form-control"
                value={tenth.obtainedMarks} onChange={handleTenthChange}
                disabled={isFormDisabled}
              />
            </div>
            <div style={{ visibility: 'hidden' }}></div>
          </div>
        </div>

        {/* 2. 12th Standard Details */}
        <div className="form-card">
          <h3 className="form-section-title">
            <GraduationCap size={20} />
            12th Standard Details (PUC / HSE)
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>PU College / School Name *</label>
              <input 
                type="text" name="puCollegeName" className="form-control"
                value={twelfth.puCollegeName} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Board Type *</label>
              <select 
                name="boardType" className="form-control"
                value={twelfth.boardType} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              >
                <option value="">-- Select --</option>
                <option value="State Board">State Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Board Name *</label>
              <input 
                type="text" name="board" className="form-control"
                value={twelfth.board} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Register Number *</label>
              <input 
                type="text" name="registerNumber" className="form-control"
                value={twelfth.registerNumber} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Passing Year *</label>
              <input 
                type="number" name="passingYear" className="form-control"
                value={twelfth.passingYear} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Percentage *</label>
              <input 
                type="text" name="percentage" className="form-control"
                value={twelfth.percentage} onChange={handleTwelfthChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>
        </div>

        {/* 3. Degree Information */}
        <div className="form-card">
          <h3 className="form-section-title">
            <GraduationCap size={20} />
            Degree Information
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Course *</label>
              <select 
                name="course" className="form-control"
                value={degree.course} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              >
                <option value="">-- Select Course --</option>
                <option value="BCA">BCA</option>
                <option value="BSc">BSc</option>
                <option value="BCom">BCom</option>
                <option value="BA">BA</option>
                <option value="BE">BE</option>
                <option value="BTech">BTech</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>College Name *</label>
              <input 
                type="text" name="collegeName" className="form-control"
                value={degree.collegeName} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>University Name *</label>
              <input 
                type="text" name="universityName" className="form-control"
                value={degree.universityName} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Degree Type * (e.g. Regular/Distance)</label>
              <input 
                type="text" name="degreeType" className="form-control"
                value={degree.degreeType} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>CGPA / Grade</label>
              <input 
                type="text" name="cgpa" className="form-control"
                value={degree.cgpa} onChange={handleDegreeChange}
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Percentage *</label>
              <input 
                type="text" name="percentage" className="form-control"
                value={degree.percentage} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Passing Year *</label>
              <input 
                type="number" name="passingYear" className="form-control"
                value={degree.passingYear} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Degree Status *</label>
              <select 
                name="degreeStatus" className="form-control"
                value={degree.degreeStatus} onChange={handleDegreeChange} required
                disabled={isFormDisabled}
              >
                <option value="">-- Select Status --</option>
                <option value="Completed">Completed</option>
                <option value="Final Year Appearing">Final Year Appearing</option>
                <option value="Result Awaited">Result Awaited</option>
              </select>
            </div>
            <div style={{ visibility: 'hidden' }}></div>
          </div>
        </div>

        {appStatus === 'Draft' && (
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
            style={{ width: 'fit-content', padding: '0.85rem 2rem', alignSelf: 'flex-start' }}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Academic Details'}
          </button>
        )}

      </form>
    </div>
  );
}
