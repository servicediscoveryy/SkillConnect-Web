import React, { useEffect, useState } from "react";
import { AddressModal } from "./AddressModal";
import { AddressData } from "../../constant/types";
import api from "../../requests/axiosConfig/api";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

interface AddressWithId extends AddressData {
  _id: number;
}

export const AddressSection: React.FC = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveAddress = async (addressData: AddressData) => {
    const newAddress: AddressWithId = {
      _id: addresses.length + 1,
      ...addressData,
    };

    try {
      setLoading(true);
      await api.post("/address", addressData, {
        withCredentials: true,
      });
      setAddresses([...addresses, newAddress]);
      toast.success("Address Added Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (_id: number) => {
    try {
      const response = await api.delete(`/address/${_id}`, {
        withCredentials: true,
      });
      console.log(response);
      setAddresses(addresses.filter((address) => address._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await api.get("/address");
      setAddresses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? <SyncLoader size={7} /> : "Add  Address"}
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="border rounded-lg p-4 relative hover:border-blue-500 transition"
            >
              <div className="absolute top-4 right-4 space-x-2">
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
              <h3 className="font-medium">{address.type}</h3>
              <p className="text-gray-600 mt-2">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zipCode}
                <br />
                Pincode: {address.pincode}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Add New Address</p>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </div>
  );
};
