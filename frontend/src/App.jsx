import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import PublicLayout from './components/PublicLayout';

// ── Public Website Pages ──────────────────────────────────────────────────────
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';

// ── Applicant Pages ───────────────────────────────────────────────────────────
import Login from './pages/Login';
import Register from './pages/Register';
import HomeDashboard from './pages/HomeDashboard';
import ApplyProgramme from './pages/ApplyProgramme';
import PersonalInfo from './pages/PersonalInfo';
import AcademicInfo from './pages/AcademicInfo';
import DocumentUpload from './pages/DocumentUpload';
import Payments from './pages/Payments';
import Appointments from './pages/Appointments';
import ApplicationStatus from './pages/ApplicationStatus';
import Notifications from './pages/Notifications';
import SupportFeedback from './pages/SupportFeedback';
import ProfileSettings from './pages/ProfileSettings';

// ── Admin Pages ───────────────────────────────────────────────────────────────
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// ─── Route Guards ─────────────────────────────────────────────────────────────

/** Redirect authenticated applicants away from /login and /register */
const PublicRoute = ({ children }) => {
  const { applicantUser, applicantToken } = useAuth();
  if (applicantToken && applicantUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

/** Allow only logged-in applicants (uses its own session — admin session unaffected) */
const ApplicantRoute = ({ children }) => {
  const { applicantUser, applicantToken } = useAuth();
  if (!applicantToken || !applicantUser) return <Navigate to="/login" replace />;
  if (applicantUser.role !== 'applicant') return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

/** Allow only logged-in admins (uses its own session — applicant session unaffected) */
const AdminRoute = ({ children }) => {
  const { adminUser, adminToken } = useAuth();
  if (!adminToken || !adminUser) return <Navigate to="/admin/login" replace />;
  if (adminUser.role !== 'admin') return <Navigate to="/admin/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Router>
      <Routes>

        {/* ── Public Website Pages (with navbar + footer) ── */}
        <Route path="/"        element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/about"   element={<PublicLayout><AboutUs /></PublicLayout>} />
        <Route path="/blogs"   element={<PublicLayout><Blogs /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* ── Auth Routes (no layout wrapper) ── */}
        <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* ── Admin Login (separate, hidden URL) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Applicant Protected Routes ── */}
        <Route path="/dashboard"        element={<ApplicantRoute><HomeDashboard /></ApplicantRoute>} />
        <Route path="/apply"            element={<ApplicantRoute><ApplyProgramme /></ApplicantRoute>} />
        <Route path="/personal-info"    element={<ApplicantRoute><PersonalInfo /></ApplicantRoute>} />
        <Route path="/academic-info"    element={<ApplicantRoute><AcademicInfo /></ApplicantRoute>} />
        <Route path="/upload-documents" element={<ApplicantRoute><DocumentUpload /></ApplicantRoute>} />
        <Route path="/payments"         element={<ApplicantRoute><Payments /></ApplicantRoute>} />
        <Route path="/appointments"     element={<ApplicantRoute><Appointments /></ApplicantRoute>} />
        <Route path="/status"           element={<ApplicantRoute><ApplicationStatus /></ApplicantRoute>} />
        <Route path="/notifications"    element={<ApplicantRoute><Notifications /></ApplicantRoute>} />
        <Route path="/support"          element={<ApplicantRoute><SupportFeedback /></ApplicantRoute>} />
        <Route path="/profile"          element={<ApplicantRoute><ProfileSettings /></ApplicantRoute>} />

        {/* ── Admin Protected Routes ── */}
        <Route path="/admin"         element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/support" element={<AdminRoute><SupportFeedback /></AdminRoute>} />

        {/* ── Wildcard → Home ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
