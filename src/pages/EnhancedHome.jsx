import React, { useState, useEffect } from 'react';
import InteractiveButton from '../components/InteractiveButton';
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
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import soundManager from '../utils/soundManager';

const EnhancedHome = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Carousel images
  const carouselImages = [
    {
      src: "/After(1).jpg",
      alt: "Professional car detailing result - After transformation",
      title: "Premium Detailing Results"
    },
    {
      src: "/PorscheExterior(1).jpg", 
      alt: "Porsche exterior detailing showcase",
      title: "Porsche Exterior Perfection"
    },
    {
      src: "/AudiRS6Back.jpg",
      alt: "Audi RS6 rear view after detailing",
      title: "Audi RS6 Premium Finish"
    },
    {
      src: "/AudiRS6Front.jpg",
      alt: "Audi RS6 front view after detailing", 
      title: "Audi RS6 Front Detail"
    },
    {
      src: "/Ferrari_Aft01(2).jpg",
      alt: "Ferrari after professional detailing",
      title: "Ferrari Showroom Condition"
    },
    {
      src: "/Ferrari_Aft02.jpg",
      alt: "Ferrari detailing completion",
      title: "Ferrari Premium Care"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const nextImage = async () => {
    await soundManager.playClick();
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = async () => {
    await soundManager.playClick();
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Exterior Wash & Wax",
      description: "Complete exterior cleaning with premium wax protection",
      delay: "0ms"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Interior Detailing",
      description: "Deep cleaning and conditioning of all interior surfaces",
      delay: "200ms"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Paint Protection",
      description: "Advanced ceramic coating and paint protection services",
      delay: "400ms"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Book at your convenience"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Mobile Service",
      description: "We come to your location"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fully Insured",
      description: "Complete peace of mind"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Professional-grade products"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImage 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Infinite Mobile</span>
            <br />
            <span className="text-primary">Carwash & Detailing</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-in-up">
            Professional car care services delivered to your doorstep
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
            <InteractiveButton
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-3"
              soundType="success"
            >
              <Link to="/booking" className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Book Your Service Now
              </Link>
            </InteractiveButton>
            
            <InteractiveButton
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-black text-lg px-8 py-3"
              soundType="notification"
              onClick={() => window.open('tel:07403139086')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: 07403139086
            </InteractiveButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services"
        data-animate
        className={`py-20 bg-gray-900 transition-all duration-1000 ${
          isVisible.services ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Premium Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the difference with our professional mobile car care services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="bg-gray-800 border-gray-700 hover-lift interactive-card group"
                style={{ animationDelay: service.delay }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-primary mb-4 flex justify-center group-hover:animate-float">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-animate
        className={`py-20 bg-background transition-all duration-1000 ${
          isVisible.features ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">Infinite Mobile?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group hover-scale"
              >
                <div className="text-primary mb-4 flex justify-center group-hover:animate-pulse-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        data-animate
        className={`py-20 bg-primary text-black transition-all duration-1000 ${
          isVisible.cta ? 'animate-fade-in-scale' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust Infinite Mobile for their car care needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveButton
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-3"
              soundType="success"
            >
              <Link to="/booking" className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Book Now - Get Started
              </Link>
            </InteractiveButton>
            
            <InteractiveButton
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-primary text-lg px-8 py-3"
            >
              <Link to="/portfolio" className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                View Our Work
              </Link>
            </InteractiveButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;
