import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SubscriptionSuccess.css';

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');
  const success = searchParams.get('success');
  const cancelled = searchParams.get('cancelled');

  useEffect(() => {
    if (cancelled) {
      setLoading(false);
      return;
    }

    if (success && sessionId) {
      // Fetch session details from backend
      fetchSessionDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId, success, cancelled]);

  const fetchSessionDetails = async (sessionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://infinite-carwash-backend.onrender.com'}/api/stripe/session/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
      } else {
        setError('Unable to retrieve booking details');
      }
    } catch (err) {
      console.error('Error fetching session details:', err);
      setError('Unable to retrieve booking details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="subscription-success-container">
        <div className="success-card">
          <div className="loading-spinner"></div>
          <h2>Processing your booking...</h2>
          <p>Please wait while we confirm your subscription details.</p>
        </div>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="subscription-success-container">
        <div className="success-card cancelled">
          <div className="icon-container">
            <div className="cancel-icon">✕</div>
          </div>
          <h1>Booking Cancelled</h1>
          <p>Your subscription booking was cancelled. No payment has been processed.</p>
          <div className="action-buttons">
            <Link to="/pricing" className="btn btn-primary">
              Try Again
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subscription-success-container">
        <div className="success-card error">
          <div className="icon-container">
            <div className="error-icon">⚠</div>
          </div>
          <h1>Booking Confirmation</h1>
          <p>Your payment was successful, but we're having trouble retrieving your booking details.</p>
          <p className="error-message">{error}</p>
          <div className="contact-info">
            <p><strong>Don't worry!</strong> Your subscription is active and you'll receive a confirmation email shortly.</p>
            <p>If you have any questions, please contact us:</p>
            <p>📞 <a href="tel:07403139086">07403139086</a></p>
            <p>✉️ <a href="mailto:infinitemobilecarwashdetailing@gmail.com">infinitemobilecarwashdetailing@gmail.com</a></p>
          </div>
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-success-container">
      <div className="success-card">
        <div className="icon-container">
          <div className="success-icon">✓</div>
        </div>
        
        <h1>Booking Confirmed!</h1>
        <p className="success-message">
          Thank you for choosing Infinite Mobile Carwash & Detailing! 
          Your subscription has been successfully set up.
        </p>

        {sessionData && (
          <div className="booking-details">
            <h3>Subscription Details</h3>
            <div className="detail-row">
              <span className="label">Service:</span>
              <span className="value">{sessionData.service_name || 'Car Care Subscription'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value">£{sessionData.amount || 'N/A'}/month</span>
            </div>
            <div className="detail-row">
              <span className="label">Frequency:</span>
              <span className="value">{sessionData.frequency || 'Monthly'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Customer:</span>
              <span className="value">{sessionData.customer_name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{sessionData.customer_email || 'N/A'}</span>
            </div>
          </div>
        )}

        <div className="next-steps">
          <h3>What happens next?</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Email Confirmation</h4>
                <p>You'll receive a confirmation email with your subscription details within the next few minutes.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Service Scheduling</h4>
                <p>Our team will contact you within 24 hours to schedule your first service appointment.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Premium Service</h4>
                <p>Enjoy professional car care delivered to your location on your preferred schedule.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <h3>Need Help?</h3>
          <p>If you have any questions about your subscription, please don't hesitate to contact us:</p>
          <div className="contact-methods">
            <a href="tel:07403139086" className="contact-method">
              <span className="contact-icon">📞</span>
              <span>07403139086</span>
            </a>
            <a href="mailto:infinitemobilecarwashdetailing@gmail.com" className="contact-method">
              <span className="contact-icon">✉️</span>
              <span>infinitemobilecarwashdetailing@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/services" className="btn btn-secondary">
            View Our Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
