import { useEffect, useState } from "react";
import { useAuth } from "../../context/user.context";
import api from "../../requests/axiosConfig/api";
import { CartData } from "../../constant/types";
import CircularLoader from "../../components/CircularLoader";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

const Cart = () => {
  const { user, fetchCartCount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState<CartData | undefined>();

  const fetchCartData = async () => {
    setLoading(true);
    const response = await api.get("/cart", { withCredentials: true });

    setCartData(response.data);

    setLoading(false);
  };

  const handleRemoveItem = async (serviceId: string) => {
    try {
      const response = await api.patch(
        "/cart",
        { serviceId },
        { withCredentials: true }
      );

      // @ts-expect-error
      toast.success(response?.message);
      fetchCartData();
      fetchCartCount();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  if (!user?.email) {
    return (
      <div className="text-center my-4">
        <h1 className="font-bold title">Missing Cart Services?</h1>
        <p className="text my-4">Login to see the items you added previously</p>
        <button className="bg-blue-600 text-white font-bold px-3 py-2 rounded-lg">
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white my-4 rounded-lg shadow-sm p-4 flex justify-between">
          <h1>Deliver here</h1>

          <button>Change</button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Cart Items ({cartData?.totalItems})
            </h2>
            <span className="text-lg font-medium text-gray-600">
              Total: ₹{cartData?.totalAmount}
            </span>
          </div>

          {cartData?.cart?.map((cartItem, index) => (
            <div key={index} className="mt-6">
              {cartItem.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-6 py-4 border-b"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.serviceId.image[0]}
                      alt={item.serviceId.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.serviceId.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {item.serviceId.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gray-500">
                        Location: {item.serviceId.location}
                      </span>
                      <span className="font-medium text-gray-800">
                        ₹{item.serviceId.price}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer "
                    onClick={() => handleRemoveItem(item?.serviceId?._id)}
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Subtotal
            </span>
            <span className="text-lg font-medium text-gray-800">
              ₹{cartData?.totalAmount}
            </span>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => console.log("Proceed to checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
