import React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import configureStore, { history } from './redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import Routes from './routes';
import jwtDecode from 'jwt-decode';

// Redux
// import {LOGIN} from "./redux/actions/types";
import {logout, getUserData} from "./redux/actions/Auth";

const store = configureStore();

const token = localStorage.idToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    localStorage.removeItem('idToken')
    window.location.href = "/";
  } else {
    store.dispatch(getUserData(history));
  }
}


const App = () => (
  <Provider store={store}>
    <BrowserRouter 
    //  basename='/pos'
     history={history}
     >
      <AppContextProvider>
        <AppWrapper>
          <Switch>
            <Routes />
          </Switch>
        </AppWrapper>
      </AppContextProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
