import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Forgot from "./components/Forgot/Forgot";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;