import { ShoppingCart } from "lucide-react";
import { User } from "../../constant/types";

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
        <div>Welcome, {user.email[0].toUpperCase()}</div>
      )}

      <a href="/seller" className="text-sm font-medium hover:text-blue-600">
        Register As Provider
      </a>

      <a
        href="/cart"
        className="flex items-center text-sm font-medium hover:text-blue-600"
      >
        <ShoppingCart className="w-5 h-5 mr-2" /> Cart
      </a>
    </div>
  );
};

export default DesktopNav;
