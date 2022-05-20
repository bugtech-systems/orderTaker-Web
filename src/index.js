import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Forgot from "./components/pages/ForgotPassword/Forgot";
import Dashboard from "./components/pages/Dashboard/Dashboard"


ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Forgot" element={<Forgot />} />
      </Route>
    </Routes>
  </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
