import { Navigate } from 'react-router-dom';
import { isAuthenticated, isSeller } from '../utils/auth';

const ProtectedRoute = ({ children, requireSeller = false }) => {
  const authenticated = isAuthenticated();
  const userIsSeller = isSeller();

  if (!authenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requireSeller && !userIsSeller) {
    // Redirect to home if seller access required but user is not a seller
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
