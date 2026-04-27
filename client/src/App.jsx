import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.role !== 'Admin') {
        return <Navigate to="/" />;
    }

    return children;
};

const AppContent = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicles/:id" element={<VehicleDetails />} />

                    <Route 
                        path="/dashboard" 
                        element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} 
                    />
                    
                    <Route 
                        path="/admin" 
                        element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} 
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
