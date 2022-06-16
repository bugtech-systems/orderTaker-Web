import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

//Pages
//Main Pages
import Dashboard from './Pages/Dashboard';
import Customers from './Pages/Customers';
import Inventory from './Pages/Inventory';
import Products from './Pages/Products';
import SalesReport from './Pages/Reports';
import Disbursement from './Pages/Disbursement';
import UserManagement from './Pages/UserManagement';
import Settings from './Pages/Settings';

//Other Pages
import Profile from './Pages/Profile';
import Notifications from './Pages/Notifications';

import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const { users } = useSelector(({ crud }) => crud);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/dashboard'} />;
  } else if (isLoggedIn && location.pathname === '/signin') {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        {/* Main Pages */}
        <Redirect exact from={`/`} to={`/dashboard`} />
        <RestrictedRoute path="/notifications" component={Notifications} />
        <RestrictedRoute path="/dashboard" component={Dashboard} />
        <RestrictedRoute path="/user-management" component={UserManagement} />
        <RestrictedRoute path="/inventory" component={Products} />

        <RestrictedRoute path="/customers" component={Customers} />
        {/* <RestrictedRoute path="/inventory" component={Inventory} /> */}
        <RestrictedRoute path="/disbursement" component={Disbursement} />
        <RestrictedRoute path="/reports" component={SalesReport} />
        <RestrictedRoute path="/settings" component={Settings} />

        {/* Other Pages */}
        <RestrictedRoute path="/profile" component={Profile} />

        <Route path="/signin" component={Login} />

        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
