import { useState } from "react";
import { useAuth } from "../context/user.context";
import api from "../requests/axiosConfig/api";
import { toast } from "react-hot-toast";
import { recordInteraction } from "./IncrementCount";
import { useRequireLogin } from "./useRequireLogin";

export const useAddToCart = () => {
  const { fetchCartCount } = useAuth();
  const ensureLogin = useRequireLogin();
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = async (serviceId: string) => {
    if (!ensureLogin()) return;

    try {
      setLoading(true);
      recordInteraction(serviceId, "book");

      const response = await api.post("/cart", { serviceId });
      fetchCartCount();
      toast.success(response?.data?.message || "Added to cart!");

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    } catch (error: any) {
      if (error.response?.data?.message === "Service already in cart") {
        toast.success("Service already in cart");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, isAdded };
};
