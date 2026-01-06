import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';

// Shared Components
import { Layout } from './components/shared/Layout';

// Super Admin Components
import { SuperAdminDashboard } from './components/super-admin/Dashboard';
import { SystemAnalytics } from './components/super-admin/SystemAnalytics';

// Blood Bank Admin Components
import { BloodBankAdminDashboard } from './components/blood-bank-admin/Dashboard';

// Lazy load other components
const BloodInventory = React.lazy(() => import('./components/blood-bank-admin/BloodInventory').then(m => ({ default: m.BloodInventory })));
const BloodTesting = React.lazy(() => import('./components/blood-bank-admin/BloodTesting').then(m => ({ default: m.BloodTesting })));
const EmergencyRequests = React.lazy(() => import('./components/blood-bank-admin/EmergencyRequests').then(m => ({ default: m.EmergencyRequests })));
const BankAnalytics = React.lazy(() => import('./components/blood-bank-admin/BankAnalytics').then(m => ({ default: m.BankAnalytics })));
const DonorDashboard = React.lazy(() => import('./components/donor/Dashboard').then(m => ({ default: m.DonorDashboard })));
const DonorNotifications = React.lazy(() => import('./components/donor/Notifications').then(m => ({ default: m.DonorNotifications })));
const HospitalDashboard = React.lazy(() => import('./components/hospital/Dashboard').then(m => ({ default: m.HospitalDashboard })));
const BloodAvailability = React.lazy(() => import('./components/hospital/BloodAvailability').then(m => ({ default: m.BloodAvailability })));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'SUPER_ADMIN':
      return <SuperAdminDashboard />;
    case 'BLOOD_BANK_ADMIN':
      return <BloodBankAdminDashboard />;
    case 'DONOR':
      return <React.Suspense fallback={<div>Loading...</div>}><DonorDashboard /></React.Suspense>;
    case 'HOSPITAL':
      return <React.Suspense fallback={<div>Loading...</div>}><HospitalDashboard /></React.Suspense>;
    default:
      return <Navigate to="/login" replace />;
  }
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <RoleBasedDashboard />
          </ProtectedRoute>
        } />
        
        {/* Super Admin Routes */}
        <Route path="/analytics" element={
          <ProtectedRoute>
            <SystemAnalytics />
          </ProtectedRoute>
        } />
        
        {/* Blood Bank Admin Routes */}
        <Route path="/inventory" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BloodInventory />
            </React.Suspense>
          </ProtectedRoute>
        } />
        <Route path="/testing" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BloodTesting />
            </React.Suspense>
          </ProtectedRoute>
        } />
        <Route path="/emergency-requests" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <EmergencyRequests />
            </React.Suspense>
          </ProtectedRoute>
        } />
        <Route path="/bank-analytics" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BankAnalytics />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Donor Routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <DonorNotifications />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Hospital Routes */}
        <Route path="/blood-availability" element={
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BloodAvailability />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
