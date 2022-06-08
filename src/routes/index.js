import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


//Pages
//Main Pages
import Dashboard from './Pages/Store';
import Inventory from './Pages/Inventory';
import SalesReport from './Pages/Reports';
import Disbursement from './Pages/Disbursement';
import UserManagement from './Pages/Settings/UserManagement/UsersList';
import Settings from './Pages/Settings';


//Other Pages
import Profile from './Pages/Profile';



import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
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
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/store'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/store'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        {/* Main Pages */}
        <RestrictedRoute path="/store" component={Dashboard} />
        {/* <RestrictedRoute path="/dashboard/business" component={Business} /> */}

        <RestrictedRoute path="/profile" component={Profile} />
        <RestrictedRoute path="/inventory" component={Inventory} />
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
