import { ShoppingCart } from "lucide-react";
import { User } from "../../constant/types";
import { Avatar } from "@mui/material";

interface DesktopNavProps {
  user: User;
  navigate: (path: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ user, navigate }) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {!user?.email ? (
        <button
          className="button px-2 py-1 font-bold text-sm hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-2">
          Welcome <Avatar> {user.email[0].toUpperCase()}</Avatar>
        </div>
      )}

      <a href="/seller" className="text-sm font-medium hover:text-blue-600">
        Register As Provider
      </a>

      <div
        onClick={() => navigate("/cart")}
        className="flex items-center text-sm font-medium hover:text-blue-600 cursor-pointer"
      >
        <ShoppingCart className="w-5 h-5 mr-2" /> Cart
      </div>
    </div>
  );
};

export default DesktopNav;
