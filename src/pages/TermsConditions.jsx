import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Shield, Clock, CreditCard } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-primary/20 bg-primary/10">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-gray-300">
            By booking our services, you agree to be bound by these terms and conditions. 
            Please ensure you understand all terms before proceeding with your booking.
          </AlertDescription>
        </Alert>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* Service Terms */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-6 h-6 mr-2 text-primary" />
                Service Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Service Provision</h3>
                <ul className="space-y-2 ml-4">
                  <li>• All services are provided by Infinite Mobile Carwash & Detailing</li>
                  <li>• Services are available in Derby and surrounding areas</li>
                  <li>• We reserve the right to refuse service in extreme weather conditions</li>
                  <li>• Service times are estimates and may vary based on vehicle condition</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Service Quality</h3>
                <ul className="space-y-2 ml-4">
                  <li>• We guarantee professional service using quality products and equipment</li>
                  <li>• Our non-contact car wash system minimizes risk of scratches</li>
                  <li>• Any concerns must be reported within 24 hours of service completion</li>
                  <li>• We will rectify any legitimate service issues at no additional cost</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Customer Responsibilities</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Ensure vehicle is accessible and safe to work on</li>
                  <li>• Remove all personal items from vehicle before service</li>
                  <li>• Inform us of any vehicle damage or special requirements</li>
                  <li>• Provide accurate contact information for service coordination</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Booking & Payment Terms */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-primary" />
                Booking & Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4. Booking Process</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Bookings can be made online, by phone, or through our mobile app</li>
                  <li>• All bookings are subject to availability</li>
                  <li>• We will confirm your booking via email or SMS</li>
                  <li>• Double bookings are prevented through our booking system</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">5. Deposit Requirements</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Services over £200 require a £70 non-refundable deposit</li>
                  <li>• Services over £500 require a 50% non-refundable deposit</li>
                  <li>• Deposits are taken at time of booking</li>
                  <li>• Deposits are non-refundable if customer cancels the booking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6. Payment Terms</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Payment is due upon completion of service</li>
                  <li>• We accept cash, card, and bank transfer payments</li>
                  <li>• Prices are as quoted and include all standard equipment</li>
                  <li>• Additional charges may apply for excessive dirt or special requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation & Rescheduling */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-6 h-6 mr-2 text-primary" />
                Cancellation & Rescheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">7. Cancellation Policy</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Cancellations must be made at least 24 hours before scheduled service</li>
                  <li>• Cancellations within 24 hours may result in deposit forfeiture</li>
                  <li>• No-shows will result in full deposit forfeiture</li>
                  <li>• Weather-related cancellations by us will result in full refund</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">8. Rescheduling</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Services can be rescheduled up to 12 hours before appointment</li>
                  <li>• Rescheduling within 12 hours is subject to availability</li>
                  <li>• Multiple rescheduling requests may incur additional charges</li>
                  <li>• We will accommodate emergency rescheduling when possible</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Liability & Insurance */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white">Liability & Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">9. Liability Coverage</h3>
                <ul className="space-y-2 ml-4">
                  <li>• We carry comprehensive public liability insurance</li>
                  <li>• Coverage includes accidental damage during service provision</li>
                  <li>• Pre-existing damage must be reported before service begins</li>
                  <li>• Our liability is limited to the cost of professional repair</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">10. Exclusions</h3>
                <ul className="space-y-2 ml-4">
                  <li>• We are not liable for damage to already compromised paintwork</li>
                  <li>• Items left in vehicle are customer's responsibility</li>
                  <li>• We are not responsible for mechanical issues unrelated to our service</li>
                  <li>• Force majeure events are excluded from liability</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data Protection */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white">Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">11. Data Collection</h3>
                <ul className="space-y-2 ml-4">
                  <li>• We collect only necessary information for service provision</li>
                  <li>• Personal data is stored securely and used only for business purposes</li>
                  <li>• We do not share customer data with third parties without consent</li>
                  <li>• Customers can request data deletion at any time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">12. Communication</h3>
                <ul className="space-y-2 ml-4">
                  <li>• We may contact you regarding your booking and service</li>
                  <li>• Marketing communications require explicit consent</li>
                  <li>• You can opt out of marketing communications at any time</li>
                  <li>• Service-related communications are necessary and cannot be opted out</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* General Terms */}
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white">General Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">13. Modifications</h3>
                <p>We reserve the right to modify these terms at any time. Changes will be communicated to customers and posted on our website.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">14. Governing Law</h3>
                <p>These terms are governed by the laws of England and Wales. Any disputes will be resolved through the courts of England and Wales.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">15. Contact Information</h3>
                <p>For questions about these terms, please contact us:</p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Phone: 07403139086</li>
                  <li>• Email: infinitemobilecarwashdetailing@gmail.com</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12 text-gray-400">
          <p>Last updated: December 2024</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

