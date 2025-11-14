import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const formatName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link to="/" className="hover:text-purple-700 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-gray-900 font-medium">{formatName(name)}</span>
            ) : (
              <Link to={routeTo} className="hover:text-purple-700 transition-colors">
                {formatName(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
