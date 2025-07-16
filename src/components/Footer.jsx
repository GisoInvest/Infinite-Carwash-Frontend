import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/IMCADUpdatedLogo.png';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Infinite Mobile Carwash & Detailing" className="h-16 w-auto mb-4" />
            <p className="text-gray-300 mb-4 max-w-md">
              Revolutionising the car care industry in Derby with premium mobile car wash and detailing services. 
              Experience the future of car care with our non-contact, scratch-free cleaning process.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/infinitemobilecarwashdetailing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:07403139086" className="text-gray-300 hover:text-primary transition-colors">
                  07403139086
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a 
                  href="mailto:infinitemobilecarwashdetailing@gmail.com" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  infinitemobilecarwashdetailing@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-gray-300">Derby & Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Infinite Mobile Carwash & Detailing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

