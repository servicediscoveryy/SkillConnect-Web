import React, { useEffect, useState } from "react";
import api from "../../requests/axiosConfig/api";

interface Address {
  _id: string;
  userId: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Service {
  _id: string;
  title: string;
  category: string;
  price: number;
}

interface BookingGroup {
  orderId: string;
  amount: number;
  userId: string;
  paymentMethod: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  services: Service[];
}

export const OrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<BookingGroup[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<BookingGroup | null>(null);

  async function getOrders() {
    try {
      const response = await api.get<{ data: BookingGroup[] }>("/booking", {
        withCredentials: true,
      });

      //@ts-expect-error
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders");
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  const handleCancel = async (orderId: string) => {
    try {
      await api.patch(
        `/booking/cancel/${orderId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(null);
      getOrders();
      alert("Booking cancelled successfully.");
    } catch (error: any) {
      console.error(
        "Error cancelling booking:",
        error?.response?.data || error.message
      );
    }
  };

  if (selectedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => setSelectedOrder(null)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back to Orders
        </button>
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="border rounded-lg p-4 mb-6 shadow-sm">
          <p>
            <strong>Order ID:</strong> {selectedOrder.orderId}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(selectedOrder.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
          </p>
          <p>
            <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
          </p>
          <p>
            <strong>Order Status:</strong> {selectedOrder.orderStatus}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{selectedOrder.amount}
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <p>
            {selectedOrder.address.street}, {selectedOrder.address.area}
          </p>
          <p>
            {selectedOrder.address.city}, {selectedOrder.address.state} -{" "}
            {selectedOrder.address.pincode}
          </p>
          <p>{selectedOrder.address.country}</p>
          <p>Landmark: {selectedOrder.address.landmark}</p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Services Ordered</h3>
          <ul className="space-y-2">
            {selectedOrder?.services?.map((service) => (
              <li key={service._id} className="border-b py-2">
                <p>
                  <strong>Title:</strong> {service.title || "N/A"}
                </p>
                <p>
                  <strong>Category ID:</strong> {service.category}
                </p>
                <p>
                  <strong>Price:</strong> ₹{service.price}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {selectedOrder.orderStatus == "pending" && (
            <div className="mt-5">
              <button
                className="border-red-400 px-2 py-1 text-red-200 bg-red-500 hover:bg-red-600 shadow-md rounded-4xl"
                onClick={() => {
                  handleCancel(selectedOrder.orderId);
                }}
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-4 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-500">
                  Order #{order.orderId.slice(-6).toUpperCase()}
                </span>
                <h3 className="font-medium mt-1">
                  {order.services.length} Items
                </h3>
                <p className="text-gray-600 mt-1">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(order)}
                className="text-blue-600 hover:text-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
