import React, { useState, useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import { history } from "./helpers/history";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/actions/data.action";

//Pages
import MainLayout from "./pages/MainLayout";
import SignUp from "./pages/Authentications/Register/Register";
import Forgot from "./pages/Authentications/ForgotPassword/Forgot";
import SignIn from "./pages/Authentications/Login/Login";
import Snackbar from "./components/Snackbar";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(a => a.auth)


  useEffect(() => {
    dispatch(getData())
  }, [])



  return (
    <div className="App">
      <Snackbar/>
        <Router history={history}>
        {/* {isLoggedIn && <Redirect to="/admin" />} */}
        <Switch>
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={MainLayout} />
          <PublicRoute path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot" component={Forgot} />
          <Route path="*" render={() => <Redirect to="/app" />} />
        </Switch>
      </Router>
    </div>
  );

function PrivateRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/app",
              state: {
                from: props.location,
              },
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}

}

export default App;
