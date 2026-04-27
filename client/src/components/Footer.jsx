import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div>
                    <div className="footer-brand">
                        <Car color="#3b82f6" size={24} />
                        DriveX
                    </div>
                    <p className="footer-desc">
                        Premium vehicle rentals for your next adventure. Experience comfort, style, and reliability.
                    </p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/vehicles">All Vehicles</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <ul className="footer-links">
                        <li>support@drivex.com</li>
                        <li>+1 (555) 123-4567</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} DriveX Rentals. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
