import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Sparkles, 
  Shield, 
  Clock,
  Droplets,
  Brush,
  Star,
  Zap
} from 'lucide-react';

const Services = () => {
  const premiumServices = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Interior Detailing",
      description: "Comprehensive interior restoration that brings your cabin back to showroom condition.",
      features: [
        "Deep steam cleaning",
        "Leather conditioning & protection",
        "Fabric protection treatment",
        "Dashboard & trim restoration",
        "Odor elimination",
        "UV protection application"
      ],
      price: "£120",
      time: "2-3 hours"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Exterior Detailing",
      description: "Professional paint correction and protection service that restores your vehicle's exterior to perfection.",
      features: [
        "Paint decontamination",
        "Clay bar treatment",
        "Machine polishing",
        "Paint protection application",
        "Trim restoration",
        "Glass treatment"
      ],
      price: "£200",
      time: "4-5 hours"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Full Detailing",
      description: "The ultimate car care experience combining both interior and exterior detailing for complete transformation.",
      features: [
        "Complete interior detailing",
        "Full exterior detailing",
        "Paint correction",
        "Protection application",
        "Engine bay cleaning",
        "Final inspection & touch-ups"
      ],
      price: "£300",
      time: "6-8 hours"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Stage 1 Polishing",
      description: "Professional single-stage machine polishing to remove light scratches and restore paint clarity.",
      features: [
        "Single-stage machine polish",
        "Light scratch removal",
        "Swirl mark correction",
        "Paint enhancement",
        "Protective wax application",
        "Professional finish"
      ],
      price: "£400",
      time: "3-4 hours"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Stage 2 Polishing",
      description: "Advanced two-stage polishing process for severe paint correction and maximum gloss enhancement.",
      features: [
        "Two-stage machine polish",
        "Heavy scratch removal",
        "Deep paint correction",
        "Maximum gloss enhancement",
        "Premium protection application",
        "Show-quality finish"
      ],
      price: "£550",
      time: "6+ hours"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional detailing and car care services designed to keep your vehicle looking its absolute best. 
            Premium services for the ultimate car care experience.
          </p>
        </div>

        {/* Premium Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional detailing and polishing services for the ultimate car care experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumServices.map((service, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    {service.icon}
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-400">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-primary font-semibold text-xl">{service.price}</p>
                      <p className="text-gray-400 text-sm">{service.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Options */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Service Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile Service</h3>
                <p className="text-gray-300">
                  We come to your location - home, office, or anywhere convenient for you. 
                  Enjoy professional car care without leaving your property.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Unit Service</h3>
                <p className="text-gray-300">
                  Visit our professional unit for service. Perfect for customers who prefer 
                  to drop off their vehicle at our facility.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/booking">
                <Button className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-3">
                  Book Your Service Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

