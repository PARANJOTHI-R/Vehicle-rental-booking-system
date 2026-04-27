import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await login(email, password);
            navigate(user.role === 'Admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="student-auth-page">
            <div className="student-auth-box">

                <div className="student-auth-top">
                    <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Login</h2>
                    <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Welcome back to DriveX!
                    </p>
                </div>

                <div style={{ padding: '28px' }}>

                    {error && (
                        <div className="student-error-msg">
                            Error: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

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
                            <label className="student-label">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="student-form-input"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="student-submit-btn"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#64748b' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#3b82f6', fontWeight: '600' }}>Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
