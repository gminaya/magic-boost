import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'contexts/Auth';

interface PrivateRouteProps {
  component: any;
  exact:any;
  path:any;
}

export const PrivateRoute = ({ component: Component, ...rest }:PrivateRouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        return user ? <Component {...props} /> : <Redirect to="auth/login" />;
      }}
    ></Route>
  );
};
