import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_BASE } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ── Applicant session ──────────────────────────────────────────────────────
  const [applicantUser, setApplicantUser] = useState(null);
  const [applicantToken, setApplicantToken] = useState(
    localStorage.getItem('applicantToken') || ''
  );

  // ── Admin session ──────────────────────────────────────────────────────────
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('adminToken') || ''
  );

  const [loading, setLoading] = useState(true);

  // Rehydrate both sessions from localStorage on mount
  useEffect(() => {
    // One-time migration: clear the old shared keys from before this fix
    if (localStorage.getItem('token') || localStorage.getItem('user')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    const storedApplicant = localStorage.getItem('applicantUser');
    if (storedApplicant && applicantToken) {
      try { setApplicantUser(JSON.parse(storedApplicant)); } catch (_) {}
    }

    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin && adminToken) {
      try { setAdminUser(JSON.parse(storedAdmin)); } catch (_) {}
    }

    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Applicant login ────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    // Store in applicant-specific keys (leave admin session untouched)
    localStorage.setItem('applicantToken', data.token);
    localStorage.setItem('applicantUser', JSON.stringify(data.user));
    setApplicantToken(data.token);
    setApplicantUser(data.user);
    return data.user;
  };

  // ── Admin login ────────────────────────────────────────────────────────────
  const adminLogin = async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    // Store in admin-specific keys (leave applicant session untouched)
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    setAdminToken(data.token);
    setAdminUser(data.user);
    return data.user;
  };

  // ── Register (applicant only) ──────────────────────────────────────────────
  const register = async (name, email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');

    localStorage.setItem('applicantToken', data.token);
    localStorage.setItem('applicantUser', JSON.stringify(data.user));
    setApplicantToken(data.token);
    setApplicantUser(data.user);
    return data.user;
  };

  // ── Logout helpers ─────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('applicantToken');
    localStorage.removeItem('applicantUser');
    setApplicantToken('');
    setApplicantUser(null);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminToken('');
    setAdminUser(null);
  };

  // ── Change password (uses whichever token is relevant) ────────────────────
  const changePassword = async (oldPassword, newPassword) => {
    // Prefer the token of the currently active context (applicant first)
    const token = applicantToken || adminToken;
    const response = await fetch(`${API_BASE}/api/auth/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Password update failed');
    return data;
  };

  // Backwards-compat aliases so existing components don't need updates
  const user  = applicantUser;
  const token = applicantToken;

  return (
    <AuthContext.Provider value={{
      // Applicant session
      user, token, login, logout, register,
      applicantUser, applicantToken,

      // Admin session
      adminUser, adminToken, adminLogin, adminLogout,

      // Shared
      changePassword,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
