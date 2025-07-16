import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Shield, Lock } from 'lucide-react';

// This will be loaded from your backend
let stripePromise = null;

const StripePaymentForm = ({ bookingData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('https://infinite-carwash-backend.onrender.com/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: Math.round(bookingData.depositAmount * 100), // Convert to pence
          currency: 'gbp',
          booking_data: {
            booking_id: bookingData.bookingId || '',
            customer_name: bookingData.customerName,
            customer_email: bookingData.customerEmail,
            customer_phone: bookingData.customerPhone,
            service_type: bookingData.serviceType,
            vehicle_type: bookingData.vehicleType,
            service_date: bookingData.serviceDate,
            service_time: bookingData.serviceTime,
            service_location: bookingData.serviceLocation,
            address: bookingData.address,
            total_amount: bookingData.totalAmount,
            special_requests: bookingData.specialRequests
          }
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setClientSecret(result.client_secret);
      } else {
        setError(result.message || 'Failed to initialize payment');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: bookingData.customerName,
            email: bookingData.customerEmail,
            phone: bookingData.customerPhone,
          },
        },
      }
    );

    setProcessing(false);

    if (stripeError) {
      setError(stripeError.message);
      onPaymentError && onPaymentError(stripeError.message);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment successful - confirm with backend
      try {
        const confirmResponse = await fetch('https://infinite-carwash-backend.onrender.com/api/payment/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_intent_id: paymentIntent.id,
            booking_data: bookingData
          })
        });

        const confirmResult = await confirmResponse.json();
        
        if (confirmResult.success) {
          onPaymentSuccess && onPaymentSuccess({
            paymentIntentId: paymentIntent.id,
            bookingId: confirmResult.booking_id,
            bookingData: confirmResult.booking_data
          });
        } else {
          setError(confirmResult.message || 'Payment confirmation failed');
          onPaymentError && onPaymentError(confirmResult.message);
        }
      } catch (err) {
        setError('Payment succeeded but confirmation failed. Please contact support.');
        onPaymentError && onPaymentError('Confirmation error');
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'transparent',
        '::placeholder': {
          color: '#9ca3af',
        },
        iconColor: '#d1d5db',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: false,
  };

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <CreditCard className="w-5 h-5 mr-2" />
          Secure Payment
        </CardTitle>
        <div className="flex items-center text-sm text-gray-400">
          <Shield className="w-4 h-4 mr-1" />
          Your payment is secured by Stripe
        </div>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert className="mb-4 border-red-500 bg-red-500/10">
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Card Details
            </label>
            <div className="p-3 border border-primary/20 rounded-md bg-input">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Service Total:</span>
              <span className="text-white font-semibold">£{bookingData.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Deposit Required:</span>
              <span className="text-primary font-semibold">£{bookingData.depositAmount}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-primary/20">
              <span className="text-gray-300">Remaining Balance:</span>
              <span className="text-white">£{(bookingData.totalAmount - bookingData.depositAmount).toFixed(2)}</span>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              <Lock className="w-3 h-3 inline mr-1" />
              Deposit is non-refundable if booking is cancelled
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-black hover:bg-primary/90"
            disabled={!stripe || processing || !clientSecret}
          >
            {processing ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </div>
            ) : (
              `Pay Deposit £${bookingData.depositAmount} & Complete Booking`
            )}
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-400 text-center">
          <div className="flex items-center justify-center space-x-4">
            <span>Powered by Stripe</span>
            <span>•</span>
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>PCI Compliant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StripePayment = ({ bookingData, onPaymentSuccess, onPaymentError }) => {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeError, setStripeError] = useState('');

  useEffect(() => {
    initializeStripe();
  }, []);

  const initializeStripe = async () => {
    try {
      // Get Stripe publishable key from backend
      const response = await fetch('https://infinite-carwash-backend.onrender.com/api/payment/stripe-config');
      const config = await response.json();
      
      if (config.success && config.publishable_key) {
        stripePromise = loadStripe(config.publishable_key);
        setStripeLoaded(true);
      } else {
        setStripeError('Failed to load payment system configuration');
      }
    } catch (error) {
      setStripeError('Failed to initialize payment system');
    }
  };

  if (stripeError) {
    return (
      <Alert className="border-red-500 bg-red-500/10">
        <AlertDescription className="text-red-400">
          {stripeError}
        </AlertDescription>
      </Alert>
    );
  }

  if (!stripeLoaded) {
    return (
      <Card className="bg-card border-primary/20">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-400">Loading secure payment system...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        bookingData={bookingData}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default StripePayment;

