import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Filter, Car, ChevronRight } from 'lucide-react';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const res = await api.get(typeFilter ? `/vehicles?type=${typeFilter}` : '/vehicles');
                setVehicles(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [typeFilter]);

    return (
        <div className="vehicles-section">
            <div className="container">
                <div className="section-title">
                    <h2>Our Fleet</h2>
                    <p>Browse through our extensive collection of premium vehicles tailored for your comfort and style.</p>
                </div>

                <div className="vehicles-layout">
                    {/* Sidebar */}
                    <aside className="filter-sidebar">
                        <div className="filter-title">
                            <Filter size={18} color="var(--primary-600)" />
                            <span>Filters</span>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Vehicle Type</label>
                            <select
                                className="form-input"
                                style={{ paddingLeft: '16px' }}
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="Car">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Van">Van</option>
                                <option value="Truck">Truck</option>
                                <option value="Motorcycle">Motorcycle</option>
                            </select>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div>
                        {loading ? (
                            <div className="loading-screen"><div className="spinner" /><span>Loading vehicles…</span></div>
                        ) : vehicles.length === 0 ? (
                            <div className="empty-state">
                                <Car size={60} />
                                <h3>No vehicles found</h3>
                                <p>Try adjusting your filters or check back later.</p>
                            </div>
                        ) : (
                            <div className="vehicles-grid">
                                {vehicles.map((vehicle) => (
                                    <div key={vehicle._id} className="vehicle-card">
                                        <div className="vehicle-img-wrap">
                                            <img
                                                src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80'}
                                                alt={vehicle.title}
                                                className="vehicle-img"
                                            />
                                            <div className="vehicle-price-badge">
                                                ${vehicle.pricePerDay}<span>/day</span>
                                            </div>
                                            <div className="vehicle-status-badge">
                                                <span className={`badge ${vehicle.availability ? 'badge-green' : 'badge-red'}`}>
                                                    {vehicle.availability ? 'Available' : 'Booked'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="vehicle-body">
                                            <h3 className="vehicle-title">{vehicle.title}</h3>
                                            <p className="vehicle-desc">{vehicle.description}</p>
                                            <div className="vehicle-footer">
                                                <span className="badge badge-gray">{vehicle.type}</span>
                                                <Link to={`/vehicles/${vehicle._id}`} className="link-details">
                                                    View Details <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
