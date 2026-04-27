import { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Car, Calendar, Trash2 } from 'lucide-react';

const chartData = [
    { name: 'Mon', revenue: 400 }, { name: 'Tue', revenue: 300 },
    { name: 'Wed', revenue: 560 }, { name: 'Thu', revenue: 600 },
    { name: 'Fri', revenue: 820 }, { name: 'Sat', revenue: 1200 },
    { name: 'Sun', revenue: 900 },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalBookings: 0, revenue: 0, activeVehicles: 0 });
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([api.get('/bookings'), api.get('/vehicles')])
            .then(([bRes, vRes]) => {
                const b = bRes.data, v = vRes.data;
                setBookings(b);
                setVehicles(v);
                const revenue = b.filter(x => x.status === 'approved' || x.status === 'completed')
                                  .reduce((s, x) => s + x.totalPrice, 0);
                setStats({ totalBookings: b.length, revenue, activeVehicles: v.filter(x => x.availability).length });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}/status`, { status });
            setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
        } catch (e) { console.error(e); }
    };

    const deleteVehicle = async (id) => {
        if (!window.confirm('Delete this vehicle?')) return;
        try {
            await api.delete(`/vehicles/${id}`);
            setVehicles(prev => prev.filter(v => v._id !== id));
        } catch (e) { console.error(e); }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="dashboard">
            <div className="container">
                <div style={{ marginBottom: '28px' }}>
                    <h1>Admin Dashboard</h1>
                    <p style={{ color: 'var(--gray-500)', marginTop: '6px' }}>Manage vehicles, bookings, and analytics.</p>
                </div>

                {/* Tabs */}
                <div className="tab-bar">
                    {[['overview', 'Overview'], ['vehicles', 'Vehicles'], ['bookings', 'Bookings']].map(([key, label]) => (
                        <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                    ))}
                </div>

                {/* ── Overview ── */}
                {activeTab === 'overview' && (
                    <div>
                        <div className="grid grid-3" style={{ gap: '20px', marginBottom: '28px' }}>
                            <div className="stat-card">
                                <div className="stat-icon blue"><Calendar size={24} /></div>
                                <div><p>Total Bookings</p><h3>{stats.totalBookings}</h3></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon green"><span style={{ fontSize: '1.25rem', fontWeight: 800 }}>$</span></div>
                                <div><p>Revenue (Approved)</p><h3>${stats.revenue}</h3></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon purple"><Car size={24} /></div>
                                <div><p>Active Vehicles</p><h3>{stats.activeVehicles}</h3></div>
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3>Revenue Overview (Weekly)</h3>
                            <div style={{ height: '320px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} barSize={40}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                                        <Tooltip formatter={v => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="revenue" fill="var(--primary-500)" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Vehicles ── */}
                {activeTab === 'vehicles' && (
                    <div className="data-table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Vehicle</th>
                                    <th>Type</th>
                                    <th>Price/Day</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.length === 0 ? (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)' }}>No vehicles listed yet.</td></tr>
                                ) : vehicles.map((v) => (
                                    <tr key={v._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img src={v.images?.[0] || 'https://via.placeholder.com/44'} alt={v.title}
                                                    style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                                                <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{v.title}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--gray-500)' }}>{v.type}</td>
                                        <td style={{ fontWeight: 700 }}>${v.pricePerDay}</td>
                                        <td>
                                            <span className={`badge ${v.availability ? 'badge-green' : 'badge-red'}`}>
                                                {v.availability ? 'Available' : 'Booked'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteVehicle(v._id)}>
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ── Bookings ── */}
                {activeTab === 'bookings' && (
                    <div className="data-table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Dates</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)' }}>No bookings yet.</td></tr>
                                ) : bookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>
                                            <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{b.userId?.name}</div>
                                            <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{b.userId?.email}</div>
                                        </td>
                                        <td>{b.vehicleId?.title}</td>
                                        <td style={{ fontSize: '0.8125rem' }}>
                                            {new Date(b.startDate).toLocaleDateString()} –{' '}
                                            {new Date(b.endDate).toLocaleDateString()}
                                        </td>
                                        <td style={{ fontWeight: 700 }}>${b.totalPrice}</td>
                                        <td>
                                            <span className={`badge ${b.status === 'pending' ? 'badge-yellow' : b.status === 'approved' ? 'badge-green' : 'badge-red'}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {b.status === 'pending' && (
                                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                    <button className="btn btn-success btn-sm" onClick={() => updateStatus(b._id, 'approved')}>Approve</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b._id, 'rejected')}>Reject</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
