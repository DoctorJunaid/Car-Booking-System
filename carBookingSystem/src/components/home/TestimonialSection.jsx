import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, title, avatar, rating = 5 }) => (
  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 h-full flex flex-col">
    {/* Gradient Top Bar */}
    <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"></div>
    
    <div className="p-8 flex flex-col flex-1">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative flex-shrink-0">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-4 border-blue-50 shadow-lg ring-2 ring-blue-100"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-lg w-5 h-5 border-3 border-white flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">{name}</h4>
          <p className="text-purple-600 font-medium text-sm mb-2 truncate">{title}</p>
          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="h-10 w-10 text-blue-100" />
      </div>

      {/* Quote Text */}
      <blockquote className="text-gray-700 text-base leading-relaxed flex-1 relative">
        <p className="relative z-10">{quote}</p>
      </blockquote>

      {/* Bottom Accent */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Verified Purchase
          </span>
          <span className="text-purple-600 font-medium">★ {rating}.0</span>
        </div>
      </div>
    </div>

    {/* Hover Effect Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: 'I was looking for a reliable used Honda Civic and found the perfect one through AutoChoice. The inspection report was detailed, price was fair, and the team helped me with financing. Got my car within a week!',
      name: 'Ahmed Hassan',
      title: 'Bought Honda Civic 2020',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      quote: 'Sold my Toyota Corolla 2018 through AutoChoice. They gave me a better price than other dealers in Karachi. The documentation process was smooth and payment was instant. Highly professional service!',
      name: 'Fatima Malik',
      title: 'Sold Toyota Corolla',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      quote: 'As a first-time car buyer, I was nervous about the process. The AutoChoice team explained everything clearly, helped me compare different models, and even arranged a test drive at my convenience. Very satisfied!',
      name: 'Bilal Khan',
      title: 'Bought Suzuki Alto 2023',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      quote: 'The car comparison feature helped me choose between three SUVs. I ended up buying a certified Honda BR-V with warranty. The entire experience was transparent and hassle-free. Recommended to all my friends!',
      name: 'Ayesha Siddiqui',
      title: 'Bought Honda BR-V 2022',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      quote: 'Listed my Suzuki Cultus for sale and got multiple genuine inquiries within 2 days. The platform made it easy to communicate with buyers and finalize the deal. Much better than traditional methods!',
      name: 'Imran Ali',
      title: 'Sold Suzuki Cultus',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      quote: 'Bought a certified pre-owned Kia Sportage with full inspection report and 6-month warranty. The car is in excellent condition and the price was competitive. AutoChoice made car buying stress-free!',
      name: 'Zainab Raza',
      title: 'Bought Kia Sportage 2021',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-purple-700 px-5 py-2.5 rounded-lg text-sm font-semibold mb-6 shadow-sm">
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real customers who found their perfect car with AutoChoice.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in-up h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">4.8/5</div>
              <div className="text-gray-600 text-sm font-medium">Average Rating</div>
              <div className="flex justify-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">850+</div>
              <div className="text-gray-600 text-sm font-medium">Happy Customers</div>
              <div className="text-xs text-purple-600 mt-2">And counting...</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">98%</div>
              <div className="text-gray-600 text-sm font-medium">Satisfaction Rate</div>
              <div className="text-xs text-green-600 mt-2">Highly Satisfied</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">720+</div>
              <div className="text-gray-600 text-sm font-medium">5-Star Reviews</div>
              <div className="text-xs text-amber-600 mt-2">Excellent Service</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Star className="h-5 w-5 fill-current" />
            Read All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
