import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home"; // Assuming this is your Home component
import Login from "../pages/AUTH/Login";
import Signup from "../pages/AUTH/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
