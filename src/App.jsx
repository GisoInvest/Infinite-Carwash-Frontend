import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Subscription System v2.0 - Complete transformation to subscription-based services
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SubscriptionPopup from './components/SubscriptionPopup';
import ChatBot from './components/ChatBot';
import LiveNotifications from './components/LiveNotifications';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import TermsConditions from './pages/TermsConditions';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import SubscriptionBooking from './pages/SubscriptionBooking';
import SubscriptionSuccess from './pages/SubscriptionSuccess';

import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  useEffect(() => {
    // Show subscription popup after 5 seconds
    const timer = setTimeout(() => {
      setShowSubscriptionPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <LiveNotifications customerId="guest" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<SubscriptionBooking />} />
            <Route path="/subscription" element={<SubscriptionSuccess />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />
            <Route path="/old-booking" element={<Booking />} />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Subscription Popup */}
        {showSubscriptionPopup && (
          <SubscriptionPopup onClose={() => setShowSubscriptionPopup(false)} />
        )}
        
        {/* AI Chatbot */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;

