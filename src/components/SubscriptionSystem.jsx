import React, { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';
import './SubscriptionSystem.css';

const SubscriptionSystem = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    postcode: '',
    preferred_day: '',
    preferred_time: '',
    start_date: '',
    special_requests: '',
    notification_email: true,
    notification_sms: true,
    notification_days_ahead: 2
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1: Plans, 2: Configuration, 3: Customer Info, 4: Confirmation

  useEffect(() => {
    fetchSubscriptionPlans();
    setDefaultStartDate();
  }, []);

  useEffect(() => {
    if (selectedPlan && selectedVehicleType && selectedFrequency) {
      calculatePrice();
    }
  }, [selectedPlan, selectedVehicleType, selectedFrequency]);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await apiRequest('/api/v2/subscription-plans');
      if (response.success) {
        setSubscriptionPlans(response.plans);
      } else {
        setMessage('Failed to load subscription plans');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setMessage('Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const setDefaultStartDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    setCustomerInfo(prev => ({ ...prev, start_date: dateString }));
  };

  const calculatePrice = () => {
    if (selectedPlan && selectedPlan.pricing_examples && selectedPlan.pricing_examples[selectedVehicleType]) {
      const price = selectedPlan.pricing_examples[selectedVehicleType][selectedFrequency];
      setCalculatedPrice(price || 0);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setSelectedVehicleType('');
    setSelectedFrequency('');
    setCalculatedPrice(0);
    setStep(2);
  };

  const handleConfigurationNext = () => {
    if (!selectedVehicleType || !selectedFrequency) {
      setMessage('Please select vehicle type and frequency');
      return;
    }
    setMessage('');
    setStep(3);
  };

  const handleCustomerInfoNext = () => {
    const required = ['customer_name', 'customer_email', 'customer_phone', 'address', 'postcode', 'preferred_day', 'preferred_time', 'start_date'];
    const missing = required.filter(field => !customerInfo[field]);
    
    if (missing.length > 0) {
      setMessage(`Please fill in: ${missing.join(', ')}`);
      return;
    }
    
    setMessage('');
    setStep(4);
  };

  const handleSubscriptionSubmit = async () => {
    setSubmitting(true);
    setMessage('');

    try {
      const subscriptionData = {
        plan_id: selectedPlan.plan_id,
        vehicle_type: selectedVehicleType,
        frequency: selectedFrequency,
        service_location: 'Mobile Service',
        ...customerInfo
      };

      console.log('Submitting subscription:', subscriptionData);

      const response = await apiRequest('/api/v2/create-subscription', {
        method: 'POST',
        body: JSON.stringify(subscriptionData)
      });

      if (response.success) {
        setMessage(`Subscription created successfully! Your subscription ID is: ${response.subscription_id}`);
        // Reset form or redirect
        setTimeout(() => {
          window.location.href = '/subscription-success';
        }, 3000);
      } else {
        setMessage(`Failed to create subscription: ${response.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Failed to create subscription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const vehicleTypes = [
    { value: 'small_car', label: 'Small Car', description: 'Compact cars, hatchbacks' },
    { value: 'medium_car', label: 'Medium Car', description: 'Sedans, small SUVs' },
    { value: 'large_car', label: 'Large Car', description: 'Large sedans, SUVs' },
    { value: 'van', label: 'Van', description: 'Vans, large vehicles' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', description: 'Every week (4 services/month)', discount: '15% discount' },
    { value: 'bi_weekly', label: 'Bi-Weekly', description: 'Every 2 weeks (2 services/month)', discount: '10% discount' },
    { value: 'monthly', label: 'Monthly', description: 'Once per month (1 service/month)', discount: 'Standard rate' }
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  if (loading) {
    return (
      <div className="subscription-system">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-system">
      <div className="subscription-header">
        <h1>Car Care Subscriptions</h1>
        <p>Choose a subscription plan that fits your needs and schedule</p>
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Choose Plan</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Configure</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Your Info</div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Confirm</div>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Step 1: Plan Selection */}
      {step === 1 && (
        <div className="plans-grid">
          <div className="basic-services">
            <h2>Basic Services</h2>
            <div className="plans-row">
              {subscriptionPlans.filter(plan => !plan.is_premium).map(plan => (
                <div key={plan.plan_id} className="plan-card">
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-duration">{plan.duration_minutes} minutes</div>
                  </div>
                  
                  <div className="plan-features">
                    <h4>What's included:</h4>
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="plan-pricing">
                    <div className="base-price">From £{plan.base_price}/service</div>
                    <div className="subscription-note">Subscription pricing available</div>
                  </div>
                  
                  <button 
                    className="select-plan-btn"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Choose This Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-services">
            <h2>Premium Services</h2>
            <div className="plans-row">
              {subscriptionPlans.filter(plan => plan.is_premium).map(plan => (
                <div key={plan.plan_id} className="plan-card premium">
                  <div className="premium-badge">Premium</div>
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-duration">{plan.duration_minutes} minutes</div>
                  </div>
                  
                  <div className="plan-features">
                    <h4>What's included:</h4>
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="plan-pricing">
                    <div className="base-price">From £{plan.base_price}/service</div>
                    <div className="subscription-note">Subscription pricing available</div>
                  </div>
                  
                  <button 
                    className="select-plan-btn premium"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Choose This Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Configuration */}
      {step === 2 && selectedPlan && (
        <div className="configuration-step">
          <div className="selected-plan-summary">
            <h2>Configure Your {selectedPlan.name} Subscription</h2>
            <p>{selectedPlan.description}</p>
          </div>

          <div className="configuration-grid">
            <div className="vehicle-selection">
              <h3>Select Your Vehicle Type</h3>
              <div className="vehicle-options">
                {vehicleTypes.map(vehicle => (
                  <div 
                    key={vehicle.value}
                    className={`vehicle-option ${selectedVehicleType === vehicle.value ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicleType(vehicle.value)}
                  >
                    <h4>{vehicle.label}</h4>
                    <p>{vehicle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="frequency-selection">
              <h3>Choose Service Frequency</h3>
              <div className="frequency-options">
                {frequencyOptions.filter(freq => selectedPlan.frequency_options.includes(freq.value)).map(frequency => (
                  <div 
                    key={frequency.value}
                    className={`frequency-option ${selectedFrequency === frequency.value ? 'selected' : ''}`}
                    onClick={() => setSelectedFrequency(frequency.value)}
                  >
                    <h4>{frequency.label}</h4>
                    <p>{frequency.description}</p>
                    <div className="discount">{frequency.discount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {calculatedPrice > 0 && (
            <div className="price-display">
              <div className="price-label">Monthly Subscription Price</div>
              <div className="price-amount">£{calculatedPrice}</div>
              <div className="price-details">
                This includes all {selectedFrequency === 'weekly' ? '4' : selectedFrequency === 'bi_weekly' ? '2' : '1'} service{selectedFrequency !== 'monthly' ? 's' : ''} per month
              </div>
              {selectedFrequency !== 'monthly' && (
                <div className="price-savings">
                  🎉 You're saving {selectedFrequency === 'weekly' ? '15%' : '10%'} with this plan!
                </div>
              )}
              <div className="price-breakdown">
                <div className="breakdown-item">
                  <span>Service Type:</span>
                  <span className="breakdown-value">{selectedPlan?.name}</span>
                </div>
                <div className="breakdown-item">
                  <span>Vehicle Type:</span>
                  <span className="breakdown-value">{vehicleTypes.find(v => v.value === selectedVehicleType)?.label}</span>
                </div>
                <div className="breakdown-item">
                  <span>Frequency:</span>
                  <span className="breakdown-value">{frequencyOptions.find(f => f.value === selectedFrequency)?.label}</span>
                </div>
              </div>
            </div>
          )}

          <div className="step-navigation">
            <button onClick={() => setStep(1)} className="nav-button back">
              ← Back
            </button>
            <button onClick={handleConfigurationNext} className="nav-button next">
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customer Information */}
      {step === 3 && (
        <div className="customer-info-step">
          <h2>✨ Your Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={customerInfo.customer_name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, customer_name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={customerInfo.customer_email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, customer_email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={customerInfo.customer_phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, customer_phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group full-width">
              <label>Service Address *</label>
              <input
                type="text"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Where should we provide the service?"
              />
            </div>

            <div className="form-group">
              <label>Postcode *</label>
              <input
                type="text"
                value={customerInfo.postcode}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, postcode: e.target.value }))}
                placeholder="Enter postcode"
              />
            </div>

            <div className="form-group">
              <label>Preferred Day *</label>
              <select
                value={customerInfo.preferred_day}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, preferred_day: e.target.value }))}
              >
                <option value="">Select day</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day.toLowerCase()}>{day}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Preferred Time *</label>
              <select
                value={customerInfo.preferred_time}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, preferred_time: e.target.value }))}
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                value={customerInfo.start_date}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, start_date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group full-width">
              <label>Special Requests (Optional)</label>
              <textarea
                value={customerInfo.special_requests}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, special_requests: e.target.value }))}
                placeholder="Any special instructions or requests..."
                rows="3"
              />
            </div>

            <div className="notification-preferences full-width">
              <h3>Notification Preferences</h3>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={customerInfo.notification_email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notification_email: e.target.checked }))}
                  />
                  Email notifications
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={customerInfo.notification_sms}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notification_sms: e.target.checked }))}
                  />
                  SMS notifications
                </label>
              </div>
              <div className="form-group">
                <label>Notify me</label>
                <select
                  value={customerInfo.notification_days_ahead}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notification_days_ahead: parseInt(e.target.value) }))}
                >
                  <option value={1}>1 day before service</option>
                  <option value={2}>2 days before service</option>
                  <option value={3}>3 days before service</option>
                </select>
              </div>
            </div>
          </div>

          <div className="step-navigation">
            <button onClick={() => setStep(2)} className="nav-button back">
              ← Back
            </button>
            <button onClick={handleCustomerInfoNext} className="nav-button next">
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="confirmation-step">
          <h2>🎉 Confirm Your Subscription</h2>
          
          <div className="confirmation-summary">
            <div className="plan-summary">
              <h3>📋 {selectedPlan.name}</h3>
              <p>{selectedPlan.description}</p>
              <div className="service-details">
                <div>🚗 Vehicle: {vehicleTypes.find(v => v.value === selectedVehicleType)?.label}</div>
                <div>📅 Frequency: {frequencyOptions.find(f => f.value === selectedFrequency)?.label}</div>
                <div>⏱️ Duration: {selectedPlan.duration_minutes} minutes per service</div>
              </div>
            </div>

            <div className="customer-summary">
              <h3>👤 Customer Information</h3>
              <div>📝 Name: {customerInfo.customer_name}</div>
              <div>📧 Email: {customerInfo.customer_email}</div>
              <div>📞 Phone: {customerInfo.customer_phone}</div>
              <div>🏠 Address: {customerInfo.address}, {customerInfo.postcode}</div>
              <div>📆 Schedule: {customerInfo.preferred_day}s at {customerInfo.preferred_time}</div>
              <div>🗓️ Start Date: {new Date(customerInfo.start_date).toLocaleDateString()}</div>
            </div>

            <div className="pricing-summary">
              <h3>💰 Subscription Pricing</h3>
              <div className="price-breakdown">
                <div className="monthly-price">Monthly Price: £{calculatedPrice}</div>
                <div>Services per month: {selectedFrequency === 'weekly' ? '4' : selectedFrequency === 'bi_weekly' ? '2' : '1'}</div>
                <div>Price per service: £{(calculatedPrice / (selectedFrequency === 'weekly' ? 4 : selectedFrequency === 'bi_weekly' ? 2 : 1)).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="terms-agreement">
            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>I agree to the terms and conditions of the subscription service</span>
            </label>
          </div>

          <div className="step-navigation">
            <button onClick={() => setStep(3)} className="nav-button back">
              ← Back
            </button>
            <button 
              onClick={handleSubscriptionSubmit} 
              className="nav-button confirm"
              disabled={submitting}
            >
              {submitting ? '⏳ Creating Subscription...' : `🎯 Confirm Subscription - £${calculatedPrice}/month`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSystem;

