import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/bookings/mybookings')
            .then(r => setBookings(r.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const statusBadge = (status) => {
        const map = { pending: 'badge-yellow', approved: 'badge-green', completed: 'badge-blue', rejected: 'badge-red', cancelled: 'badge-red' };
        return map[status] || 'badge-gray';
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome back, {user?.name}!</h1>
                        <p>Manage your bookings and explore new vehicles.</p>
                    </div>
                    <Link to="/vehicles" className="btn btn-white btn-pill">Find a Vehicle</Link>
                </div>

                <h2 style={{ marginBottom: '20px' }}>Your Bookings</h2>

                {loading ? (
                    <div className="loading-screen"><div className="spinner" /></div>
                ) : bookings.length === 0 ? (
                    <div className="empty-state" style={{ background: 'white', borderRadius: '20px', border: '2px dashed var(--gray-200)' }}>
                        <Calendar size={56} />
                        <h3>No bookings yet</h3>
                        <p>You haven't made any vehicle bookings. Browse our fleet and find your perfect ride.</p>
                        <Link to="/vehicles" className="btn btn-primary" style={{ marginTop: '20px' }}>Browse Vehicles</Link>
                    </div>
                ) : (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        {bookings.map((booking) => (
                            <div key={booking._id} className="booking-item">
                                <img
                                    src={booking.vehicleId?.images?.[0] || 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80'}
                                    alt="Vehicle"
                                    className="booking-thumb"
                                />
                                <div className="booking-info">
                                    <h3>{booking.vehicleId?.title || 'Vehicle'}</h3>
                                    <div className="booking-meta">
                                        <span>
                                            <Calendar size={14} />
                                            {format(new Date(booking.startDate), 'MMM dd')} – {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                                        </span>
                                        <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                                            <CreditCard size={14} />
                                            ${booking.totalPrice}
                                        </span>
                                    </div>
                                </div>
                                <span className={`badge ${statusBadge(booking.status)}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
