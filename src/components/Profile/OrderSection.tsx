import React from "react";

export const OrdersSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recent Orders</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-lg p-4 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-500">
                  Order #{2023000 + i}
                </span>
                <h3 className="font-medium mt-1">3 Items</h3>
                <p className="text-gray-600 mt-1">
                  Delivered on March {i}, 2024
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
