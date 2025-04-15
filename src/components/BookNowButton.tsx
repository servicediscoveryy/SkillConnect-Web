import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/user.context";
import api from "../requests/axiosConfig/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { recordInteraction } from "../hooks/IncrementCount";

const BookNowButton = ({ serviceId }: { serviceId: string }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!user) {
        navigate("/login");
      }
      setLoading(true);
      recordInteraction(serviceId,"book");
      const response = await api.post("/cart", { serviceId });
      // @ts-expect-error
      toast.success(response?.message);
    } catch (error) {
      // @ts-expect-error
      if (error.response.data.message == "Service already in cart") {
        toast.success("Service already in cart");
      }
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none z-10 cursor-pointer"
      onClick={(e) => addToCart(e)}
    >
      {loading ? <SyncLoader size={7} /> : "Book Now"}
    </button>
  );
};

export default BookNowButton;
