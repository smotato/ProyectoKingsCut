import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingWizard from './pages/BookingWizard';
import BarberDashboard from './pages/BarberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ClientDashboard from './pages/ClientDashboard';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './components/MainLayout';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/booking" element={<ProtectedRoute requiredRole="CLIENTE"><BookingWizard /></ProtectedRoute>} />
            <Route path="/client-dashboard" element={<ProtectedRoute requiredRole="CLIENTE"><ClientDashboard /></ProtectedRoute>} />
            <Route path="/barber-dashboard" element={<ProtectedRoute requiredRole="BARBERO"><BarberDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </MainLayout>
      </Router>

    </AuthProvider>
  );
}

export default App;
