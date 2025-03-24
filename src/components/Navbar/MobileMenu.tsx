import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

// Mobile Menu Component
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
            <a
              href="/login"
              className="px-4 py-3 text-[#2874f0] font-medium hover:bg-gray-100"
            >
              Login
            </a>
            <a href="/seller" className="px-4 py-3 hover:bg-gray-100">
              Become a Seller
            </a>
            <a href="/more" className="px-4 py-3 hover:bg-gray-100">
              More
            </a>
            <a
              href="/cart"
              className="px-4 py-3 flex items-center hover:bg-gray-100"
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> Cart
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
