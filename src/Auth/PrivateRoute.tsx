import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/Auth';
import { useMemo } from 'react';

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
  exact: boolean;
  path: string;
}

/** 
 * Renders the page only if `user` is present (user is authenticated)
 * Otherwise, redirect to the login page 
 * */
export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { user } = useAuth();
  
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="auth/login" />;
      }}
    ></Route>
  );
};
