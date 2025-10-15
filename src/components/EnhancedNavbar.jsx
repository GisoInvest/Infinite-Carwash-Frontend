import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import soundManager from '../utils/soundManager';
import logo from '../assets/IMCADUpdatedLogo.png';

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Play page transition sound when route changes
  useEffect(() => {
    soundManager.playPageTransition();
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'T&C', path: '/terms' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = async (e) => {
    await soundManager.playClick();
    setIsMenuOpen(false);
  };

  const handleMenuToggle = async () => {
    await soundManager.playClick();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCallClick = async () => {
    await soundManager.playNotification();
  };

  const NavLink = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        onClick={handleNavClick}
        className={`
          relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
          ${mobile ? 'block w-full text-left' : 'inline-block'}
          ${isActive 
            ? 'text-primary bg-primary/10 shadow-md scale-105' 
            : 'text-gray-300 hover:text-primary hover:bg-primary/5'
          }
          hover:scale-105 hover:shadow-lg transform-gpu
          active:scale-95
          group
        `}
      >
        <span className="relative z-10">{item.name}</span>
        
        {/* Animated underline for desktop */}
        {!mobile && (
          <div className={`
            absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
          `} />
        )}
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-md bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-150 ease-out" />
      </Link>
    );
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
      ${isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-primary/20' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleNavClick}
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Infinite Mobile Carwash & Detailing" 
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Call Button & Admin */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/admin" 
              onClick={handleNavClick}
              className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 hover:scale-105 transform-gpu"
            >
              🔐 ADMIN
            </Link>
            
            <Button
              onClick={handleCallClick}
              className="bg-primary text-black hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg transform-gpu active:scale-95"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMenuToggle}
              className="text-gray-300 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0'
          }
        `}>
          <div className="bg-background/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg border border-primary/20">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} mobile />
              ))}
              
              <div className="pt-4 border-t border-primary/20 space-y-2">
                <Link 
                  to="/admin" 
                  onClick={handleNavClick}
                  className="block px-3 py-2 text-sm text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  🔐 ADMIN
                </Link>
                
                <Button
                  onClick={handleCallClick}
                  className="w-full bg-primary text-black hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
