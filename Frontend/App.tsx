
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Roadmap from './pages/Roadmap';
import Courses from './pages/Courses';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') as UserRole | null;
    const name = localStorage.getItem('userName');
    
    if (token && role && name) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName('');
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    // Listen for storage changes (e.g., from another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to={userRole === UserRole.TEACHER ? "/teacher/dashboard" : "/dashboard"} replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to={userRole === UserRole.TEACHER ? "/teacher/dashboard" : "/dashboard"} replace /> : <Register />} />
        
        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated && userRole === UserRole.STUDENT ? (
              <Layout userRole={UserRole.STUDENT} userName={userName}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/courses" 
          element={
            isAuthenticated && userRole === UserRole.STUDENT ? (
              <Layout userRole={UserRole.STUDENT} userName={userName}>
                <Courses />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/roadmap" 
          element={
            isAuthenticated && userRole === UserRole.STUDENT ? (
              <Layout userRole={UserRole.STUDENT} userName={userName}>
                <Roadmap />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Teacher Routes */}
        <Route 
          path="/teacher/dashboard" 
          element={
            isAuthenticated && userRole === UserRole.TEACHER ? (
              <Layout userRole={UserRole.TEACHER} userName={userName}>
                <TeacherDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Catch-all */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
