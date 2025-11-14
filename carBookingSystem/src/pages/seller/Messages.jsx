import { useState } from 'react';
import { Search, Send, Phone, Mail, User, Clock, CheckCheck, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Messages = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      carId: 1,
      carTitle: 'Toyota Corolla GLi 2020',
      carImage: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400',
      buyerName: 'Ahmed Khan',
      buyerEmail: 'ahmed.khan@email.com',
      buyerPhone: '+92 300 1234567',
      status: 'pending',
      messages: [
        {
          id: 1,
          sender: 'buyer',
          text: 'Hi, I am interested in this car. Is it still available?',
          timestamp: '2024-01-20T10:30:00',
          read: true
        },
        {
          id: 2,
          sender: 'buyer',
          text: 'Can we schedule a test drive this weekend?',
          timestamp: '2024-01-20T10:32:00',
          read: true
        }
      ],
      lastMessageTime: '2024-01-20T10:32:00',
      unreadCount: 2
    },
    {
      id: 2,
      carId: 2,
      carTitle: 'Honda Civic Oriel 2021',
      carImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
      buyerName: 'Sara Ali',
      buyerEmail: 'sara.ali@email.com',
      buyerPhone: '+92 321 9876543',
      status: 'pending',
      messages: [
        {
          id: 1,
          sender: 'buyer',
          text: 'What is your final price? Is there any room for negotiation?',
          timestamp: '2024-01-20T14:15:00',
          read: true
        }
      ],
      lastMessageTime: '2024-01-20T14:15:00',
      unreadCount: 1
    },
    {
      id: 3,
      carId: 1,
      carTitle: 'Toyota Corolla GLi 2020',
      carImage: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400',
      buyerName: 'Bilal Ahmed',
      buyerEmail: 'bilal.ahmed@email.com',
      buyerPhone: '+92 333 5551234',
      status: 'responded',
      messages: [
        {
          id: 1,
          sender: 'buyer',
          text: 'Can you provide the service history and accident report?',
          timestamp: '2024-01-19T09:20:00',
          read: true
        },
        {
          id: 2,
          sender: 'seller',
          text: 'Yes, the car has complete service history from authorized dealer. No accidents. I can share the documents.',
          timestamp: '2024-01-19T10:45:00',
          read: true
        },
        {
          id: 3,
          sender: 'buyer',
          text: 'Great! When can I come for inspection?',
          timestamp: '2024-01-19T11:00:00',
          read: true
        },
        {
          id: 4,
          sender: 'seller',
          text: 'You can visit this weekend. Saturday or Sunday, anytime between 10 AM to 6 PM.',
          timestamp: '2024-01-19T11:15:00',
          read: true
        }
      ],
      lastMessageTime: '2024-01-19T11:15:00',
      unreadCount: 0
    },
    {
      id: 4,
      carId: 5,
      carTitle: 'Suzuki Cultus VXL 2020',
      carImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      buyerName: 'Fatima Noor',
      buyerEmail: 'fatima.noor@email.com',
      buyerPhone: '+92 345 7778888',
      status: 'pending',
      messages: [
        {
          id: 1,
          sender: 'buyer',
          text: 'Is the car available for immediate purchase? I need it urgently.',
          timestamp: '2024-01-21T16:30:00',
          read: true
        }
      ],
      lastMessageTime: '2024-01-21T16:30:00',
      unreadCount: 1
    }
  ]);

  const filteredInquiries = inquiries
    .filter(inquiry => {
      const matchesSearch = 
        inquiry.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.carTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedInquiry) return;

    const newMessage = {
      id: selectedInquiry.messages.length + 1,
      sender: 'seller',
      text: replyMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === selectedInquiry.id
        ? {
            ...inquiry,
            messages: [...inquiry.messages, newMessage],
            status: 'responded',
            lastMessageTime: newMessage.timestamp,
            unreadCount: 0
          }
        : inquiry
    ));

    setSelectedInquiry(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      status: 'responded'
    }));

    setReplyMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages & Inquiries</h1>
          <p className="text-gray-600 mt-2">Manage buyer inquiries and communications</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Inquiries List */}
            <div className="md:col-span-1 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Inquiries</option>
                  <option value="pending">Pending</option>
                  <option value="responded">Responded</option>
                </select>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedInquiry?.id === inquiry.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={inquiry.carImage}
                        alt={inquiry.carTitle}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {inquiry.buyerName}
                          </h4>
                          {inquiry.unreadCount > 0 && (
                            <span className="bg-purple-600 text-white text-xs font-bold rounded-lg w-5 h-5 flex items-center justify-center">
                              {inquiry.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{inquiry.carTitle}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {inquiry.messages[inquiry.messages.length - 1].text}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(inquiry.lastMessageTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {selectedInquiry ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedInquiry.buyerName}</h3>
                          <p className="text-sm text-gray-500">{selectedInquiry.carTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${selectedInquiry.buyerPhone}`}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Call"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                        <a
                          href={`mailto:${selectedInquiry.buyerEmail}`}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Email"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedInquiry.buyerPhone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedInquiry.buyerEmail}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {selectedInquiry.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'seller'
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className={`text-xs ${message.sender === 'seller' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.sender === 'seller' && (
                              <CheckCheck className="w-3 h-3 text-blue-100" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                        placeholder="Type your reply..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select an inquiry to view messages</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
