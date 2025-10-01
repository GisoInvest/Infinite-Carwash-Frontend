import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { 
  Car, 
  Truck, 
  Clock,
  CheckCircle,
  Star,
  Info,
  MapPin,
  Home,
  X,
  Wrench,
  Calendar
} from 'lucide-react';

const Pricing = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const basicServices = [
    {
      service: "Car Wash",
      description: "Essential exterior cleaning to keep your vehicle looking fresh and clean",
      time: "30-45 mins",
      locationPricing: [
        { size: "Small Car", price: "£9" },
        { size: "Medium Car", price: "£12" },
        { size: "Large Car", price: "£14" },
        { size: "Van", price: "£15" }
      ],
      homePricing: null // No home service for Car Wash
    },
    {
      service: "Mini Valet",
      description: "Comprehensive interior and exterior cleaning for a complete refresh",
      time: "60-90 mins",
      locationPricing: [
        { size: "Small Car", price: "£14" },
        { size: "Medium Car", price: "£16" },
        { size: "Large Car", price: "£18" },
        { size: "Van", price: "£20" }
      ],
      homePricing: [
        { size: "Small Car", price: "£35" },
        { size: "Medium Car", price: "£50" },
        { size: "Large Car", price: "£60" },
        { size: "Van", price: "£75" }
      ]
    },
    {
      service: "Full Valet",
      description: "Premium valet service combining thorough cleaning with attention to detail",
      time: "90-120 mins",
      locationPricing: [
        { size: "Small Car", price: "£45" },
        { size: "Medium Car", price: "£55" },
        { size: "Large Car", price: "£65" },
        { size: "Van", price: "£70" }
      ],
      homePricing: [
        { size: "Small Car", price: "£80" },
        { size: "Medium Car", price: "£100" },
        { size: "Large Car", price: "£125" },
        { size: "Van", price: "£140" }
      ]
    }
  ];

  const premiumServices = [
    {
      service: "Interior Detailing",
      locationPrice: "£120",
      homePrice: "£140",
      time: "2–3 hours",
      description: "Complete interior restoration and protection"
    },
    {
      service: "Exterior Detailing", 
      locationPrice: "£200",
      homePrice: "£200",
      time: "4–5 hours",
      description: "Professional paint correction and protection"
    },
    {
      service: "Full Detailing",
      locationPrice: "£300", 
      homePrice: "£300",
      time: "6–8 hours",
      description: "Complete interior and exterior transformation"
    },
    {
      service: "Stage 1 Polishing",
      locationPrice: "£400",
      homePrice: "£450",
      time: "3–4 hours", 
      description: "Single-stage machine polishing for light correction"
    },
    {
      service: "Stage 2 Polishing",
      locationPrice: "£550",
      homePrice: "£650",
      time: "8+ hours",
      description: "Advanced two-stage polishing for maximum results"
    }
  ];

  const vehicleTypes = [
    {
      type: "Small Car",
      icon: <Car className="w-6 h-6" />,
      examples: "Fiesta, Polo, Corsa, Mini",
      color: "bg-blue-500"
    },
    {
      type: "Medium Car", 
      icon: <Car className="w-7 h-7" />,
      examples: "Focus, Golf, Astra, Civic",
      color: "bg-green-500"
    },
    {
      type: "Large Car",
      icon: <Car className="w-8 h-8" />,
      examples: "BMW 5 Series, Audi A6, Mercedes E-Class",
      color: "bg-orange-500"
    },
    {
      type: "Van",
      icon: <Truck className="w-8 h-8" />,
      examples: "Transit, Sprinter, Vivaro, Crafter",
      color: "bg-red-500"
    }
  ];

  // Coming Soon Popup Component
  const ComingSoonPopup = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-primary/30 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* Close button */}
        <button 
          onClick={() => setShowComingSoon(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-primary animate-pulse" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            🚧 Coming Soon!
          </h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            We're excited to announce that our <span className="text-primary font-semibold">Location Base Service</span> will be available soon! 
            We're currently working hard to open our own professional detailing unit to serve you better.
          </p>
          
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-4 mb-6 border border-primary/20">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-primary mr-2" />
              <span className="text-primary font-semibold">Expected Launch</span>
            </div>
            <p className="text-gray-300 text-sm">
              Q2 2026 - Stay tuned for updates!
            </p>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            In the meantime, enjoy our convenient <span className="text-primary">Home Base Service</span> where we come to you!
          </p>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowComingSoon(false)}
              className="flex-1 bg-gradient-to-r from-primary to-yellow-500 text-black font-semibold hover:from-primary/90 hover:to-yellow-500/90 transition-all duration-300"
            >
              Got it!
            </Button>
            <Link to="/contact" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const ServiceCard = ({ service, index }) => (
    <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-white">{service.service}</CardTitle>
        <p className="text-gray-400">{service.description}</p>
        <div className="flex items-center justify-center text-gray-400 mt-2">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{service.time}</span>
        </div>
      </CardHeader>
      <CardContent>
        {service.homePricing ? (
          // Services with both Location Base and Home Base
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Location Base Service */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-sm font-semibold text-blue-400">Location Base Service</h4>
                </div>
                <div className="space-y-2">
                  {service.locationPricing.map((priceItem, priceIdx) => (
                    <div key={priceIdx} className="flex justify-between items-center bg-blue-500/5 hover:bg-blue-500/10 rounded px-2 py-1 transition-colors duration-200">
                      <span className="text-gray-300 text-xs">{priceItem.size}</span>
                      <span className="text-blue-400 font-semibold text-sm">{priceItem.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Home Base Service */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                <div className="flex items-center mb-3">
                  <Home className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-sm font-semibold text-primary">Home Base Service</h4>
                </div>
                <div className="space-y-2">
                  {service.homePricing.map((priceItem, priceIdx) => (
                    <div key={priceIdx} className="flex justify-between items-center bg-primary/5 hover:bg-primary/10 rounded px-2 py-1 transition-colors duration-200">
                      <span className="text-gray-300 text-xs">{priceItem.size}</span>
                      <span className="text-primary font-semibold text-sm">{priceItem.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                onClick={() => setShowComingSoon(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
              >
                📞 Call Us
              </Button>
              <Link to="/booking">
                <Button className="w-full bg-primary text-black hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
                  Book Now
                </Button>
              </Link>
            </div>
          </>
        ) : (
          // Car Wash - Location Base only
          <>
            <div className="mb-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                <div className="flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-sm font-semibold text-blue-400">Location Base Service</h4>
                </div>
                <div className="space-y-2">
                  {service.locationPricing.map((priceItem, priceIdx) => (
                    <div key={priceIdx} className="flex justify-between items-center bg-blue-500/5 hover:bg-blue-500/10 rounded px-2 py-1 transition-colors duration-200">
                      <span className="text-gray-300 text-xs">{priceItem.size}</span>
                      <span className="text-blue-400 font-semibold text-sm">{priceItem.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowComingSoon(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
            >
              📞 Call Us
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );

  const PremiumServiceCard = ({ service, index }) => (
    <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{service.service}</CardTitle>
          {service.service.includes('Stage 2') && (
            <Badge className="bg-primary text-black animate-pulse">Most Popular</Badge>
          )}
        </div>
        <p className="text-gray-400">{service.description}</p>
        <div className="flex items-center justify-center text-gray-400 mt-2">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{service.time}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Location Base Service */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 text-center group">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-sm font-semibold text-blue-400">Location Base</h4>
            </div>
            <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">{service.locationPrice}</div>
          </div>

          {/* Home Base Service */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center group">
            <div className="flex items-center justify-center mb-2">
              <Home className="w-4 h-4 mr-2 text-primary group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-sm font-semibold text-primary">Home Base</h4>
            </div>
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{service.homePrice}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            onClick={() => setShowComingSoon(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
          >
            📞 Call Us
          </Button>
          <Link to="/booking">
            <Button className="w-full bg-primary text-black hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20">
      {/* Coming Soon Popup */}
      {showComingSoon && <ComingSoonPopup />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Service <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transparent, competitive pricing for all our car care services. 
            Choose between our location-based services or convenient home delivery options.
          </p>
          
          {/* Service Type Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-blue-400">Location Base Service</h3>
              </div>
              <p className="text-gray-300 text-sm">
                You bring your vehicle to our designated location for professional cleaning services.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-primary">Home Base Service</h3>
              </div>
              <p className="text-gray-300 text-sm">
                We come to your location with all equipment and supplies for ultimate convenience.
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Types Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Vehicle Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className="bg-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className={`${vehicle.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {vehicle.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{vehicle.type}</h3>
                  <p className="text-gray-400 text-sm">{vehicle.examples}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Basic Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Basic Services</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Affordable car care services for regular maintenance and cleaning. Choose between location-based or home delivery options.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {basicServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Premium Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Premium Services</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Professional detailing services with location-based and home delivery pricing options.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {premiumServices.map((service, index) => (
              <PremiumServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Deposit Information */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="w-6 h-6 mr-2 text-primary" />
                Deposit Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Services Over £200</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="text-primary font-semibold">£70 deposit required</span> when booking
                  </p>
                  <p className="text-gray-400 text-sm">
                    Non-refundable if customer cancels the booking
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Services Over £500</h3>
                  <p className="text-gray-300 mb-2">
                    <span className="text-primary font-semibold">50% deposit required</span> when booking
                  </p>
                  <p className="text-gray-400 text-sm">
                    Non-refundable if customer cancels the booking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-gray-400">100% satisfaction guaranteed or we'll make it right</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Products</h3>
              <p className="text-gray-400">Professional-grade cleaning products and equipment</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Flexible Service</h3>
              <p className="text-gray-400">Choose location-based or convenient home delivery options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
