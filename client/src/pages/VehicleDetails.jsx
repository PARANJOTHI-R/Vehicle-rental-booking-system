import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, CheckCircle, Shield, CreditCard, ArrowLeft } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/vehicles/${id}`)
            .then(r => setVehicle(r.data))
            .catch(() => setError('Failed to load vehicle'))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (startDate && endDate && vehicle) {
            const days = differenceInDays(new Date(endDate), new Date(startDate));
            if (days > 0) {
                setTotalDays(days);
                setTotalPrice(days * vehicle.pricePerDay);
            } else {
                setTotalDays(0);
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, vehicle]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) { navigate('/login'); return; }
        if (totalPrice <= 0) { setError('Return date must be after pick-up date.'); return; }
        setBookingLoading(true);
        setError('');
        try {
            await api.post('/bookings', { vehicleId: id, startDate, endDate, totalPrice });
            setBookingSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
    if (!vehicle) return <div className="loading-screen"><p>Vehicle not found.</p></div>;

    return (
        <div style={{ padding: '48px 0' }}>
            <div className="container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back to Fleet
                </button>

                <div className="detail-layout">
                    {/* Left */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div className="card">
                            <img
                                src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80'}
                                alt={vehicle.title}
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                                    <h1 style={{ fontSize: '1.75rem' }}>{vehicle.title}</h1>
                                    <span className="badge badge-blue">{vehicle.type}</span>
                                </div>
                                <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                                    {vehicle.description}
                                </p>
                            </div>
                        </div>

                        <div className="amenities-grid">
                            <div className="amenity-card">
                                <CheckCircle color="#22c55e" size={30} />
                                <strong>Premium Quality</strong>
                            </div>
                            <div className="amenity-card">
                                <Shield color="#3b82f6" size={30} />
                                <strong>Fully Insured</strong>
                            </div>
                            <div className="amenity-card">
                                <Calendar color="#a855f7" size={30} />
                                <strong>Flex Cancel</strong>
                            </div>
                        </div>
                    </div>

                    {/* Right – Booking Widget */}
                    <div>
                        <div className="booking-widget">
                            <div className="price-display">
                                <span className="price">${vehicle.pricePerDay}</span>
                                <span className="per"> /day</span>
                                {!vehicle.availability && (
                                    <div style={{ marginTop: '10px' }}><span className="badge badge-red">Unavailable</span></div>
                                )}
                            </div>

                            {bookingSuccess ? (
                                <div className="booking-success">
                                    <CheckCircle color="#16a34a" size={48} />
                                    <h3>Booking Requested!</h3>
                                    <p style={{ marginBottom: '16px' }}>Your request is pending approval from the owner.</p>
                                    <Link to="/dashboard" className="btn btn-primary btn-sm">View My Bookings</Link>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    {error && <div className="alert alert-error"><span>{error}</span></div>}

                                    <div className="form-group">
                                        <label className="form-label">Pick-up Date</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon"><Calendar size={18} /></span>
                                            <input
                                                type="date"
                                                required
                                                className="form-input"
                                                value={startDate}
                                                min={format(new Date(), 'yyyy-MM-dd')}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Return Date</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon"><Calendar size={18} /></span>
                                            <input
                                                type="date"
                                                required
                                                className="form-input"
                                                value={endDate}
                                                min={startDate || format(new Date(), 'yyyy-MM-dd')}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {totalPrice > 0 && (
                                        <div className="price-breakdown">
                                            <div className="price-row">
                                                <span>${vehicle.pricePerDay} × {totalDays} day{totalDays > 1 ? 's' : ''}</span>
                                                <span>${totalPrice}</span>
                                            </div>
                                            <div className="price-total">
                                                <span>Total</span>
                                                <span className="amount">${totalPrice}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={!vehicle.availability || bookingLoading}
                                        className="btn btn-primary btn-block btn-lg"
                                    >
                                        {bookingLoading
                                            ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                                            : <><CreditCard size={18} /> Reserve Now</>
                                        }
                                    </button>

                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                                        You won't be charged until the owner confirms.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
