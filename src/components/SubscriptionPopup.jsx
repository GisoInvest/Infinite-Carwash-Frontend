import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, Gift } from 'lucide-react';

const SubscriptionPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      
      try {
          // Send subscription data to backend
        const response = await fetch('https://infinite-carwash-backend.onrender.com/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          })
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Subscription successful:', result);
          setIsSubmitted(true);
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          console.error('Subscription failed:', result.message);
          alert('Subscription failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting subscription:', error);
        alert('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-primary/20 max-w-md w-full relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>

        {!isSubmitted ? (
          <>
            <CardHeader className="text-center pb-4">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-white text-2xl">
                Get <span className="text-primary">20% OFF</span> Your First Service!
              </CardTitle>
              <p className="text-gray-400">
                Subscribe to our newsletter and receive exclusive offers, car care tips, and service updates.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="bg-input border-primary/20 text-white placeholder-gray-400"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isLoading ? 'Subscribing...' : 'Subscribe & Save 20%'}
                </Button>
              </form>
              <p className="text-gray-500 text-xs text-center mt-4">
                By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
              </p>
            </CardContent>
          </>
        ) : (
          <CardContent className="text-center py-12">
            <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400">
              You've successfully subscribed! Check your email for your 20% discount code.
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SubscriptionPopup;

