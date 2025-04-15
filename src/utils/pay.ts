import toast from "react-hot-toast";
import api from "../requests/axiosConfig/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const handleCheckOutSingleService = async (
  service: string[],
  address: string,

  navigate?: () => void
) => {
  try {
    const order = await api.post(
      "/payment/check",
      { service, address, method: "online" },
      { withCredentials: true }
    );
    console.log(order);
    const orderData = order?.order;
    const keyId = order?.keyId;

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded!");
      console.error("window.Razorpay is undefined");
      return;
    }

    if (!orderData || !keyId) {
      toast.error("Invalid payment data received");
      console.error("Missing required order data", order?.data);
      return;
    }

    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "GSM",
      description: "Payment for course",
      order_id: orderData.id,
      handler: function (response: any) {
        setTimeout(() => {
          toast.success("Payment successful");
          if (navigate) navigate();
        }, 2000);
      },
      prefill: {
        name: "GSM User",
        email: "", // optional, fill if you have it
        contact: "", // optional, fill if available
      },
      notes: {
        userId: orderData?.notes?.userId,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error: any) {
    console.error("Error in checkout process", error?.response?.status);
    toast.error(error?.response?.data?.message || "Something went wrong");
    return error?.response?.data;
  }
};
