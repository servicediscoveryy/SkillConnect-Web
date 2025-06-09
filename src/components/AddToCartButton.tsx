import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart"; // 👈 import hook

interface AddToCartButtonProps {
  serviceId: string;
}

function AddToCartButton({ serviceId }: AddToCartButtonProps) {
  const { addToCart, loading, isAdded } = useAddToCart();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(serviceId); // 👈 call reusable logic
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdded || loading}
      className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 transform ${
        isAdded
          ? "bg-green-500 scale-95"
          : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <ShoppingCart
        className={`w-5 h-5 transition-transform duration-300 ${
          isAdded ? "scale-110" : ""
        }`}
      />
      <span>
        {loading ? "Adding..." : isAdded ? "Added to Cart!" : "Add to Cart"}
      </span>
    </button>
  );
}

export default AddToCartButton;
