import React from 'react';
import SubscriptionSystem from '../components/SubscriptionSystem';
import LiveNotifications from '../components/LiveNotifications';

const SubscriptionBooking = () => {
  return (
    <div className="subscription-booking-page">
      <LiveNotifications customerId="guest" />
      <div className="container mx-auto px-4 py-8">
        <SubscriptionSystem />
      </div>
    </div>
  );
};

export default SubscriptionBooking;

