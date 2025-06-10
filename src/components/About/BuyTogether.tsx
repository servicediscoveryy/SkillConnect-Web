import React, { useState } from "react";
import { Plus, ShoppingCart, MapPin, Heart } from "lucide-react";
import { ServiceDetail } from "../../constant/types";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/slug";

interface BuyTogetherProps {
  primaryService: ServiceDetail;
  relatedService: ServiceDetail | null;
}

const BuyTogether: React.FC<BuyTogetherProps> = ({
  primaryService,
  relatedService,
}) => {
  const { addToCart } = useAddToCart();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceDetail[]>([
    primaryService,
  ]);

  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

  const savings = Math.floor(totalPrice * 0.1); // 10% savings simulation

  const handleServiceToggle = (service: ServiceDetail) => {
    setSelectedServices((prev) =>
      prev.some((s) => s._id === service._id)
        ? prev.filter((s) => s._id !== service._id)
        : [...prev, service]
    );
  };

  const handleAddBothToCart = async () => {
    setIsLoading(true);
    try {
      for (const service of selectedServices) {
        await addToCart(service._id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const isServiceSelected = (serviceId: string) =>
    selectedServices.some((s) => s._id === serviceId);

  const renderServiceCard = (service: ServiceDetail, isPrimary = false) => (
    <div
      key={service._id}
      className={`relative bg-white  rounded-2xl shadow-sm border flex-1 transition-all duration-300 ${
        isServiceSelected(service._id)
          ? "border-blue-500 shadow-lg"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="absolute top-3 right-3 z-10">
        <button
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          onClick={() => {
            /* wishlist logic */
          }}
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <img
            src={service.image[0]}
            alt={service.title}
            className="w-full h-48 object-cover rounded-xl"
          />
          {!isPrimary && (
            <div className="absolute top-2 left-2">
              <input
                type="checkbox"
                checked={isServiceSelected(service._id)}
                onChange={() => handleServiceToggle(service)}
                className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded"
              />
            </div>
          )}
        </div>

        <div
          className="space-y-3 cursor-pointer "
          onClick={() =>
            navigate(`/${service._id}/${generateSlug(service.title)}`)
          }
        >
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
            {service.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ₹{service.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Best Price</span>
            </div>

            <button
              onClick={() => addToCart(service._id)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!relatedService) {
    return (
      <div className="max-w-md mx-auto">
        {renderServiceCard(primaryService, true)}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Frequently Booked Together
        </h2>
        <p className="text-gray-600">
          Save more when you book these services together
        </p>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex-1">{renderServiceCard(primaryService, true)}</div>

        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-4 shadow-lg border-2 border-blue-100">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="flex-1">{renderServiceCard(relatedService)}</div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  {selectedServices.length} Service
                  {selectedServices.length > 1 ? "s" : ""} Selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{totalPrice.toLocaleString()}
              </span>
              {selectedServices.length > 1 && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{(totalPrice + savings).toLocaleString()}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {selectedServices.map((s) => s.title).join(" + ")}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddBothToCart}
              disabled={selectedServices.length === 0 || isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTogether;
