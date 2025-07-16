import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Car, 
  Truck, 
  MapPin, 
  Building, 
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  Info,
  ArrowLeft
} from 'lucide-react';
import StripePayment from './StripePayment';

const BookingSystem = () => {
  const [currentStep, setCurrentStep] = useState('booking'); // 'booking' or 'payment'
  const [bookingData, setBookingData] = useState({
    vehicleType: '',
    service: '',
    serviceLocation: '',
    date: '',
    time: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      postcode: ''
    },
    specialRequests: ''
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    deposit: 0,
    depositPercentage: 0
  });

  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]); // Simulate existing bookings
  const [paymentData, setPaymentData] = useState(null);

  const vehicleTypes = [
    { id: 'small', name: 'Small Car', icon: <Car className="w-6 h-6" />, examples: 'Fiesta, Polo, Corsa, Mini' },
    { id: 'medium', name: 'Medium Car', icon: <Car className="w-7 h-7" />, examples: 'Focus, Golf, Astra, Civic' },
    { id: 'large', name: 'Large Car', icon: <Car className="w-8 h-8" />, examples: 'BMW 5 Series, Audi A6, Mercedes E-Class' },
    { id: 'van', name: 'Van', icon: <Truck className="w-8 h-8" />, examples: 'Transit, Sprinter, Vivaro, Crafter' }
  ];

  const services = {
    core: [
      { 
        id: 'car-wash', 
        name: 'Car Wash', 
        prices: { small: 7, medium: 9, large: 12, van: 14 },
        duration: '30 mins'
      },
      { 
        id: 'mini-valet', 
        name: 'Mini Valet', 
        prices: { small: 14, medium: 16, large: 18, van: 20 },
        duration: '1 hour'
      },
      { 
        id: 'full-valet', 
        name: 'Full Valet', 
        prices: { small: 45, medium: 55, large: 65, van: 70 },
        duration: '2-3 hours'
      }
    ],
    premium: [
      { id: 'interior-detailing', name: 'Interior Detailing', price: 120, duration: '2-3 hours' },
      { id: 'exterior-detailing', name: 'Exterior Detailing', price: 200, duration: '4-5 hours' },
      { id: 'full-detailing', name: 'Full Detailing', price: 300, duration: '6-8 hours' },
      { id: 'stage1-polishing', name: 'Stage 1 Polishing', price: 400, duration: '3-4 hours' },
      { id: 'stage2-polishing', name: 'Stage 2 Polishing', price: 550, duration: '6+ hours' }
    ]
  };

  const serviceLocations = [
    { id: 'mobile', name: 'Mobile Service', icon: <Car className="w-5 h-5" />, description: 'We come to your location' },
    { id: 'unit', name: 'Visit Our Unit', icon: <Building className="w-5 h-5" />, description: 'Drop off at our facility' }
  ];

  // Calculate pricing when vehicle type or service changes
  useEffect(() => {
    if (bookingData.vehicleType && bookingData.service) {
      let basePrice = 0;
      
      // Find the service and calculate price
      const coreService = services.core.find(s => s.id === bookingData.service);
      const premiumService = services.premium.find(s => s.id === bookingData.service);
      
      if (coreService) {
        basePrice = coreService.prices[bookingData.vehicleType];
      } else if (premiumService) {
        basePrice = premiumService.price;
      }

      // Calculate deposit
      let deposit = 0;
      let depositPercentage = 0;
      
      if (basePrice >= 500) {
        deposit = basePrice * 0.5; // 50% for services over £500
        depositPercentage = 50;
      } else if (basePrice >= 200) {
        deposit = 70; // £70 for services over £200
        depositPercentage = Math.round((70 / basePrice) * 100);
      }

      setPricing({ basePrice, deposit, depositPercentage });
    }
  }, [bookingData.vehicleType, bookingData.service]);

  // Generate available time slots (avoiding double bookings)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      const slotKey = `${bookingData.date}-${timeSlot}`;
      
      if (!bookedSlots.includes(slotKey)) {
        slots.push(timeSlot);
      }
    }
    return slots;
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare payment data
    const paymentBookingData = {
      customerName: bookingData.customerInfo.name,
      customerEmail: bookingData.customerInfo.email,
      customerPhone: bookingData.customerInfo.phone,
      serviceType: services.core.find(s => s.id === bookingData.service)?.name || services.premium.find(s => s.id === bookingData.service)?.name,
      vehicleType: vehicleTypes.find(v => v.id === bookingData.vehicleType)?.name,
      serviceDate: bookingData.date,
      serviceTime: bookingData.time,
      serviceLocation: serviceLocations.find(l => l.id === bookingData.serviceLocation)?.name,
      address: bookingData.serviceLocation === 'mobile' ? bookingData.customerInfo.address : 'Unit Visit',
      totalAmount: pricing.basePrice,
      depositAmount: pricing.deposit,
      specialRequests: bookingData.specialRequests
    };

    setPaymentData(paymentBookingData);
    
    if (pricing.deposit > 0) {
      // Go to payment step for deposit
      setCurrentStep('payment');
    } else {
      // No deposit required, complete booking directly
      try {
        const response = await fetch('https://infinite-carwash-backend.onrender.com/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentBookingData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Booking confirmed:', result);
          
          // Add the booked slot to prevent double booking
          const slotKey = `${bookingData.date}-${bookingData.time}`;
          setBookedSlots(prev => [...prev, slotKey]);
          
          // Show booking confirmation
          setIsBookingComplete(true);
        } else {
          throw new Error('Failed to create booking');
        }
      } catch (error) {
        console.error('Error submitting booking:', error);
        alert('Failed to submit booking. Please try again.');
      }
    }
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log('Payment successful:', paymentResult);
    
    // Add the booked slot to prevent double booking
    const slotKey = `${bookingData.date}-${bookingData.time}`;
    setBookedSlots(prev => [...prev, slotKey]);
    
    // Show booking confirmation
    setIsBookingComplete(true);
    setCurrentStep('booking');
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error}. Please try again.`);
  };

  const handleBackToBooking = () => {
    setCurrentStep('booking');
    setPaymentData(null);
  };

  const isFormValid = () => {
    return bookingData.vehicleType && 
           bookingData.service && 
           bookingData.serviceLocation && 
           bookingData.date && 
           bookingData.time && 
           bookingData.customerInfo.name && 
           bookingData.customerInfo.email && 
           bookingData.customerInfo.phone;
  };

  // Show payment step
  if (currentStep === 'payment' && paymentData) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Your Payment</h1>
          <p className="text-gray-300 text-lg">
            Secure your booking with a deposit payment
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Button
            onClick={handleBackToBooking}
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Booking Details
          </Button>
        </div>

        {/* Booking Summary */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <p><span className="text-primary">Service:</span> {paymentData.serviceType}</p>
                <p><span className="text-primary">Vehicle:</span> {paymentData.vehicleType}</p>
                <p><span className="text-primary">Date & Time:</span> {paymentData.serviceDate} at {paymentData.serviceTime}</p>
                <p><span className="text-primary">Location:</span> {paymentData.serviceLocation}</p>
              </div>
              <div>
                <p><span className="text-primary">Customer:</span> {paymentData.customerName}</p>
                <p><span className="text-primary">Email:</span> {paymentData.customerEmail}</p>
                <p><span className="text-primary">Phone:</span> {paymentData.customerPhone}</p>
                {paymentData.address !== 'Unit Visit' && (
                  <p><span className="text-primary">Address:</span> {paymentData.address}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Component */}
        <StripePayment
          bookingData={paymentData}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    );
  }

  if (isBookingComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for booking with Infinite Mobile Carwash & Detailing. 
              We've sent a confirmation email with all the details.
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Booking Summary</h3>
              <div className="text-left space-y-2 text-gray-300">
                <p><span className="text-primary">Service:</span> {services.core.find(s => s.id === bookingData.service)?.name || services.premium.find(s => s.id === bookingData.service)?.name}</p>
                <p><span className="text-primary">Vehicle:</span> {vehicleTypes.find(v => v.id === bookingData.vehicleType)?.name}</p>
                <p><span className="text-primary">Date & Time:</span> {bookingData.date} at {bookingData.time}</p>
                <p><span className="text-primary">Location:</span> {serviceLocations.find(l => l.id === bookingData.serviceLocation)?.name}</p>
                <p><span className="text-primary">Total Price:</span> £{pricing.basePrice}</p>
                {pricing.deposit > 0 && (
                  <p><span className="text-primary">Deposit Paid:</span> £{pricing.deposit}</p>
                )}
              </div>
            </div>
            <Button 
              onClick={() => {
                setIsBookingComplete(false);
                setBookingData({
                  vehicleType: '',
                  service: '',
                  serviceLocation: '',
                  date: '',
                  time: '',
                  customerInfo: { name: '', email: '', phone: '', address: '', postcode: '' },
                  specialRequests: ''
                });
                setPricing({ basePrice: 0, deposit: 0, depositPercentage: 0 });
              }}
              className="bg-primary text-black hover:bg-primary/90"
            >
              Book Another Service
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Book Your Service</h1>
        <p className="text-gray-300 text-lg">
          Choose your vehicle type, service, and preferred time. We'll take care of the rest!
        </p>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-8">
        {/* Vehicle Type Selection */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">1. Select Your Vehicle Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleInputChange('vehicleType', vehicle.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                    bookingData.vehicleType === vehicle.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-600 hover:border-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3 text-primary">
                      {vehicle.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{vehicle.name}</h3>
                    <p className="text-gray-400 text-sm">{vehicle.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Selection */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">2. Choose Your Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Core Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Core Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.core.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleInputChange('service', service.id)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                        bookingData.service === service.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <h4 className="font-semibold text-white mb-2">{service.name}</h4>
                      <p className="text-gray-400 text-sm mb-2">{service.duration}</p>
                      {bookingData.vehicleType && (
                        <p className="text-primary font-semibold">
                          £{service.prices[bookingData.vehicleType]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Premium Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.premium.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleInputChange('service', service.id)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                        bookingData.service === service.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <h4 className="font-semibold text-white mb-2">{service.name}</h4>
                      <p className="text-gray-400 text-sm mb-2">{service.duration}</p>
                      <p className="text-primary font-semibold">£{service.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Location */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">3. Service Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleInputChange('serviceLocation', location.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                    bookingData.serviceLocation === location.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-600 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">{location.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white">{location.name}</h4>
                      <p className="text-gray-400 text-sm">{location.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Date and Time */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">4. Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date
                </label>
                <Input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-input border-primary/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full bg-input border border-primary/20 rounded-md px-3 py-2 text-white"
                  required
                >
                  <option value="">Select time</option>
                  {bookingData.date && generateTimeSlots().map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">5. Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <Input
                  type="text"
                  value={bookingData.customerInfo.name}
                  onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                  className="bg-input border-primary/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                <Input
                  type="tel"
                  value={bookingData.customerInfo.phone}
                  onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                  className="bg-input border-primary/20 text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <Input
                  type="email"
                  value={bookingData.customerInfo.email}
                  onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                  className="bg-input border-primary/20 text-white"
                  required
                />
              </div>
              {bookingData.serviceLocation === 'mobile' && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service Address (for mobile service)
                    </label>
                    <Input
                      type="text"
                      value={bookingData.customerInfo.address}
                      onChange={(e) => handleInputChange('customerInfo.address', e.target.value)}
                      className="bg-input border-primary/20 text-white"
                      placeholder="Full address where service should be performed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Postcode</label>
                    <Input
                      type="text"
                      value={bookingData.customerInfo.postcode}
                      onChange={(e) => handleInputChange('customerInfo.postcode', e.target.value)}
                      className="bg-input border-primary/20 text-white"
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Special Requests */}
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">6. Special Requests (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={bookingData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements or notes about your vehicle..."
              className="bg-input border-primary/20 text-white"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        {pricing.basePrice > 0 && (
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Service Price:</span>
                  <span className="text-white font-semibold text-lg">£{pricing.basePrice}</span>
                </div>
                {pricing.deposit > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Deposit Required:</span>
                      <span className="text-primary font-semibold">£{pricing.deposit} ({pricing.depositPercentage}%)</span>
                    </div>
                    <Alert className="border-primary/20 bg-primary/10">
                      <Info className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-gray-300">
                        Deposit is non-refundable if you cancel the booking. 
                        Remaining balance (£{pricing.basePrice - pricing.deposit}) due on completion.
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={!isFormValid()}
            className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pricing.deposit > 0 ? `Pay Deposit £${pricing.deposit} & Book` : `Book Service £${pricing.basePrice}`}
          </Button>
          {!isFormValid() && (
            <p className="text-gray-400 text-sm mt-2">
              Please fill in all required fields to continue
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingSystem;

