import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forgot from "./pages/Forgot/Forgot";
import Dashboard from "./pages/Dashboard/Dashboard"
import MenuList from "./pages/MenuList/MenuList"
import UserManagement from "./pages/UserManagement/UserManagement"
import Inventory from "./pages/DailyInventory/DailyInventory"
import Reports from "./pages/Reports/Reports"
import { dashboardTheme } from './dashboardTheme';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menulist" element={<MenuList />} />
      <Route path="/usermanagement" element={<UserManagement />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);


reportWebVitals();
