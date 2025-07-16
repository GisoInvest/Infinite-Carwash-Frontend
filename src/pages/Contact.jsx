import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Send
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      details: "07403139086",
      action: "tel:07403139086",
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email", 
      details: "infinitemobilecarwashdetailing@gmail.com",
      action: "mailto:infinitemobilecarwashdetailing@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Service Area",
      details: "Derby & Surrounding Areas",
      action: null,
      description: "We come to your location"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Operating Hours",
      details: "7 Days a Week",
      action: null,
      description: "Flexible scheduling available"
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      url: "https://instagram.com",
      color: "hover:text-pink-500"
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      name: "Facebook", 
      url: "https://facebook.com",
      color: "hover:text-blue-500"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your vehicle? Get in touch with us today for a free quote 
            or to book your premium car care service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      {info.icon}
                      <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                    </div>
                    {info.action ? (
                      <a 
                        href={info.action}
                        className="text-primary hover:text-primary/80 font-medium block mb-2 break-all text-sm"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-primary font-medium mb-2 break-words">{info.details}</p>
                    )}
                    <p className="text-gray-400 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              <Button 
                className="w-full bg-primary text-black hover:bg-primary/90 text-lg py-6"
                onClick={() => window.open('tel:07403139086')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 07403139086
              </Button>
              <Button 
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-black text-lg py-6"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-card border border-primary/20 rounded-lg p-3 text-gray-400 ${social.color} transition-colors hover:border-primary/40`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send Us a Message</CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-primary/20 text-white placeholder-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-primary/20 text-white placeholder-gray-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-input border-primary/20 text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-input border border-primary/20 rounded-md px-3 py-2 text-white"
                    >
                      <option value="">Select a service</option>
                      <option value="car-wash">Car Wash</option>
                      <option value="mini-valet">Mini Valet</option>
                      <option value="full-valet">Full Valet</option>
                      <option value="interior-detailing">Interior Detailing</option>
                      <option value="exterior-detailing">Exterior Detailing</option>
                      <option value="full-detailing">Full Detailing</option>
                      <option value="stage1-polishing">Stage 1 Polishing</option>
                      <option value="stage2-polishing">Stage 2 Polishing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-input border-primary/20 text-white placeholder-gray-400"
                      placeholder="Tell us about your vehicle and requirements..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary text-black hover:bg-primary/90 text-lg py-3"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Service Coverage</h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                We proudly serve Derby and its surrounding areas with our mobile car care services. 
                Not sure if we cover your area? Give us a call to confirm!
              </p>
              <div className="flex items-center justify-center space-x-2 text-primary text-xl font-semibold">
                <MapPin className="w-6 h-6" />
                <span>Derby & Surrounding Areas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

