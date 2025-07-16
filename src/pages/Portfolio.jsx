import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Car } from 'lucide-react';

// Import all the new images
import AudiRS6 from '../assets/AudiRS6.jpg';
import BMW_Aft01 from '../assets/BMW_Aft01.jpg';
import BMW_Aft02 from '../assets/BMW_Aft02.jpg';
import BMW_Bfr01 from '../assets/BMW_Bfr01.jpg';
import BMW_Bfr02 from '../assets/BMW_Bfr02.jpg';
import Ferrari_Aft01 from '../assets/Ferrari_Aft01.jpg';
import Ford_Aft01 from '../assets/Ford_Aft01.jpg';
import Ford_Aft02 from '../assets/Ford_Aft02.jpg';
import Ford_Bfr01 from '../assets/Ford_Bfr01.jpg';
import Ford_Bfr02 from '../assets/Ford_Bfr02.jpg';
import MAG_Aft01 from '../assets/MAG_Aft01.jpg';
import MAG_Aft02 from '../assets/MAG_Aft02.jpg';
import MAG_Bef02 from '../assets/MAG_Bef02.jpg';
import MAG_Bfe01 from '../assets/MAG_Bfe01.jpg';
import PorscheExterior from '../assets/PorscheExterior.jpg';
import PorscheInterior from '../assets/PorscheInterior.jpg';
import RangeRover_exterior from '../assets/RangeRover_exterior.jpg';

const Portfolio = () => {
  // Real portfolio items with actual images
  const portfolioItems = [
    {
      id: 1,
      title: "BMW - Full Detailing",
      service: "Full Detailing",
      before: BMW_Bfr01,
      after: BMW_Aft01,
      beforeDesc: "Heavily soiled exterior and interior",
      afterDesc: "Showroom condition restoration",
      duration: "8 hours",
      category: "Premium"
    },
    {
      id: 2,
      title: "BMW - Stage 2 Polishing",
      service: "Stage 2 Polishing", 
      before: BMW_Bfr02,
      after: BMW_Aft02,
      beforeDesc: "Swirl marks and light scratches",
      afterDesc: "Mirror-like finish achieved",
      duration: "6 hours",
      category: "Premium"
    },
    {
      id: 3,
      title: "Ford - Full Valet",
      service: "Full Valet",
      before: Ford_Bfr01,
      after: Ford_Aft01,
      beforeDesc: "Work van with heavy dirt buildup",
      afterDesc: "Professional clean appearance",
      duration: "3 hours", 
      category: "Commercial"
    },
    {
      id: 4,
      title: "Porsche - Exterior Detailing",
      service: "Exterior Detailing",
      before: "/porsche-before.jpg",
      after: "/porsche-after.jpg",
      beforeDesc: "Water spots and surface contamination",
      afterDesc: "Flawless paint finish and protection",
      duration: "6 hours",
      category: "Premium"
    },
    {
      id: 5,
      title: "MAG - Stage 1 Polishing",
      service: "Stage 1 Polishing", 
      before: MAG_Bfe01,
      after: MAG_Aft01,
      beforeDesc: "Light swirl marks and minor imperfections",
      afterDesc: "Enhanced gloss and clarity achieved",
      duration: "4 hours",
      category: "Premium"
    },
    {
      id: 6,
      title: "Interior Detailing Process",
      service: "Interior Detailing",
      video: "/interior-detailing-video.mp4",
      beforeDesc: "Complete interior transformation process",
      afterDesc: "Professional interior detailing techniques",
      duration: "2-4 hours",
      category: "Premium"
    }
  ];

  // Additional showcase images
  const showcaseImages = [
    { id: 7, image: AudiRS6, title: "Audi RS6 - Premium Detailing", category: "Premium" },
    { id: 8, image: Ferrari_Aft01, title: "Ferrari - Luxury Detailing", category: "Premium" },
    { id: 9, image: PorscheExterior, title: "Porsche - Exterior Perfection", category: "Premium" },
    { id: 10, image: PorscheInterior, title: "Porsche - Interior Excellence", category: "Premium" },
    { id: 11, image: RangeRover_exterior, title: "Range Rover - Complete Transformation", category: "Premium" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Full Detailing",
      rating: 5,
      comment: "Absolutely incredible transformation! My car looks better than when I first bought it. The team's attention to detail is outstanding.",
      vehicle: "BMW X3"
    },
    {
      name: "Mark Thompson", 
      service: "Stage 2 Polishing",
      rating: 5,
      comment: "Professional service from start to finish. The paint correction work was phenomenal - removed years of swirl marks perfectly.",
      vehicle: "Audi A6"
    },
    {
      name: "Lisa Chen",
      service: "Mobile Car Wash",
      rating: 5,
      comment: "So convenient having them come to my office. Regular weekly service keeps my car looking pristine. Highly recommended!",
      vehicle: "Mercedes C-Class"
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Premium': return 'bg-primary text-black';
      case 'Commercial': return 'bg-blue-500 text-white';
      case 'Standard': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the incredible transformations we've achieved for our satisfied customers. 
            From basic washes to complete restorations, every project showcases our commitment to excellence.
          </p>
        </div>

        {/* Before & After Portfolio Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Before & After Transformations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="bg-card border-primary/20 hover:border-primary/40 transition-colors overflow-hidden">
                {item.video ? (
                  // Video item layout
                  <div className="relative">
                    <video 
                      src={item.video}
                      controls
                      className="w-full h-64 object-cover"
                      poster="/porsche-after.jpg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // Before/After image layout
                  <div className="grid grid-cols-2 gap-1">
                    <div className="relative">
                      <img 
                        src={item.before} 
                        alt={`${item.title} - Before`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={item.after} 
                        alt={`${item.title} - After`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        AFTER
                      </div>
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-primary font-medium mb-3">{item.service}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Before: </span>
                      <span className="text-gray-300">{item.beforeDesc}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">After: </span>
                      <span className="text-gray-300">{item.afterDesc}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Showcase Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Premium Vehicle Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseImages.map((item) => (
              <Card key={item.id} className="bg-card border-primary/20 hover:border-primary/40 transition-colors overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="border-t border-primary/20 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.vehicle} - {testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Statistics */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Track Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-300">Vehicles Serviced</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-gray-300">Customer Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2+</div>
                <p className="text-gray-300">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-gray-300">Booking Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <Card className="bg-card border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready for Your Transformation?</h3>
              <p className="text-gray-300 mb-6">
                Join our satisfied customers and experience the difference professional detailing makes. 
                Book your service today and see your vehicle transformed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-black hover:bg-primary/90">
                  Book Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-black"
                >
                  Get Free Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

