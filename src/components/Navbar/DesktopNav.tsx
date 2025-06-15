import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { User } from "../../constant/types";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../requests/axiosConfig/api";
import { useAuth } from "../../context/user.context";

interface DesktopNavProps {
  user: User;
  navigate: (path: string) => void;
  cartCount: number;
}

const MoreMenu = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleLogOut = async () => {
    try {
      await api.get("/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute right-0 mt-0.5 w-32 bg-white shadow-lg border border-gray-200 rounded-lg p-2 z-10">
      <p
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        Profile
      </p>
      <p
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        Settings
      </p>
      <p
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleLogOut()}
      >
        Logout
      </p>
    </div>
  );
};

const DesktopNav: React.FC<DesktopNavProps> = ({
  user,
  navigate,
  cartCount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="hidden md:flex items-center space-x-6 relative">
      {!user?.email ? (
        <button
          className="button px-2 py-1 font-bold text-sm hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : (
        /// Hover to show more menu
        <div
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div
            className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded-lg p-1"
            title="Profile"
          >
            <Avatar sx={{ width: 30, height: 30 }}>
              {user.email[0].toUpperCase()}
            </Avatar>
            <p className="text font-semibold flex">
              Account
              {isMenuOpen ? <ChevronUp /> : <ChevronDown />}
            </p>
          </div>

          {isMenuOpen && <MoreMenu />}
        </div>
      )}

      <a href="https://providerfrontend.onrender.com" className="text-sm font-medium hover:text-blue-600">
        Register As Provider
      </a>

      <div
        onClick={() => navigate("/cart")}
        className="flex items-center text-sm font-medium hover:text-blue-600 cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mr-2" />
          <div className="absolute -top-2 right-0 text-xs bg-red-400 p-0.5 px-1 rounded-full">
            {cartCount}
          </div>
        </div>
        Cart
      </div>
    </div>
  );
};

export default DesktopNav;
