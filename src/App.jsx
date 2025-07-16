import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SubscriptionPopup from './components/SubscriptionPopup';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import TermsConditions from './pages/TermsConditions';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import Admin from './pages/Admin';
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
            <Route path="/booking" element={<Booking />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
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

