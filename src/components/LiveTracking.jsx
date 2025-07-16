import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageCircle,
  Car,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

const LiveTracking = ({ bookingId = "IMC-2024-001", onClose }) => {
  const [driverLocation, setDriverLocation] = useState({
    lat: 52.9225,
    lng: -1.4746,
    address: "Derby City Centre"
  });
  
  const [customerLocation] = useState({
    lat: 52.9167,
    lng: -1.4667,
    address: "123 Ashbourne Road, Derby DE22 3BH"
  });

  const [trackingData, setTrackingData] = useState({
    status: 'en_route',
    estimatedArrival: '15 mins',
    driverName: 'James Wilson',
    driverPhone: '07403139086',
    vehicleReg: 'IMC 2024',
    serviceType: 'Exterior Detailing',
    distance: '2.3 miles',
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [isTracking, setIsTracking] = useState(true);

  // Simulate real-time location updates
  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setDriverLocation(prev => {
        // Simulate movement towards customer location
        const latDiff = customerLocation.lat - prev.lat;
        const lngDiff = customerLocation.lng - prev.lng;
        
        const newLat = prev.lat + (latDiff * 0.1);
        const newLng = prev.lng + (lngDiff * 0.1);
        
        // Update tracking data
        const distance = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2));
        const estimatedMins = Math.max(1, Math.round(distance * 100));
        
        setTrackingData(prevData => ({
          ...prevData,
          estimatedArrival: `${estimatedMins} mins`,
          distance: `${(distance * 100).toFixed(1)} miles`,
          lastUpdate: new Date().toLocaleTimeString(),
          status: distance < 0.01 ? 'arrived' : 'en_route'
        }));

        return {
          lat: newLat,
          lng: newLng,
          address: distance < 0.01 ? customerLocation.address : "En route to customer"
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isTracking, customerLocation]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'en_route': return 'bg-yellow-500';
      case 'arrived': return 'bg-green-500';
      case 'in_progress': return 'bg-purple-500';
      case 'completed': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Booking Confirmed';
      case 'en_route': return 'Driver En Route';
      case 'arrived': return 'Driver Arrived';
      case 'in_progress': return 'Service In Progress';
      case 'completed': return 'Service Completed';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Tracking</h1>
          <p className="text-gray-300">Booking ID: {bookingId}</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close Tracking
          </Button>
        )}
      </div>

      {/* Status Alert */}
      <Alert className={`border-l-4 ${getStatusColor(trackingData.status)} border-l-primary bg-primary/10`}>
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-white">
          <span className="font-semibold">{getStatusText(trackingData.status)}</span>
          {trackingData.status === 'en_route' && ` - ETA: ${trackingData.estimatedArrival}`}
          {trackingData.status === 'arrived' && ' - Your service provider has arrived!'}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Simulation */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Live Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-800 rounded-lg h-64 overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 400 300">
                    {/* Road lines */}
                    <path d="M0,150 Q100,100 200,150 T400,150" stroke="#4B5563" strokeWidth="3" fill="none" />
                    <path d="M200,0 Q150,100 200,200 T200,300" stroke="#4B5563" strokeWidth="3" fill="none" />
                    <path d="M0,100 L400,100" stroke="#374151" strokeWidth="2" fill="none" />
                    <path d="M0,200 L400,200" stroke="#374151" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
              
              {/* Driver Location */}
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{
                  left: `${30 + (driverLocation.lat - 52.9) * 1000}%`,
                  top: `${50 + (driverLocation.lng + 1.47) * 1000}%`
                }}
              >
                <div className="relative">
                  <div className="bg-primary rounded-full p-2 shadow-lg animate-pulse">
                    <Car className="w-4 h-4 text-black" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Driver
                  </div>
                </div>
              </div>

              {/* Customer Location */}
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${30 + (customerLocation.lat - 52.9) * 1000}%`,
                  top: `${50 + (customerLocation.lng + 1.47) * 1000}%`
                }}
              >
                <div className="relative">
                  <div className="bg-red-500 rounded-full p-2 shadow-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Your Location
                  </div>
                </div>
              </div>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={`${30 + (driverLocation.lat - 52.9) * 1000}%`}
                  y1={`${50 + (driverLocation.lng + 1.47) * 1000}%`}
                  x2={`${30 + (customerLocation.lat - 52.9) * 1000}%`}
                  y2={`${50 + (customerLocation.lng + 1.47) * 1000}%`}
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Distance:</span>
                <span className="text-white">{trackingData.distance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">ETA:</span>
                <span className="text-primary font-semibold">{trackingData.estimatedArrival}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Update:</span>
                <span className="text-white">{trackingData.lastUpdate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver & Service Info */}
        <div className="space-y-6">
          {/* Driver Information */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Truck className="w-5 h-5 mr-2 text-primary" />
                Driver Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/20 rounded-full p-3">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{trackingData.driverName}</h3>
                  <p className="text-gray-400 text-sm">Professional Detailer</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white">{trackingData.vehicleReg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-white">{trackingData.serviceType}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`tel:${trackingData.driverPhone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Driver
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-black"
                  onClick={() => window.open(`sms:${trackingData.driverPhone}`)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Progress */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Service Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 'Booking Confirmed', status: 'completed', time: '10:30 AM' },
                  { step: 'Driver Assigned', status: 'completed', time: '10:35 AM' },
                  { step: 'En Route to Location', status: trackingData.status === 'en_route' ? 'current' : 'completed', time: '10:45 AM' },
                  { step: 'Arrived at Location', status: trackingData.status === 'arrived' ? 'current' : trackingData.status === 'completed' ? 'completed' : 'pending', time: 'ETA 11:00 AM' },
                  { step: 'Service in Progress', status: trackingData.status === 'in_progress' ? 'current' : 'pending', time: 'Pending' },
                  { step: 'Service Completed', status: trackingData.status === 'completed' ? 'completed' : 'pending', time: 'Pending' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'current' ? 'bg-primary animate-pulse' :
                      'bg-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm ${
                        item.status === 'completed' ? 'text-green-400' :
                        item.status === 'current' ? 'text-primary' :
                        'text-gray-400'
                      }`}>
                        {item.step}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    {item.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="bg-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-primary text-primary">
                Live Tracking Active
              </Badge>
              <span className="text-gray-400 text-sm">
                Updates every 30 seconds
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTracking(!isTracking)}
                className="border-primary text-primary hover:bg-primary hover:text-black"
              >
                {isTracking ? 'Pause Tracking' : 'Resume Tracking'}
              </Button>
              <Button
                size="sm"
                className="bg-primary text-black hover:bg-primary/90"
                onClick={() => window.location.reload()}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Refresh Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;

