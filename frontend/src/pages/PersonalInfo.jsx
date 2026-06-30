import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Home, Save } from 'lucide-react';
import { API_BASE } from '../config';
import {
  COUNTRIES,
  getIndiaStates,
  getDistricts,
  getCities,
  getPincode
} from '../data/locationData';

export default function PersonalInfo() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [appStatus, setAppStatus] = useState('Draft');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Fields state
  const [fields, setFields] = useState({
    fullName: '', fatherName: '', motherName: '', gender: '', dob: '', 
    nationality: '', religion: '', category: '', bloodGroup: '',
    mobile: '', email: '', altMobile: '',
    currentAddress: '', permanentAddress: '', city: '', district: '', state: '', pincode: '', country: ''
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
          if (app.personalInfo) {
            setFields(prev => ({
              ...prev,
              ...app.personalInfo,
              email: app.personalInfo.email || prev.email // fallback
            }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  // Cascading location handlers
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFields(prev => ({ ...prev, country, state: '', district: '', city: '', pincode: '' }));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFields(prev => ({ ...prev, state, district: '', city: '', pincode: '' }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    // Auto-fill pincode from first city of district if available
    const cities = fields.country === 'India' ? getCities(fields.state, district) : [];
    const autoPincode = cities.length > 0 ? cities[0].pincode : '';
    setFields(prev => ({ ...prev, district, city: cities.length > 0 ? cities[0].name : '', pincode: autoPincode }));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const pin = fields.country === 'India' ? getPincode(fields.state, fields.district, cityName) : '';
    setFields(prev => ({ ...prev, city: cityName, pincode: pin || prev.pincode }));
  };

  const handleCopyAddress = () => {
    setFields(prev => ({ ...prev, permanentAddress: prev.currentAddress }));
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
        body: JSON.stringify({ personalInfo: fields })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save personal details');

      setFields(data.personalInfo);
      setMessage({ text: 'Personal details saved as draft!', type: 'success' });
      window.scrollTo(0, 0);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading profile details...</div>;
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

        {/* 1. Applicant Details */}
        <div className="form-card">
          <h3 className="form-section-title">
            <User size={20} />
            Applicant Details
          </h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                type="text" name="fullName" className="form-control"
                value={fields.fullName} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Father Name *</label>
              <input 
                type="text" name="fatherName" className="form-control"
                value={fields.fatherName} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Mother Name *</label>
              <input 
                type="text" name="motherName" className="form-control"
                value={fields.motherName} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Gender *</label>
              <select 
                name="gender" className="form-control"
                value={fields.gender} onChange={handleChange} required
                disabled={isFormDisabled}
              >
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input 
                type="date" name="dob" className="form-control"
                value={fields.dob} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Nationality *</label>
              <input 
                type="text" name="nationality" className="form-control"
                value={fields.nationality} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Religion</label>
              <input 
                type="text" name="religion" className="form-control"
                value={fields.religion} onChange={handleChange}
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Category * (General/OBC/SC/ST)</label>
              <input 
                type="text" name="category" className="form-control"
                value={fields.category} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <input 
                type="text" name="bloodGroup" className="form-control"
                value={fields.bloodGroup} onChange={handleChange}
                disabled={isFormDisabled}
              />
            </div>
          </div>
        </div>

        {/* 2. Contact Details */}
        <div className="form-card">
          <h3 className="form-section-title">
            <Phone size={20} />
            Contact Details
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label>Mobile Number *</label>
              <input 
                type="tel" name="mobile" className="form-control"
                value={fields.mobile} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" name="email" className="form-control"
                value={fields.email} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label>Alternate Mobile</label>
              <input 
                type="tel" name="altMobile" className="form-control"
                value={fields.altMobile} onChange={handleChange}
                disabled={isFormDisabled}
              />
            </div>
          </div>
        </div>

        {/* 3. Address Details */}
        <div className="form-card">
          <h3 className="form-section-title">
            <Home size={20} />
            Address Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Current Address *</label>
              <textarea 
                name="currentAddress" className="form-control" rows="3"
                value={fields.currentAddress} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>

            {!isFormDisabled && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCopyAddress}
                style={{ width: 'fit-content', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
              >
                Permanent Address same as Current Address
              </button>
            )}

            <div className="form-group">
              <label>Permanent Address *</label>
              <textarea 
                name="permanentAddress" className="form-control" rows="3"
                value={fields.permanentAddress} onChange={handleChange} required
                disabled={isFormDisabled}
              />
            </div>

            {/* Country */}
            <div className="form-grid">
              <div className="form-group">
                <label>Country *</label>
                <select
                  name="country" className="form-control"
                  value={fields.country} onChange={handleCountryChange} required
                  disabled={isFormDisabled}
                >
                  <option value="">-- Select Country --</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="form-group">
                <label>State *</label>
                {fields.country === 'India' ? (
                  <select
                    name="state" className="form-control"
                    value={fields.state} onChange={handleStateChange} required
                    disabled={isFormDisabled || !fields.country}
                  >
                    <option value="">-- Select State --</option>
                    {getIndiaStates().map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text" name="state" className="form-control"
                    placeholder="Enter state / province"
                    value={fields.state} onChange={handleChange} required
                    disabled={isFormDisabled || !fields.country}
                  />
                )}
              </div>

              {/* District */}
              <div className="form-group">
                <label>District *</label>
                {fields.country === 'India' ? (
                  <select
                    name="district" className="form-control"
                    value={fields.district} onChange={handleDistrictChange} required
                    disabled={isFormDisabled || !fields.state}
                  >
                    <option value="">-- Select District --</option>
                    {getDistricts(fields.state).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text" name="district" className="form-control"
                    placeholder="Enter district"
                    value={fields.district} onChange={handleChange} required
                    disabled={isFormDisabled || !fields.state}
                  />
                )}
              </div>
            </div>

            <div className="form-grid">
              {/* City */}
              <div className="form-group">
                <label>City *</label>
                {fields.country === 'India' && fields.district ? (
                  <select
                    name="city" className="form-control"
                    value={fields.city} onChange={handleCityChange} required
                    disabled={isFormDisabled || !fields.district}
                  >
                    <option value="">-- Select City --</option>
                    {getCities(fields.state, fields.district).map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text" name="city" className="form-control"
                    placeholder="Enter city"
                    value={fields.city} onChange={handleChange} required
                    disabled={isFormDisabled || !fields.district}
                  />
                )}
              </div>

              {/* Pincode — auto-filled for India, manual otherwise */}
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text" name="pincode" className="form-control"
                  placeholder={fields.country === 'India' ? 'Auto-filled on city select' : 'Enter pincode / postal code'}
                  value={fields.pincode} onChange={handleChange} required
                  disabled={isFormDisabled}
                  style={fields.country === 'India' && fields.pincode ? { background: 'rgba(37,99,235,0.06)', fontWeight: 600 } : {}}
                />
                {fields.country === 'India' && fields.pincode && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-verified)', marginTop: '0.25rem' }}>
                    ✓ Pincode auto-filled
                  </p>
                )}
              </div>

              <div style={{ visibility: 'hidden' }}></div>
            </div>
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
            {saving ? 'Saving...' : 'Save Personal Details'}
          </button>
        )}

      </form>
    </div>
  );
}
