import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await register(name, email, password, role);
            navigate(user.role === 'Admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="student-auth-page">
            <div className="student-auth-box">

                <div className="student-auth-top">
                    <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Register</h2>
                    <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Create your DriveX account
                    </p>
                </div>

                <div style={{ padding: '28px' }}>

                    {error && (
                        <div className="student-error-msg">
                            Error: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div className="student-form-group">
                            <label className="student-label">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="student-form-input"
                            />
                        </div>

                        <div className="student-form-group">
                            <label className="student-label">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="student-form-input"
                            />
                        </div>

                        <div className="student-form-group">
                            <label className="student-label">Password <span style={{ color: '#94a3b8', fontWeight: 400 }}>(min. 6 characters)</span></label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="student-form-input"
                            />
                        </div>

                        <div className="student-form-group">
                            <label className="student-label">Register as</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="student-form-input"
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="Customer">Customer - Rent a Vehicle</option>
                                <option value="Admin">Admin - Manage Listings</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="student-submit-btn"
                            style={{ marginTop: '4px' }}
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#64748b' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600' }}>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
