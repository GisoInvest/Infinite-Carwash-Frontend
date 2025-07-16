import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your virtual assistant for Infinite Mobile Carwash & Detailing. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    "What services do you offer?",
    "How much does a full valet cost?",
    "Do you come to my location?",
    "How do I book a service?",
    "What areas do you cover?"
  ];

  const botResponses = {
    "what services do you offer": "We offer a comprehensive range of services including Car Wash (£7-£14), Mini Valet (£14-£20), Full Valet (£45-£70), Interior Detailing (£120), Exterior Detailing (£200), Full Detailing (£300), and Stage 1 & 2 Polishing (£400-£550). All services use our scratch-free, non-contact cleaning process.",
    
    "how much does a full valet cost": "Our Full Valet service costs £45 for small cars, £55 for medium cars, £65 for large cars, and £70 for vans. This includes complete exterior wash, interior deep clean, leather/fabric conditioning, and wheel arch cleaning.",
    
    "do you come to my location": "Yes! We're a mobile service that comes directly to your location - whether that's your home, office, or anywhere convenient for you in Derby and surrounding areas. You can also visit our unit if you prefer.",
    
    "how do i book a service": "You can book through our website booking system, call us at 07403139086, or send us an email at infinitemobilecarwashdetailing@gmail.com. Our booking system prevents double bookings and you can track your service in real-time.",
    
    "what areas do you cover": "We proudly serve Derby and its surrounding areas. If you're unsure whether we cover your specific location, please give us a call at 07403139086 and we'll confirm availability.",
    
    "default": "I'd be happy to help! For specific questions about our services, pricing, or booking, please call us at 07403139086 or email infinitemobilecarwashdetailing@gmail.com. You can also browse our Services and Pricing pages for detailed information."
  };

  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate bot response
    setTimeout(() => {
      const lowerMessage = messageText.toLowerCase();
      let response = botResponses.default;

      // Find matching response
      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-black hover:bg-primary/90 rounded-full w-14 h-14 shadow-lg z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 z-50">
          <Card className="bg-card border-primary/20 h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-white text-sm">AI Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-black'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  <div className="space-y-1">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(reply)}
                        className="w-full text-xs border-primary/20 text-gray-300 hover:bg-primary/10 h-8"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-primary/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="bg-input border-primary/20 text-white placeholder-gray-400 text-sm"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    size="sm"
                    className="bg-primary text-black hover:bg-primary/90 px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;

