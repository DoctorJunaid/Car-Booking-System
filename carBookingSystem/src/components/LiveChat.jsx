import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, Clock, User } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to AutoChoice. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: "Browse Cars", icon: "🚗" },
    { text: "Pricing Info", icon: "💰" },
    { text: "Financing Options", icon: "💳" },
    { text: "Contact Support", icon: "📞" }
  ];

  const botResponses = {
    'browse cars': "Great! You can browse our collection:\n• Used Cars - Quality pre-owned vehicles\n• New Cars - Latest models\n• Certified Cars - Inspected & warranted\n\nWhich category interests you?",
    'pricing info': "Our cars range from Rs 500,000 to Rs 15,000,000. Prices vary based on:\n• Make & Model\n• Year\n• Condition\n• Mileage\n\nWould you like to see cars in a specific price range?",
    'financing options': "We offer flexible financing:\n• Bank loans (up to 5 years)\n• Leasing options\n• Trade-in programs\n• Down payment as low as 20%\n\nWould you like to speak with our finance team?",
    'contact support': "You can reach us:\n📞 Phone: +92 91 123 4567\n📧 Email: info@autochoice.pk\n🕐 Hours: Mon-Sat 9AM-8PM\n\nOr I can connect you with a live agent now!",
    'default': "I understand you're asking about that. Our team can provide detailed information. Would you like me to:\n1. Connect you with a live agent\n2. Schedule a call back\n3. Send you more information via email"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold">AutoChoice Support</h3>
                  <p className="text-xs text-purple-100">Online • Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 min-h-0">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="shrink-0 px-4 py-2 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Quick options:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.text)}
                      className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 px-3 py-1.5 rounded-lg transition-colors border border-purple-200"
                    >
                      {reply.icon} {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="shrink-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-purple-600 text-white rounded-lg p-2 hover:from-purple-700 hover:to-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <a href="tel:+92911234567" className="flex items-center gap-1 hover:text-purple-600">
                  <Phone className="w-3 h-3" />
                  Call Us
                </a>
                <a href="mailto:info@autochoice.pk" className="flex items-center gap-1 hover:text-purple-600">
                  <Mail className="w-3 h-3" />
                  Email
                </a>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  9AM-8PM
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
