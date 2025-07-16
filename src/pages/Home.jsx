import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Car, 
  Sparkles, 
  Shield, 
  Clock, 
  MapPin, 
  Star,
  Phone,
  FileText,
  CheckCircle
} from 'lucide-react';
import FerrariVideo from '../assets/Ferrari.mp4';

const Home = () => {
  const features = [
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Mobile Service",
      description: "We come to you! Enjoy professional car care at your home or office."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Scratch-Free Process",
      description: "Our non-contact car wash ensures your vehicle's paintwork stays pristine."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Premium Quality",
      description: "Professional-grade equipment and products for exceptional results."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Time Efficient",
      description: "Quick turnaround times without compromising on quality."
    }
  ];

  const services = [
    "Car Wash",
    "Mini Valet", 
    "Full Valet",
    "Interior Detailing",
    "Exterior Detailing",
    "Full Detailing",
    "Stage 1 & 2 Polishing"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="text-primary">INFINITE</span> MOBILE
              <br />
              CARWASH & <span className="text-primary">DETAILING</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of car care with INFINITE MOBILE CARWASH & DETAILING
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Revolutionising the car care industry in Derby with our comprehensive range of premium services. 
              Non-contact, scratch-free cleaning that preserves your vehicle's paintwork.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/booking">
                <Button 
                  size="lg" 
                  className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-4"
                onClick={() => window.open('tel:07403139086')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 07403139086
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Our Work in <span className="text-primary">Action</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch our professional detailing process transform this stunning Ferrari to showroom condition.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <video 
                className="w-full h-auto"
                controls
                poster=""
                preload="metadata"
              >
                <source src={FerrariVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-300 text-sm">
                Professional Ferrari detailing showcasing our premium service quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-primary">Infinite</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're not just another car wash service. We're revolutionising car care with innovation and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Comprehensive <span className="text-primary">Car Care</span> Services
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                From basic car washes to premium detailing services, we offer everything your vehicle needs 
                to look its absolute best. Our professional team uses only the finest products and techniques.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-white">{service}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services">
                  <Button className="bg-primary text-black hover:bg-primary/90">
                    View All Services
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="text-center">
                  <Star className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Experience</h3>
                  <p className="text-gray-300 mb-6">
                    Book your service today and experience the difference that professional car care makes.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span>Serving Derby & Surrounding Areas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of satisfied customers who trust Infinite Mobile Carwash & Detailing 
            for their car care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button 
                size="lg" 
                className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-4"
              >
                Book Service Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-4"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

