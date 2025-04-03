import { Avatar } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/user.context";

// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white text-gray-800 absolute left-0 right-0 shadow-lg z-50"
        >
          <div className="flex flex-col divide-y divide-gray-200">
            {user?.email ? (
              <div className="flex  px-3 py-2 items-center">
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
              Become a Seller
            </a>
            {user && (
              <div className="px-4 py-3 hover:bg-gray-100 text-red-500">
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
