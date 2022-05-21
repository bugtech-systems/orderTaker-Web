import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginIn from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Forgot from "./components/pages/ForgotPassword/Forgot";
import Dashboard from "./components/pages/Dashboard/Dashboard"


ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      </Route>
    </Routes>
  </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
