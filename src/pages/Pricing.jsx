import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Truck, 
  Clock,
  CheckCircle,
  Star,
  Info
} from 'lucide-react';

const Pricing = () => {
  const premiumServices = [
    {
      service: "Interior Detailing",
      price: "£120",
      time: "2–3 hours",
      description: "Complete interior restoration and protection"
    },
    {
      service: "Exterior Detailing", 
      price: "£200",
      time: "4–5 hours",
      description: "Professional paint correction and protection"
    },
    {
      service: "Full Detailing",
      price: "£300", 
      time: "6–8 hours",
      description: "Complete interior and exterior transformation"
    },
    {
      service: "Stage 1 Polishing",
      price: "£400",
      time: "3–4 hours", 
      description: "Single-stage machine polishing for light correction"
    },
    {
      service: "Stage 2 Polishing",
      price: "£550",
      time: "6+ hours",
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

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Service <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent, competitive pricing for all our car care services. 
            Choose the perfect service for your vehicle and budget.
          </p>
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

        {/* Premium Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumServices.map((service, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{service.service}</CardTitle>
                    {service.service.includes('Stage 2') && (
                      <Badge className="bg-primary text-black">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-gray-400">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-primary">{service.price}</div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{service.time}</span>
                    </div>
                  </div>
                  <Link to="/booking">
                    <Button className="w-full bg-primary text-black hover:bg-primary/90">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
              <h3 className="text-lg font-semibold text-white mb-2">Mobile Service</h3>
              <p className="text-gray-400">We come to you - no additional travel charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

