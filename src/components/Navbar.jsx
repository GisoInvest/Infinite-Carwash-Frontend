import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, FileText } from 'lucide-react';
import logo from '../assets/IMCADUpdatedLogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Track Service', path: '/tracking' },
    { name: 'T&C', path: '/terms' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Infinite Mobile Carwash & Detailing" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-black"
              onClick={() => window.open('tel:07403139086')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
            <Link to="/booking">
              <Button
                size="sm"
                className="bg-primary text-black hover:bg-primary/90"
              >
                <FileText className="w-4 h-4 mr-2" />
                Free Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 border-t border-primary/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-black"
                  onClick={() => {
                    window.open('tel:07403139086');
                    setIsMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </Button>
                <Link to="/booking">
                  <Button
                    size="sm"
                    className="bg-primary text-black hover:bg-primary/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

