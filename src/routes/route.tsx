import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home"; // Assuming this is your Home component
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import About from "../pages/about/About";
import Category from "../pages/category/Category";
import Cart from "../pages/cart/Cart";
import Profile from "../pages/profile/Profile";
import ProtectedComponent from "./ProtectedComponent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id/:slug" element={<About />} />
      <Route path="/category/:category" element={<Category />} />
      <Route path="/search" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/profile"
        element={
          <ProtectedComponent>
            <Profile />
          </ProtectedComponent>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
