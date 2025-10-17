import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../utils/jwt';

const ProtectedRoute = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
