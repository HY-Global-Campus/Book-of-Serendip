//import { Navigate, Outlet, useLocation } from 'react-router-dom';
//import { isTokenExpired } from '../utils/jwt';
import { Outlet } from 'react-router-dom';
/***
* DISABLED TEMPORARILY
* ProtectedRoute component checks if the user is authenticated
  * If not, it redirects to the login page.
  * @returns {JSX.Element} - The Outlet component to render child routes if authenticated.
  *
*/
const ProtectedRoute = (): React.JSX.Element => {
  // const location = useLocation();
  // const token = sessionStorage.getItem('token');
  //
  // if (!token || isTokenExpired(token)) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }
  //
  return <Outlet />;
};

export default ProtectedRoute;
