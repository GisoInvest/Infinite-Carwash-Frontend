import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Info } from 'lucide-react';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState(searchParams.get('booking') || '');
  const [isTracking, setIsTracking] = useState(!!searchParams.get('booking'));
  const [error, setError] = useState('');

  const handleTrackBooking = () => {
    if (!bookingId.trim()) {
      setError('Please enter a valid booking ID');
      return;
    }
    
    // Simulate booking validation
    if (bookingId.length < 5) {
      setError('Invalid booking ID format');
      return;
    }

    setError('');
    setIsTracking(true);
  };

  const handleCloseTracking = () => {
    setIsTracking(false);
    setBookingId('');
    navigate('/tracking');
  };

  if (isTracking) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LiveTracking bookingId={bookingId} onClose={handleCloseTracking} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Track Your Service
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Enter your booking ID to track your mobile service in real-time
          </p>
        </div>

        <div className="space-y-8">
          {/* Booking ID Input */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary" />
                Enter Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Booking ID
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={bookingId}
                    onChange={(e) => {
                      setBookingId(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g., IMC-2024-001"
                    className="bg-input border-primary/20 text-white flex-1"
                  />
                  <Button
                    onClick={handleTrackBooking}
                    className="bg-primary text-black hover:bg-primary/90"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Track Service
                  </Button>
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
              
              <Alert className="border-primary/20 bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-gray-300">
                  Your booking ID was sent to you via email after booking confirmation. 
                  It follows the format IMC-YYYY-XXX.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Demo Tracking */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white">Try Demo Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Want to see how our live tracking works? Try our demo with a sample booking.
              </p>
              <Button
                onClick={() => {
                  setBookingId('IMC-2024-DEMO');
                  setIsTracking(true);
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-black"
              >
                View Demo Tracking
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Location</h3>
                <p className="text-gray-400 text-sm">
                  Track your service provider's exact location as they travel to you
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Live Updates</h3>
                <p className="text-gray-400 text-sm">
                  Get automatic updates on arrival time and service progress
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Direct Contact</h3>
                <p className="text-gray-400 text-sm">
                  Call or message your service provider directly from the tracking page
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;

