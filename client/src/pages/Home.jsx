import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    return (
        <div>

            {/* Hero Section */}
            <div className="student-hero">
                <div className="student-hero-inner">
                    <h1 style={{ fontSize: '2.4rem', marginBottom: '10px' }}>
                        Welcome to <span style={{ color: '#f59e0b' }}>DriveX</span> Car Rentals
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '28px' }}>
                        Find and book a car easily. No hidden charges. Just drive!
                    </p>

                    {/* Search Bar */}
                    <div className="student-search-bar">
                        <div className="student-search-field">
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Pick-up Location</label>
                            <input
                                type="text"
                                placeholder="Enter city or area..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="student-input"
                            />
                        </div>
                        <div className="student-search-field">
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="student-input"
                            />
                        </div>
                        <Link to="/vehicles" className="student-search-btn">
                            Search Cars
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div style={{ padding: '60px 20px', background: '#f8fafc' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#1e293b' }}>
                        Why Use DriveX?
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '0.95rem' }}>
                        We built this as our mini project — but we made sure it actually works.
                    </p>

                    <div className="student-features-grid">
                        <div className="student-feature-card">
                            <div className="student-feature-icon">Car</div>
                            <h3>Lots of Cars</h3>
                            <p>We have sedans, SUVs, hatchbacks and more. Pick what you like.</p>
                        </div>
                        <div className="student-feature-card">
                            <div className="student-feature-icon">Price</div>
                            <h3>Fair Pricing</h3>
                            <p>Daily rental rates are shown clearly. No surprise fees at checkout.</p>
                        </div>
                        <div className="student-feature-card">
                            <div className="student-feature-icon">Fast</div>
                            <h3>Quick Booking</h3>
                            <p>Create an account, pick a car, choose your dates — done. Super simple.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div style={{ padding: '60px 20px', background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '8px', color: '#1e293b' }}>How It Works</h2>
                    <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '0.95rem' }}>Just 3 simple steps</p>
                    <div className="student-steps-row">
                        <div className="student-step">
                            <div className="student-step-num">1</div>
                            <h4>Register / Login</h4>
                            <p>Create a free account or sign in to your existing one.</p>
                        </div>
                        <div className="student-step-arrow">→</div>
                        <div className="student-step">
                            <div className="student-step-num">2</div>
                            <h4>Browse &amp; Pick</h4>
                            <p>Browse available cars and select the one you want.</p>
                        </div>
                        <div className="student-step-arrow">→</div>
                        <div className="student-step">
                            <div className="student-step-num">3</div>
                            <h4>Book &amp; Enjoy</h4>
                            <p>Confirm your booking and you're good to go!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="student-cta-banner">
                <h2>Ready to rent your first car?</h2>
                <p style={{ marginTop: '8px', marginBottom: '24px', color: 'rgba(255,255,255,0.85)' }}>
                    Sign up now — it's completely free!
                </p>
                <Link to="/signup" className="student-cta-btn">
                    Create Account
                </Link>
                <span style={{ margin: '0 16px', color: 'rgba(255,255,255,0.6)' }}>or</span>
                <Link to="/vehicles" className="student-cta-btn-outline">
                    Browse Cars
                </Link>
            </div>

        </div>
    );
};

export default Home;
