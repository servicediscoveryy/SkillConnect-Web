import { Avatar } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/user.context";
import api from "../../requests/axiosConfig/api";

// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white text-gray-800 absolute left-0 right-0 shadow-lg z-50"
        >
          <div className="flex flex-col divide-y divide-gray-200 cursor-pointer">
            {user?.email ? (
              <div
                className="flex  px-3 py-2 items-center cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
              >
                <Avatar sx={{ width: 30, height: 30 }}>
                  {" "}
                  {user.email[0].toUpperCase()}
                </Avatar>
                <p className="mx-3"> Account</p>
              </div>
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="px-4 py-3 text-[#2874f0] font-medium hover:bg-gray-100"
              >
                Login
              </div>
            )}

            <a href="/seller" className="px-4 py-3 hover:bg-gray-100">
              Become a Provider
            </a>
            {user && (
              <div
                className="px-4 py-3 hover:bg-gray-100 text-red-500"
                onClick={() => {
                  handleLogOut();
                  onClose();
                }}
              >
                Log Out
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
