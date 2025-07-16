import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, MapPin } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Quality Assurance",
      description: "We guarantee scratch-free, professional results with every service."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "Committed to delivering the highest standards in car care services."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We go above and beyond for every client."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Local Expertise",
      description: "Proudly serving Derby and surrounding areas with personalized service."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-primary">Infinite</span> Mobile Carwash & Detailing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionising the car care industry in Derby with innovation, quality, and exceptional service.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                INFINITE MOBILE CARWASH & DETAILING was born from a simple vision: to revolutionise 
                the car care industry in Derby and its surrounding areas. We recognised that car owners 
                deserved better than traditional car wash methods that could potentially damage their 
                vehicle's paintwork.
              </p>
              <p>
                Our commitment to excellence led us to develop a comprehensive range of services that 
                prioritise your vehicle's protection while delivering outstanding results. From our 
                innovative non-contact car wash system to our premium detailing services, every aspect 
                of our business is designed with your vehicle's care in mind.
              </p>
              <p>
                We pride ourselves on being more than just a car wash service. We're your trusted 
                partner in maintaining your vehicle's appearance, value, and longevity. Our mobile 
                service brings professional car care directly to your doorstep, saving you time while 
                ensuring your vehicle receives the attention it deserves.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <p className="text-gray-300 text-lg leading-relaxed">
                "To provide exceptional mobile car care services that exceed customer expectations 
                while preserving and enhancing the beauty and value of every vehicle we service. 
                We are committed to innovation, quality, and environmental responsibility in 
                everything we do."
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">What Sets Us Apart</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Non-contact car wash technology that prevents scratches and swirl marks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Professional-grade equipment and premium products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Fully mobile service - we come to you</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Comprehensive range of services from basic wash to premium detailing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Experienced and trained professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and ensure exceptional service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Service Areas</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We proudly serve Derby and its surrounding local areas, bringing professional car care 
            services directly to your location.
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-primary text-xl font-semibold">
              <MapPin className="w-6 h-6" />
              <span>Derby & Surrounding Areas</span>
            </div>
            <p className="text-gray-300 mt-4">
              Contact us to confirm service availability in your specific location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

