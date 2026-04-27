import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="container">
                <Link to="/" className="nav-brand">
                    <div className="nav-brand-icon">
                        <Car color="white" size={22} />
                    </div>
                    DriveX
                </Link>

                <div className="nav-links">
                    <Link to="/vehicles" className="nav-link">Vehicles</Link>

                    {user ? (
                        <div className="nav-user">
                            <Link
                                to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                                className="nav-user-name"
                            >
                                <UserIcon size={18} />
                                <span>{user.name}</span>
                            </Link>
                            <button className="btn-logout" onClick={handleLogout} title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="btn btn-primary btn-pill">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
