import React from 'react';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Forgot from "./components/pages/ForgotPassword/Forgot";
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="forgot" element={<Forgot />} />
          <Route exact path="Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

reportWebVitals();