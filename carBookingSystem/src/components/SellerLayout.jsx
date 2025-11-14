import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const SellerLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'My Listings', href: '/seller/listings', icon: Car },
    { name: 'Messages', href: '/seller/messages', icon: MessageSquare },
    { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
    { name: 'Profile', href: '/seller/profile', icon: User },
    { name: 'Settings', href: '/seller/settings', icon: Settings }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="shrink-0 flex border-t border-gray-200 p-4">
              <button className="shrink-0 w-full group flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile menu button */}
          <div className="lg:hidden sticky top-16 z-10 bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {sidebarOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
